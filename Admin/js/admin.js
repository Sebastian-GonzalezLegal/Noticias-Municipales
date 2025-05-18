import { obtenerNoticias, obtenerCoordenadasUSIG, cerrarSesion } from './utils.js';


document.addEventListener('DOMContentLoaded', function () {
  mostrarNoticias();
  actualizarNavegacion();
  inicializarFormularioNoticia();
});


function verificarAdmin() {
  const esPaginaPublica = window.location.pathname.endsWith('index.html');
  if (!esPaginaPublica && localStorage.getItem('rol') !== 'admin') {
    window.location.href = '/public/login.html';
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
    contenido = `<a href="login.html">Login</a>
    <a href="register.html">Register</a>`;
  }

  navPrincipal.innerHTML = contenido;
}

document.addEventListener('DOMContentLoaded', () => {
  actualizarNavegacion();
  const toggleBtn = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("navPrincipal");

  toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
});

document.addEventListener('DOMContentLoaded', () => {
  actualizarNavegacion();
  const toggleBtn = document.getElementById("nav-toggle-admin");
  const navLinks = document.getElementById("navAdmin");

  toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
});

document.addEventListener("DOMContentLoaded", () => {
const ocultarBtn = document.getElementById("ocultarMapaBtn");
if (ocultarBtn) {
  ocultarBtn.addEventListener("click", () => {
    document.getElementById("map-container").style.display = "none";
  });
  }
});

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
          </div>
          <div id="editor-container-${indice}" class="editor-container"></div>`;
if (noticia.ubicacion && typeof noticia.ubicacion.lat === 'number' && typeof noticia.ubicacion.lng === 'number') {
  html += `<div class="ubicacion">
             <button onclick="mostrarMapa(${noticia.ubicacion.lat}, ${noticia.ubicacion.lng}, '${noticia.ubicacion.direccion_normalizada?.replace(/'/g, "\\'") || ''}', ${indice})">
              Ver en el mapa
             </button>
              <div id="map-container-${indice}" class="map-container" style="display: none; margin-top: 20px;">
                <h4>Ubicación</h4>
                <div id="map-${indice}" style="height: 400px;"></div>
                <button onclick="ocultarMapa(${indice})">Ocultar mapa</button>
              </div>
           </div>`;
}
    html += `</div><hr>`;
  });

  listaNoticiasDiv.innerHTML = html;
}

/**
 * @param {Event} event 
 */

let indiceEditando = null;

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
          almacenarNoticia(noticia);  // usa la lógica para agregar o editar
        })
        .catch(function (error) {
          alert("Error al normalizar la dirección: " + error);
        });
    } else {
      almacenarNoticia(noticia);  // usa la lógica para agregar o editar
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
    continuarGuardado([]);  // sin imágenes nuevas
  }
}


/**
 * @param {Object} noticia 
 */
function almacenarNoticia(noticia) {
  let noticias = obtenerNoticias();

  if (indiceEditando !== null) {
    noticias[indiceEditando] = noticia;
    indiceEditando = null;
  } else {
    noticias.push(noticia);
  }

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

const mapas = {};
function mostrarMapa(lat, lng, direccion, indice) {
  const contenedor = document.getElementById(`map-container-${indice}`);
  contenedor.style.display = 'block';

  const mapDivExistente = document.getElementById(`map-${indice}`);
  if (mapDivExistente) {
    mapDivExistente.remove();
  }

  const nuevoDiv = document.createElement('div');
  nuevoDiv.id = `map-${indice}`;
  nuevoDiv.style.height = "400px";
  contenedor.insertBefore(nuevoDiv, contenedor.querySelector('button'));

  const mapa = L.map(`map-${indice}`).setView([lat, lng], 15);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(mapa);

  L.marker([lat, lng]).addTo(mapa).bindPopup(direccion).openPopup();
}

function ocultarMapa(indice) {
  const contenedorMapa = document.getElementById(`map-container-${indice}`);
  if (!contenedorMapa) return;
  contenedorMapa.style.display = "none";
}

/**
 * @param {number} indice 
 */

function editarNoticia(indice) {
  const noticias = obtenerNoticias();
  const noticia = noticias[indice];
  
  indiceEditando = indice;

  // Construir el formulario con los datos cargados
  const formularioHTML = `
    <form id="formNoticiaEditar-${indice}">
      <label for="titulo-${indice}">Título:</label>
      <input type="text" id="titulo-${indice}" name="titulo" value="${noticia.titulo}" required>

      <label for="descripcion-${indice}">Descripción breve:</label>
      <input type="text" id="descripcion-${indice}" name="descripcion" value="${noticia.descripcion}" required>

      <label for="cuerpo-${indice}">Cuerpo de la Noticia:</label>
      <textarea id="cuerpo-${indice}" name="cuerpo" required>${noticia.cuerpo}</textarea>

      <label for="fechaPublicacion-${indice}">Fecha de Publicación:</label>
      <input type="date" id="fechaPublicacion-${indice}" name="fechaPublicacion" value="${noticia.fechaPublicacion}" required>

      <label for="tema-${indice}">Tema:</label>
      <input type="text" id="tema-${indice}" name="tema" value="${noticia.tema}" required>

      <label for="direccion-${indice}">Dirección (opcional):</label>
      <input type="text" id="direccion-${indice}" name="direccion" value="${noticia.ubicacion?.direccion_normalizada || ''}">


      <label for="imagenes-${indice}">Imágenes (opcional):</label>
      <input type="file" id="imagenes-${indice}" name="imagenes" multiple>

      <button type="submit">Guardar Cambios</button>
      <button type="button" onclick="cancelarEdicion(${indice})">Cancelar</button>
    </form>
  `;

  // Insertar el formulario dentro del contenedor correspondiente
  const contenedorEditor = document.getElementById(`editor-container-${indice}`);
  contenedorEditor.innerHTML = formularioHTML + `
    <div id="map-container-${indice}" style="width: 100%; height: 300px; margin-top: 10px; display: none;">
      <div id="map-${indice}" style="width: 100%; height: 100%;"></div>
    </div>
  `;
  
    if (noticia.ubicacion) {
    setTimeout(() => {
      mostrarMapa(noticia.ubicacion.lat, noticia.ubicacion.lng, noticia.ubicacion.direccion_normalizada, indice);
    }, 300);
  }
  const formEditar = document.getElementById(`formNoticiaEditar-${indice}`);
  formEditar.addEventListener('submit', function(e) {
  e.preventDefault();

  // Obtener la noticia original (antes de editar)
  const noticiaOriginal = noticias[indice];

  // Leer valores editados del formulario
  const titulo = formEditar.querySelector(`#titulo-${indice}`).value;
  const descripcion = formEditar.querySelector(`#descripcion-${indice}`).value;
  const cuerpo = formEditar.querySelector(`#cuerpo-${indice}`).value;
  const fechaPublicacion = formEditar.querySelector(`#fechaPublicacion-${indice}`).value;
  const tema = formEditar.querySelector(`#tema-${indice}`).value;
  const direccionFormulario = formEditar.querySelector(`#direccion-${indice}`).value;
  const inputImagenes = formEditar.querySelector(`#imagenes-${indice}`);

  // Función para guardar la noticia final
  const guardarNoticiaFinal = (imagenesFinales, ubicacion) => {
    const noticiaEditada = {
      titulo,
      descripcion,
      cuerpo,
      fechaPublicacion,
      tema,
      imagenes: imagenesFinales,
      ubicacion: ubicacion || noticiaOriginal.ubicacion || null,
    };

    // Guardar noticia actualizada en el array y localStorage
    noticias[indice] = noticiaEditada;
    localStorage.setItem('noticias', JSON.stringify(noticias));
    indiceEditando = null;

    contenedorEditor.innerHTML = '';
    mostrarNoticias();
  };

  // Normalizar dirección si cambió
  const direccionOriginal = noticiaOriginal.ubicacion?.direccion_normalizada || "";
  if (direccionFormulario && direccionFormulario.trim() !== "" && direccionFormulario !== direccionOriginal) {
    normalizarDireccionUSIG(direccionFormulario)
      .then(ubicacionNormalizada => {
        procesarImagenes(inputImagenes, noticiaOriginal).then(imagenesFinales => {
          guardarNoticiaFinal(imagenesFinales, ubicacionNormalizada);
        });
      })
      .catch(error => {
        alert("Error al normalizar la dirección: " + error);
      });
  } else {
    procesarImagenes(inputImagenes, noticiaOriginal).then(imagenesFinales => {
      guardarNoticiaFinal(imagenesFinales, noticiaOriginal.ubicacion);
    });
  }
});
}

function procesarImagenes(inputElement, noticiaOriginal) {
  return new Promise((resolve) => {
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const promises = [];
      for (let i = 0; i < inputElement.files.length; i++) {
        const file = inputElement.files[i];
        promises.push(new Promise(res => {
          const reader = new FileReader();
          reader.onload = e => {
            res({
              nombre: file.name,
              tipo: file.type,
              dataUrl: e.target.result
            });
          };
          reader.readAsDataURL(file);
        }));
      }
      Promise.all(promises).then(imagenesData => {
        resolve(imagenesData);
      });
    } else {
      resolve(noticiaOriginal.imagenes || []);
    }
  });
}

function cancelarEdicion(indice) {
  const contenedorEditor = document.getElementById(`editor-container-${indice}`);
  contenedorEditor.innerHTML = ''; // Quita el formulario
  indiceEditando = null;
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
window.ocultarMapa = ocultarMapa;
window.cancelarEdicion = cancelarEdicion;
window.guardarNoticia = guardarNoticia;
window.cerrarSesion = cerrarSesion;
window.normalizarDireccionUSIG = normalizarDireccionUSIG;