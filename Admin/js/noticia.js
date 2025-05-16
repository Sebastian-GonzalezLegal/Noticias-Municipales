import { obtenerNoticias, obtenerCoordenadasUSIG, cerrarSesion } from './utils.js';

let mapasInstancias = {};

document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM completamente cargado");

  const contenedorNoticias = document.getElementById('contenedorNoticias');
  if (contenedorNoticias) {
    cargarNoticias();
  }

  const detalleNoticia = document.getElementById('detalleNoticia');
  if (detalleNoticia) {
    mostrarDetalleNoticia();
  }

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
        estado: "Pendiente"
      };

      guardarPregunta(pregunta);

      document.getElementById('mensajeConfirmacion').innerText = "¡Gracias! Tu pregunta fue enviada.";
      this.reset();
    });
  }

  console.log("Inicialización completada");
});

async function cargarNoticias() {
  const contenedor = document.getElementById('contenedorNoticias');
  if (!contenedor) return;

  let todasNoticias = [];

  try {
    const respuesta = await fetch('/data/noticias.json');
    if (!respuesta.ok) throw new Error('Error al obtener el archivo JSON');

    const jsonNoticias = await respuesta.json();
    const localStorageNoticias = obtenerNoticias();
    todasNoticias = jsonNoticias.concat(localStorageNoticias);

    for (let noticia of todasNoticias) {
      if (typeof noticia.ubicacion === "string") {
        console.log("Normalizando dirección:", noticia.ubicacion);
        const coordenadas = await obtenerCoordenadasUSIG(noticia.ubicacion);
        if (coordenadas) {
          console.log("Coordenadas obtenidas:", coordenadas);
          noticia.ubicacion = coordenadas;
        } else {
          console.warn("No se pudieron obtener coordenadas para:", noticia.ubicacion);
        }
      }
    }

    mostrarListaNoticias(todasNoticias, contenedor);
  } catch (error) {
    console.error('Error cargando noticias:', error);
    contenedor.innerHTML = '<p>No se pudieron cargar las noticias.</p>';
  }
}

/**
 * @param {Object} noticia 
 * @param {number} indice 
 */
function toggleMapa(noticia, indice) {
  if (!noticia.ubicacion || typeof noticia.ubicacion.lat === 'undefined' || typeof noticia.ubicacion.lng === 'undefined') {
    console.warn("No hay coordenadas válidas para la noticia:", noticia.titulo);
    return;
  }

  const contenedorMapaId = `mapa_inicio_${indice}`;
  const contenedorMapa = document.getElementById(contenedorMapaId);

  if (contenedorMapa.style.display === 'none') {
    contenedorMapa.style.display = 'block';

    if (mapasInstancias[indice]) {
      mapasInstancias[indice].remove();
      delete mapasInstancias[indice];
    }

    mapasInstancias[indice] = L.map(contenedorMapaId).setView(
      [noticia.ubicacion.lat, noticia.ubicacion.lng], 15
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapasInstancias[indice]);

    L.marker([noticia.ubicacion.lat, noticia.ubicacion.lng])
      .addTo(mapasInstancias[indice])
      .bindPopup(
        `<b>${noticia.titulo}</b><br>${noticia.ubicacion.direccion_normalizada || ''}`
      )
      .openPopup();
  } else {
    contenedorMapa.style.display = 'none';
    if (mapasInstancias[indice]) {
      mapasInstancias[indice].remove();
      delete mapasInstancias[indice];
    }
  }
}

/**
 * @param {Object} pregunta 
 */
function guardarPregunta(pregunta) {
  fetch('http://localhost:3000/api/preguntas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pregunta)
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al guardar la pregunta");
      return res.json();
    })
    .then(data => {
      alert(data.mensaje);
    })
    .catch(error => {
      console.error(error);
      alert("Ocurrió un error al guardar la pregunta");
    });
}

/**
 * @param {Array} noticias 
 * @param {HTMLElement} contenedor 
 */
function mostrarListaNoticias(noticias, contenedor) {
  contenedor.innerHTML = '';

  if (noticias.length === 0) {
    contenedor.innerHTML = '<p>No hay noticias disponibles.</p>';
    return;
  }

  noticias.forEach((noticia, indice) => {
    const div = document.createElement('div');
    div.className = 'noticia';

    let contenidoHTML = `
      <h2 class="clickable">${noticia.titulo}</h2>
      <small>Fecha: ${noticia.fecha || noticia.fechaPublicacion || 'No especificada'}</small>
      <p>${noticia.descripcion || noticia.cuerpo.slice(0, 100)}...</p>
    `;

    if (noticia.imagenes && noticia.imagenes.length > 0) {
      console.log(`Noticia ${indice} - Imágenes en lista:`, noticia.imagenes);
      contenidoHTML += `<div class="galeria-imagenes">`;
      noticia.imagenes.forEach(imagen => {
        if (imagen && imagen.dataUrl) {
          console.log(`Mostrando imagen de lista con dataUrl: ${imagen.nombre}`);
          contenidoHTML += `<img src="${imagen.dataUrl}" alt="${imagen.nombre}" style="max-width: 150px; margin: 5px;">`;
        } else if (typeof imagen === 'string') {
          console.log(`Mostrando imagen de lista por ruta: ${imagen}`);
          contenidoHTML += `<img src="/images/${imagen}" alt="${imagen}" style="max-width: 150px; margin: 5px;">`;
        } else {
          console.log("Formato de imagen no reconocido en lista:", imagen);
        }
      });
      contenidoHTML += `</div>`;
    }

    div.innerHTML = contenidoHTML;

    if (noticia.ubicacion) {
      const mapaContainer = document.createElement('div');
      mapaContainer.className = 'mapa-container';

      const botonMapa = document.createElement('button');
      botonMapa.textContent = 'Ver ubicación';
      botonMapa.className = 'btn-mapa';

      const contenedorMapa = document.createElement('div');
      contenedorMapa.id = `mapa_inicio_${indice}`;
      contenedorMapa.className = 'contenedor-mapa';
      contenedorMapa.style.height = '250px';
      contenedorMapa.style.display = 'none';
      contenedorMapa.style.marginTop = '10px';

      mapaContainer.appendChild(botonMapa);
      mapaContainer.appendChild(contenedorMapa);
      div.appendChild(mapaContainer);

      botonMapa.addEventListener('click', function () {
        toggleMapa(noticia, indice);
      });
    }

    div.querySelector('h2').addEventListener('click', () => {
      localStorage.setItem('noticiaSeleccionada', JSON.stringify(noticia));
      window.location.href = '/public/noticia.html';
    });

    contenedor.appendChild(div);
  });
}

function mostrarDetalleNoticia() {
  const contenedorDetalle = document.getElementById('detalleNoticia');
  if (!contenedorDetalle) return;

  const noticia = JSON.parse(localStorage.getItem('noticiaSeleccionada'));

  if (!noticia) {
    contenedorDetalle.innerHTML = '<p>No se encontró la noticia. Volvé a la <a href="index.html">página principal</a>.</p>';
    return;
  }

  let html = `
    <h2>${noticia.titulo}</h2>
    <small>Fecha: ${noticia.fechaPublicacion || noticia.fecha || 'No especificada'}</small>
    <p>${noticia.cuerpo}</p>
  `;

  console.log("Imágenes en detalle de noticia:", noticia.imagenes);

  if (noticia.imagenes && noticia.imagenes.length > 0) {
    html += `<div class="galeria-imagenes">`;
    noticia.imagenes.forEach(imagen => {
      if (imagen && imagen.dataUrl) {
        console.log(`Mostrando imagen en detalle con dataUrl: ${imagen.nombre}`);
        html += `<img src="${imagen.dataUrl}" alt="${imagen.nombre}" style="max-width: 100%; margin: 10px 0;">`;
      } else if (typeof imagen === 'string') {
        console.log(`Mostrando imagen en detalle por ruta: ${imagen}`);
        html += `<img src="/images/${imagen}" alt="${imagen}" style="max-width: 100%; margin: 10px 0;">`;
      } else {
        console.log("Formato de imagen no reconocido en detalle:", imagen);
      }
    });
    html += `</div>`;
  }

  if (noticia.ubicacion) {
    html += `
      <div class="ubicacion-detalle">
        <h3>Ubicación</h3>
        <p>${noticia.ubicacion.direccion_normalizada || ''}</p>
        <div id="mapa_detalle" style="height: 400px; margin-top: 10px;"></div>
      </div>
    `;
  }

  contenedorDetalle.innerHTML = html;

  if (noticia.ubicacion) {
    setTimeout(function () {
      const mapaDetalle = L.map('mapa_detalle').setView([noticia.ubicacion.lat, noticia.ubicacion.lng], 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapaDetalle);

      L.marker([noticia.ubicacion.lat, noticia.ubicacion.lng])
        .addTo(mapaDetalle)
        .bindPopup(`<b>${noticia.titulo}</b><br>${noticia.ubicacion.direccion_normalizada || ''}`)
        .openPopup();
    }, 300);
  }
}

window.cerrarSesion = cerrarSesion;


document.addEventListener("DOMContentLoaded", () => {
  const rol = localStorage.getItem("rol");
  const preguntasSection = document.getElementById("preguntas");

  if (rol === "usuario" || rol === "admin") {
    preguntasSection.style.display = "block";
  }
});


