import { obtenerNoticias, obtenerCoordenadasUSIG, cerrarSesion } from './utils.js';


document.addEventListener('DOMContentLoaded', function () {
  verificarAdmin();
  mostrarNoticias();
  actualizarNavegacion();
  inicializarFormularioNoticia();
  inicializarMapa();
});


function verificarAdmin() {
  const esPaginaPublica = window.location.pathname.endsWith('index.html');
  if (!esPaginaPublica && localStorage.getItem('rol') !== 'admin') {
    window.location.href = '/public/login.html'; // o donde quieras
  }
}


const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', cerrarSesion);
}

function actualizarNavegacion() {
  const navPrincipal = document.getElementById('navPrincipal');
  if (!navPrincipal) return;

  const rol = localStorage.getItem('rol');
  let contenido = '';

  if (rol === 'admin') {
    contenido = `
      <a href="/Admin/panel.html">Panel de Administración</a>
      <a href="#" onclick="cerrarSesion()">Cerrar Sesión</a>
    `;
  } else if (rol === 'usuario') {
    contenido = `
      <a href="mis-preguntas.html">Mis Preguntas</a>
      <a href="#" onclick="cerrarSesion()">Cerrar Sesión</a>
    `;
  } else {
    contenido = `<a href="login.html">Login</a>`;
  }

  navPrincipal.innerHTML = contenido;

  const toggleBtn = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("navPrincipal") || document.getElementById("navAdmin");

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }
}

function inicializarFormularioNoticia() {
  const formNoticia = document.getElementById('formNoticia');
  if (!formNoticia) return;

  const nuevoForm = formNoticia.cloneNode(true);
  formNoticia.parentNode.replaceChild(nuevoForm, formNoticia);

  nuevoForm.addEventListener('submit', guardarNoticia);
}

function normalizarDireccionUSIG(direccion) {
  let url = 'http://servicios.usig.buenosaires.gob.ar/normalizar?direccion=' + encodeURIComponent(direccion);
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Error en la respuesta del servicio USIG");
      }
      return response.json();
    })
    .then(data => {
      if (data && data.direccionesNormalizadas && data.direccionesNormalizadas.length > 0) {
        let dirObj = data.direccionesNormalizadas[0];
        if (dirObj.coordenadas && dirObj.coordenadas.x != null && dirObj.coordenadas.y != null) {
          return {
            direccion_normalizada: dirObj.direccion,
            lat: dirObj.coordenadas.y,
            lng: dirObj.coordenadas.x
          };
        } else {
          throw new Error("No se encontraron coordenadas en la respuesta");
        }
      } else {
        throw new Error("No se encontró la dirección en el servicio USIG");
      }
    });
}

function inicializarMapa() {
  if (document.getElementById('map')) {
    window.mapa = L.map('map').setView([-34.6037, -58.3816], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(window.mapa);
  }
}

function mostrarNoticias() {
  const listaNoticiasDiv = document.getElementById("listaNoticias");
  if (!listaNoticiasDiv) return;

  let noticias = obtenerNoticias();
  if (noticias.length === 0) {
    listaNoticiasDiv.innerHTML = "<p>No hay noticias publicadas.</p>";
    return;
  }

  let html = "";
  noticias.forEach((noticia, indice) => {
    html += `<div class="noticia">
              <h3>${noticia.titulo}</h3>
              <p><strong>Descripción:</strong> ${noticia.descripcion || ""}</p>
              <p><strong>Fecha:</strong> ${noticia.fechaPublicacion || noticia.fecha || ""}</p>
              <p><strong>Tema:</strong> ${noticia.tema || ""}</p>
              <p>${noticia.cuerpo}</p>`;

    if (noticia.imagenes && noticia.imagenes.length > 0) {
      html += `<div class="galeria-imagenes">`;
      noticia.imagenes.forEach(imagen => {
        if (imagen && imagen.dataUrl) {
          html += `<img src="${imagen.dataUrl}" alt="${imagen.nombre}" style="max-width: 200px; margin: 5px;">`;
        } else if (typeof imagen === 'string') {
          html += `<img src="/images/${imagen}" alt="${imagen}" style="max-width: 200px; margin: 5px;">`;
        }
      });
      html += `</div>`;
    }

    html += `<div class="acciones">
                <button onclick="editarNoticia(${indice})">Editar</button>
                <button onclick="eliminarNoticia(${indice})">Eliminar</button>
              </div>`;
    if (noticia.ubicacion) {
      html += `<div class="ubicacion">
                 <button onclick="mostrarMapa(${noticia.ubicacion.lat}, ${noticia.ubicacion.lng}, '${noticia.ubicacion.direccion_normalizada || ''}', ${indice})">
                   Ver en el mapa
                 </button>
               </div>`;
    }
    html += `</div><hr>`;
  });

  listaNoticiasDiv.innerHTML = html;
}

/**
 * @param {Event} event 
 */
function guardarNoticia(event) {
  console.log("Guardando noticia");
  event.preventDefault();

  const titulo = document.getElementById('titulo').value;
  const descripcion = document.getElementById('descripcion') ? document.getElementById('descripcion').value : "";
  const cuerpo = document.getElementById('cuerpo').value;
  const fechaPublicacion = document.getElementById('fechaPublicacion').value;
  const tema = document.getElementById('tema').value;
  const direccion = document.getElementById('direccion').value;

  const inputImagenes = document.getElementById('imagenes');
  let imagenes = [];

  const continuarGuardado = (imagenesFinales) => {
    let noticia = {
      titulo,
      descripcion,
      cuerpo,
      fechaPublicacion,
      tema,
      imagenes: imagenesFinales
    };

    if (direccion && direccion.trim() !== "") {
      normalizarDireccionUSIG(direccion)
        .then(function (ubicacion) {
          noticia.ubicacion = ubicacion;
          almacenarNoticia(noticia);
        })
        .catch(function (error) {
          alert("Error al normalizar la dirección: " + error);
        });
    } else {
      almacenarNoticia(noticia);
    }
  };

  if (inputImagenes && inputImagenes.files && inputImagenes.files.length > 0) {
    const promises = [];

    for (let i = 0; i < inputImagenes.files.length; i++) {
      const file = inputImagenes.files[i];

      const promise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function (e) {
          resolve({
            nombre: file.name,
            tipo: file.type,
            dataUrl: e.target.result
          });
        };
        reader.readAsDataURL(file);
      });

      promises.push(promise);
    }

    Promise.all(promises).then(imagenesData => {
      continuarGuardado(imagenesData);
    });
  } else {
    continuarGuardado([]);
  }
}

/**
 * @param {Object} noticia 
 */
function almacenarNoticia(noticia) {
  let noticias = obtenerNoticias();
  noticias.push(noticia);
  localStorage.setItem("noticias", JSON.stringify(noticias));
  alert("Noticia guardada exitosamente!");
  document.getElementById('formNoticia').reset();

  const inputImagenes = document.getElementById('imagenes');
  if (inputImagenes) {
    inputImagenes.value = '';
  }

  mostrarNoticias();
}

/**
 * @param {number} lat 
 * @param {number} lng 
 * @param {string} direccionNormalizada 
 * @param {number} indice 
 */
function mostrarMapa(lat, lng, direccionNormalizada, indice) {
  window.mapa.setView([lat, lng], 15);
  L.marker([lat, lng]).addTo(window.mapa)
    .bindPopup(`<b>${obtenerNoticias()[indice].titulo}</b><br>${direccionNormalizada}`)
    .openPopup();
}

/**
 * @param {number} indice 
 */
function editarNoticia(indice) {
  let noticias = obtenerNoticias();
  if (noticias[indice]) {
    let noticia = noticias[indice];
    document.getElementById('titulo').value = noticia.titulo;
    if (document.getElementById('descripcion')) {
      document.getElementById('descripcion').value = noticia.descripcion || '';
    }
    document.getElementById('cuerpo').value = noticia.cuerpo;
    document.getElementById('fechaPublicacion').value = noticia.fechaPublicacion || '';
    document.getElementById('tema').value = noticia.tema || '';
    if (noticia.ubicacion && noticia.ubicacion.direccion_normalizada) {
      document.getElementById('direccion').value = noticia.ubicacion.direccion_normalizada;
    }

    noticias.splice(indice, 1);
    localStorage.setItem("noticias", JSON.stringify(noticias));

    const crearNoticiaSection = document.getElementById('crearNoticiaSection');
    if (crearNoticiaSection) {
      crearNoticiaSection.style.display = 'block';
    }
  }
}

/**
 * @param {number} indice 
 */
function eliminarNoticia(indice) {
  let noticias = obtenerNoticias();
  if (confirm("¿Está seguro que desea eliminar la noticia?")) {
    noticias.splice(indice, 1);
    localStorage.setItem("noticias", JSON.stringify(noticias));
    mostrarNoticias();
  }
}

window.editarNoticia = editarNoticia;
window.eliminarNoticia = eliminarNoticia;
window.mostrarMapa = mostrarMapa;
window.guardarNoticia = guardarNoticia;
window.cerrarSesion = cerrarSesion;
window.normalizarDireccionUSIG = normalizarDireccionUSIG;