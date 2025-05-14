function obtenerNoticiasLocalStorage() {
  let noticiasLocalStorage = localStorage.getItem("noticias");
  if (noticiasLocalStorage) {
    try {
      return JSON.parse(noticiasLocalStorage);
    } catch (e) {
      console.error("Error al parsear las noticias locales:", e);
    }
  }
  return [];
}

let mapasInstancias = {};

document.addEventListener('DOMContentLoaded', function () {
  cargarNoticias();
  mostrarDetalleNoticia();
  actualizarNavegacion();
});

function cargarNoticias() {
  const contenedor = document.getElementById('contenedorNoticias');
  if (!contenedor) return;

  let todasNoticias = [];

  fetch('/data/noticias.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener el archivo JSON');
      }
      return response.json();
    })
    .then(jsonNoticias => {
      let localStorageNoticias = obtenerNoticiasLocalStorage();
      todasNoticias = jsonNoticias.concat(localStorageNoticias);
      mostrarListaNoticias(todasNoticias, contenedor);
    })
    .catch(error => {
      console.error('Error:', error);
      let localStorageNoticias = obtenerNoticiasLocalStorage();
      if (localStorageNoticias.length > 0) {
        mostrarListaNoticias(localStorageNoticias, contenedor);
      } else {
        contenedor.innerHTML = '<p>No se pudieron cargar las noticias.</p>';
      }
    });
}

function mostrarListaNoticias(noticias, contenedor) {
  contenedor.innerHTML = '';

  if (noticias.length === 0) {
    contenedor.innerHTML = '<p>No hay noticias disponibles.</p>';
    return;
  }

  noticias.forEach((noticia, indice) => {
    const div = document.createElement('div');
    div.className = 'noticia';

    div.innerHTML = `
      <h2 class="clickable">${noticia.titulo}</h2>
      <small>Fecha: ${noticia.fecha || noticia.fechaPublicacion || 'No especificada'}</small>
      <p>${noticia.descripcion || noticia.cuerpo.slice(0, 100)}...</p>
    `;

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
      window.location.href = 'noticia.html';
    });

    contenedor.appendChild(div);
  });
}

function toggleMapa(noticia, indice) {
  if (!noticia.ubicacion) return;

  const contenedorMapaId = `mapa_inicio_${indice}`;
  const contenedorMapa = document.getElementById(contenedorMapaId);

  if (contenedorMapa.style.display === 'none') {
    contenedorMapa.style.display = 'block';

    if (mapasInstancias[indice]) {
      mapasInstancias[indice].remove();
      delete mapasInstancias[indice];
    }

    mapasInstancias[indice] = L.map(contenedorMapaId).setView([noticia.ubicacion.lat, noticia.ubicacion.lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
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