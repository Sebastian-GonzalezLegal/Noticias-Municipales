import {
  obtenerNoticias,
  normalizarDireccionUSIG,
  cerrarSesion,
  formatearFecha,
  guardarPregunta,
  obtenerPreguntasDeNoticia,
  normalizarRutaImagen,
} from './utils.js';

let mapasInstancias = {};

document.addEventListener('DOMContentLoaded', function () {
  if (typeof L === 'undefined') {
    console.error('Leaflet no está cargado.');
  }

  const contenedorNoticias = document.getElementById('contenedorNoticias');
  if (contenedorNoticias) cargarNoticias();

  const detalleNoticia = document.getElementById('detalleNoticia');
  if (detalleNoticia) mostrarDetalleNoticia();

  const formPregunta = document.getElementById('formPregunta');
  if (formPregunta) {
    formPregunta.addEventListener('submit', function (e) {
      e.preventDefault();
      const noticia = JSON.parse(localStorage.getItem('noticiaSeleccionada'));
      const mensaje = document.getElementById('pregunta').value.trim();
      if (!mensaje) return;
      const pregunta = {
        mensaje,
        fecha: new Date().toISOString(),
        idNoticia: noticia.titulo,
        estado: 'Pendiente',
      };
      guardarPregunta(pregunta)
        .then(() => {
          document.getElementById('mensajeConfirmacion').innerText =
            '¡Gracias! Tu pregunta fue enviada.';
        })
        .catch(() => { });
      this.reset();
    });
  }

  const rol = localStorage.getItem('rol');
  const preguntasSection = document.getElementById('preguntas');
  if (preguntasSection && (rol === 'usuario' || rol === 'admin')) {
    preguntasSection.style.display = 'block';
  }
});

window.cerrarSesion = cerrarSesion;

async function cargarNoticias() {
  const contenedor = document.getElementById('contenedorNoticias');
  if (!contenedor) return;
  contenedor.innerHTML = '<p>Cargando noticias...</p>';
  const localStorageNoticias = obtenerNoticias();
  let todasNoticias = [];
  if (Array.isArray(localStorageNoticias) && localStorageNoticias.length > 0) {
    todasNoticias = localStorageNoticias;
  } else {
    try {
      const respuesta = await fetch('/data/noticias.json');
      if (!respuesta.ok) throw new Error('Error JSON');
      todasNoticias = await respuesta.json();
    } catch {
      contenedor.innerHTML = '<p>No se pudieron cargar las noticias.</p>';
      return;
    }
  }

  for (let noticia of todasNoticias) {
    if (typeof noticia.ubicacion === 'string' && noticia.ubicacion.trim() !== '') {
      try {
        const coord = await normalizarDireccionUSIG(noticia.ubicacion);
        if (coord) {
          noticia.ubicacion = coord;
          noticia.ubicacionValida = true;
        } else {
          noticia.ubicacionValida = false;
        }
      } catch {
        noticia.ubicacionValida = false;
      }
    } else if (typeof noticia.ubicacion === 'object' && noticia.ubicacion !== null) {
      if (noticia.ubicacion.lat != null && noticia.ubicacion.lng != null) {
        noticia.ubicacionValida = true;
      } else {
        noticia.ubicacionValida = false;
      }
    } else {
      noticia.ubicacionValida = false;
    }
  }

  mostrarListaNoticias(todasNoticias, contenedor);
}

function mostrarListaNoticias(noticias, contenedor) {
  contenedor.innerHTML = '';
  if (!Array.isArray(noticias) || noticias.length === 0) {
    contenedor.innerHTML = '<p>No hay noticias disponibles.</p>';
    return;
  }

  noticias.forEach((noticia, indice) => {
    const div = document.createElement('div');
    div.className = 'noticia';

    let contenidoHTML = `
      <h2 class="clickable">${noticia.titulo}</h2>
      <small>Fecha: ${noticia.fecha || noticia.fechaPublicacion || 'No especificada'}</small>
      <p>${noticia.descripcion || (noticia.cuerpo ? noticia.cuerpo.slice(0, 100) + '...' : '')}</p>
    `;

    if (noticia.imagenes && noticia.imagenes.length > 0) {
      contenidoHTML += `<div class="galeria-imagenes">`;
      noticia.imagenes.forEach((imagen) => {
        const rutaImagen = normalizarRutaImagen(imagen);
        contenidoHTML += `<img class="news-image" src="${rutaImagen}" alt="Imagen de ${noticia.titulo}" title="Imagen de ${noticia.titulo}">`;
      });
      contenidoHTML += `</div>`;
    }

    const tieneUbicacionValida =
      noticia.ubicacionValida === true &&
      noticia.ubicacion &&
      typeof noticia.ubicacion === 'object' &&
      noticia.ubicacion.lat != null &&
      noticia.ubicacion.lng != null;

    if (tieneUbicacionValida) {
      contenidoHTML += `
        <div class="mapa-contenedor">
          <button class="btn-mapa" id="btn-mapa-${indice}">Ver ubicación</button>
          <div id="mapa_inicio_${indice}" class="contenedor-mapa" style="height: 250px; display: none; margin-top: 10px;"></div>
        </div>
      `;
    }

    div.innerHTML = contenidoHTML;
    contenedor.appendChild(div);

    const tituloElem = div.querySelector('h2.clickable');
    if (tituloElem) {
      tituloElem.addEventListener('click', () => {
        localStorage.setItem('noticiaSeleccionada', JSON.stringify(noticia));
        window.location.href = '/public/noticia.html';
      });
    }

    if (tieneUbicacionValida) {
      const botonMapa = document.getElementById(`btn-mapa-${indice}`);
      botonMapa.addEventListener('click', () => {
        toggleMapa(noticia, indice);
      });
    }
  });
}

function toggleMapa(noticia, indice) {
  if (
    !noticia.ubicacion ||
    typeof noticia.ubicacion.lat === 'undefined' ||
    typeof noticia.ubicacion.lng === 'undefined'
  ) {
    return;
  }

  const contenedorMapa = document.getElementById(`mapa_inicio_${indice}`);
  if (!contenedorMapa) return;

  if (contenedorMapa.style.display === 'none') {
    contenedorMapa.style.display = 'block';

    if (mapasInstancias[indice]) {
      mapasInstancias[indice].remove();
      delete mapasInstancias[indice];
    }

    mapasInstancias[indice] = L.map(`mapa_inicio_${indice}`).setView(
      [noticia.ubicacion.lat, noticia.ubicacion.lng],
      15
    );
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapasInstancias[indice]);
    L.marker([noticia.ubicacion.lat, noticia.ubicacion.lng])
      .addTo(mapasInstancias[indice])
      .bindPopup(`<b>${noticia.titulo}</b><br>${noticia.ubicacion.direccion_normalizada || ''}`)
      .openPopup();
  } else {
    contenedorMapa.style.display = 'none';
    if (mapasInstancias[indice]) {
      mapasInstancias[indice].remove();
      delete mapasInstancias[indice];
    }
  }
}

function mostrarDetalleNoticia() {
  const contenedorDetalle = document.getElementById('detalleNoticia');
  if (!contenedorDetalle) return;

  const noticiaJSON = localStorage.getItem('noticiaSeleccionada');
  if (!noticiaJSON) {
    contenedorDetalle.innerHTML =
      '<p>No se encontró la noticia. Volvé a la <a href="index.html">página principal</a>.</p>';
    return;
  }

  try {
    const noticia = JSON.parse(noticiaJSON);
    let html = `
      <h2>${noticia.titulo}</h2>
      <small>Fecha: ${noticia.fechaPublicacion || noticia.fecha || 'No especificada'}</small>
      <p>${noticia.cuerpo}</p>
    `;

    if (noticia.imagenes && noticia.imagenes.length > 0) {
      html += `<div class="galeria-imagenes">`;
      noticia.imagenes.forEach((imagen) => {
        const rutaImagen = normalizarRutaImagen(imagen);
        html += `<img src="${rutaImagen}" alt="${typeof imagen === 'string' ? imagen.split('/').pop() : 'imagen'}" style="max-width: 48%; margin: 10px 0;">`;
      });
      html += `</div>`;
    }

    const tieneUbicacionValida =
      noticia.ubicacionValida === true &&
      noticia.ubicacion &&
      typeof noticia.ubicacion === 'object' &&
      noticia.ubicacion.lat != null &&
      noticia.ubicacion.lng != null;

    if (tieneUbicacionValida) {
      html += `
        <div class="ubicacion-detalle">
          <h3>Ubicación</h3>
          <p>${noticia.ubicacion.direccion_normalizada || ''}</p>
          <div id="mapa_detalle" style="height: 400px; margin-top: 10px;"></div>
        </div>
      `;
    }

    html += `
      <div class="preguntas-respuestas">
        <h3>Preguntas y Respuestas</h3>
        <div id="contenedorPreguntas" class="contenedor-preguntas">
          <p id="cargandoPreguntas">Cargando preguntas...</p>
        </div>
      </div>
    `;

    const rol = localStorage.getItem('rol');
    if (rol === 'usuario' || rol === 'admin') {
      html += `
        <div id="preguntas" class="seccion-preguntas">
          <h3>Hacer una pregunta</h3>
          <form id="formPregunta">
            <div class="campo-formulario">
              <label for="pregunta">Tu pregunta:</label>
              <textarea id="pregunta" name="pregunta" rows="3" required></textarea>
            </div>
            <button type="submit" class="btn-enviar">Enviar pregunta</button>
          </form>
          <p id="mensajeConfirmacion" class="mensaje-confirmacion"></p>
        </div>
      `;
    }

    contenedorDetalle.innerHTML = html;

    if (tieneUbicacionValida) {
      setTimeout(function () {
        try {
          const mapaDetalle = L.map('mapa_detalle').setView(
            [noticia.ubicacion.lat, noticia.ubicacion.lng],
            15
          );
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
          }).addTo(mapaDetalle);
          L.marker([noticia.ubicacion.lat, noticia.ubicacion.lng])
            .addTo(mapaDetalle)
            .bindPopup(`<b>${noticia.titulo}</b><br>${noticia.ubicacion.direccion_normalizada || ''}`)
            .openPopup();
        } catch {
          document.getElementById('mapa_detalle').innerHTML =
            '<p>Error al cargar el mapa. Intenta más tarde.</p>';
        }
      }, 300);
    }

    obtenerPreguntasDeNoticia(noticia.titulo)
      .then((preguntasNoticia) => {
        const respondidas = preguntasNoticia.filter(
          (p) => p.estado === 'Respondida' && p.respuesta
        );
        const contenedorPreguntas = document.getElementById('contenedorPreguntas');

        if (respondidas.length === 0) {
          contenedorPreguntas.innerHTML = '<p>No hay preguntas respondidas aún.</p>';
          return;
        }

        let htmlPregs = '';
        respondidas.forEach((pregunta) => {
          htmlPregs += `
         <div class="pregunta-item">
           <div class="pregunta-header">
             <p class="pregunta-texto"><strong>Pregunta:</strong> ${pregunta.mensaje}</p>
             <small class="pregunta-fecha">${formatearFecha(pregunta.fecha)}</small>
           </div>
           <div class="respuesta">
             <p><strong>Respuesta:</strong> ${pregunta.respuesta}</p>
           </div>
         </div>
         <hr>
       `;
        });

        contenedorPreguntas.innerHTML = htmlPregs;
      })
      .catch(() => {
        document.getElementById('contenedorPreguntas').innerHTML =
          '<p>Error al cargar las preguntas. Intenta más tarde.</p>';
      });
  } catch {
    contenedorDetalle.innerHTML =
      '<p>Error al mostrar la noticia. Volvé a la <a href="index.html">página principal</a>.</p>';
  }
}

contenedorMapa.style.display = 'block';
contenedorMapa.style.opacity = 1;
contenedorMapa.style.height = '250px';

contenedorMapa.style.opacity = 0;
setTimeout(() => {
  contenedorMapa.style.display = 'none';
  contenedorMapa.style.height = '0';
}, 300);