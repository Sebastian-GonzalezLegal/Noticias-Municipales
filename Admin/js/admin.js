import {
  obtenerNoticias,
  normalizarDireccionUSIG,
  cerrarSesion,
  normalizarRutaImagen,
  lista_temas,
} from './utils.js';

let indiceEditando = null;

function verificarAdmin() {
  const esPaginaPublica = window.location.pathname.endsWith('index.html');
  if (!esPaginaPublica && localStorage.getItem('rol') !== 'admin') {
    window.location.href = '/public/login.html';
  }
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
      <a href="#" onclick="cerrarSesion()">Cerrar Sesión</a>
    `;
  } else {
    contenido = `
      <a href="login.html">Autenticarse</a>
      <a href="register.html">Registrarse</a>
    `;
  }

  navPrincipal.innerHTML = contenido;
}

function inicializarFormularioNoticia() {
  const formNoticia = document.getElementById('formNoticia');
  if (!formNoticia) return;
  document.getElementById('tema').innerHTML += lista_temas.map(k => `<option value="${k}">${k}</option>`).join('')
  const nuevoForm = formNoticia.cloneNode(true);
  formNoticia.parentNode.replaceChild(nuevoForm, formNoticia);
  nuevoForm.addEventListener('submit', guardarNoticia);
  const direccionInput = nuevoForm.querySelector('#direccion');
  direccionInput.addEventListener('input',()=>{direccionInput.setCustomValidity('');});
}

function mostrarNoticias() {
  const listaNoticiasDiv = document.getElementById('listaNoticias');
  if (!listaNoticiasDiv) return;

  const noticias = obtenerNoticias();
  if (noticias.length === 0) {
    listaNoticiasDiv.innerHTML = '<p>No hay noticias publicadas.</p>';
    return;
  }

  let html = '';
  noticias.forEach((noticia, indice) => {
    html += `
      <div class="noticia">
        <h3>${noticia.titulo}</h3>
        <p><strong>Descripción:</strong> ${noticia.descripcion || ''}</p>
        <p><strong>Fecha:</strong> ${noticia.fechaPublicacion || noticia.fecha || ''}</p>
        <p><strong>Tema:</strong> ${noticia.tema || ''}</p>
        <p>${noticia.cuerpo}</p>
    `;

    if (noticia.imagenes && noticia.imagenes.length > 0) {
      html += `<div class="galeria-imagenes">`;
      noticia.imagenes.forEach((imagen) => {
        const rutaImagen = normalizarRutaImagen(imagen);
        html += `<img src="${rutaImagen}" alt="${typeof imagen === 'string' ? imagen.split('/').pop() : 'imagen'}" style="max-width: 200px; margin: 5px;">`;
      });
      html += `</div>`;
    }

    html += `
        <div class="acciones">
          <button onclick="editarNoticia(${indice})">Editar</button>
          <button onclick="eliminarNoticia(${indice})">Eliminar</button>
        </div>
        <div id="editor-container-${indice}" class="editor-container"></div>
    `;

    const direccionParaMapa = noticia.ubicacion?.direccion_normalizada || noticia.ubicacion || noticia.direccion || '';
    if (direccionParaMapa != '') {
      const dirEscapada = direccionParaMapa.replace(/'/g, "\\'");

      html += `
        <div class="ubicacion">
          <button onclick="verMapaConNormalizacion('${dirEscapada}', ${indice})">
            Ver en el mapa
          </button>
          <div
            id="map-container-${indice}"
            class="map-container"
            style="display: none; margin-top: 20px;"
          >
            <h4>Ubicación</h4>
            <div id="map-${indice}" style="height: 400px;"></div>
            <button onclick="ocultarMapa(${indice})">Ocultar mapa</button>
          </div>
        </div>
      `;
    }
    html += `</div><hr>`;
  });

  listaNoticiasDiv.innerHTML = html;
}

async function verMapaConNormalizacion(direccion, indice) {
  try {
    const resultado = await normalizarDireccionUSIG(direccion);
    mostrarMapa(resultado.lat, resultado.lng, resultado.direccion_normalizada, indice);

    const noticias = obtenerNoticias();
    if (noticias[indice]) {
      noticias[indice].ubicacion = {
        direccion_normalizada: resultado.direccion_normalizada,
        lat: resultado.lat,
        lng: resultado.lng,
      };
      localStorage.setItem('noticias', JSON.stringify(noticias));
    }
  } catch (error) {
    alert('No se pudo obtener la ubicación: ' + error.message);
  }
}

const NOTICIAS_VERSION = 2;
function inicializarNoticiasLocales() {
  const storedVersion = localStorage.getItem('noticias_version');
  if (storedVersion && parseInt(storedVersion, 10) === NOTICIAS_VERSION) {
    return;
  }
  fetch('/data/noticias.json')
    .then((res) => {
      if (!res.ok) throw new Error('No se pudo obtener noticias.json');
      return res.json();
    })
    .then(noticiasJSON => {
      const noticiasParaLocal = noticiasJSON.map(n => ({
        titulo: n.titulo || '',
        descripcion: n.descripcion || '',
        cuerpo: n.cuerpo || '',
        fechaPublicacion: n.fecha || '',
        tema: n.tema || '',
        imagenes: Array.isArray(n.imagenes) ? n.imagenes : [],
        ubicacion: typeof n.ubicacion === 'string' && n.ubicacion.trim()
          ? n.ubicacion
          : null,
      }));
      localStorage.setItem('noticias', JSON.stringify(noticiasParaLocal));
      localStorage.setItem('noticias_version', NOTICIAS_VERSION);
    })
    .catch(() => { });
}

document.addEventListener('DOMContentLoaded', async function () {
  await inicializarNoticiasLocales();
  mostrarNoticias();
  actualizarNavegacion();
  inicializarFormularioNoticia();
  inicializarAutocompletadorDireccion();
});

function inicializarAutocompletadorDireccion() {
  const input = $('#direccion');
  if (input.length === 0) return; // <-- Agregá este chequeo

  const btnMapa = $('#btnVerMapa');
  const mapaCont = $('#mapa');

  input.val('Cargando…').prop('disabled', true);
  btnMapa.prop('disabled', true);

  function afterGeoCoding(pt) {
    const img = usig.MapaEstatico({
      x: pt.getX(),
      y: pt.getY(),
      marcarPunto: 1,
      width: 600,
      desc: input.val()
    });
    mapaCont.text('Cargando mapa…');
    img.onload = () => {
      mapaCont.empty().append(img);
    };
  }
  const ac = new usig.AutoCompleter('direccion', {
    debug: false,
    rootUrl: 'https://servicios.usig.buenosaires.gob.ar/usig-js/2.0/',
    useInventario: true,
    onReady() {
      input.val('').prop('disabled', false).focus();
    },
    afterSelection(option) {
      ac.selectedOption = option;
      btnMapa.prop('disabled', false);
    }
  });

  ac.addSuggester('DireccionesAMBA', {
    inputPause: 500,
    minTextLength: 3
  });

  btnMapa.click(() => {
    if (!ac.selectedOption) return;
    mapaCont.text('Buscando coordenadas…');
    ac.geocode(ac.selectedOption, afterGeoCoding);
  });
}

function guardarNoticia(event) {
  event.preventDefault();

  const titulo = document.getElementById('titulo').value;
  const descripcion = document.getElementById('descripcion')
    ? document.getElementById('descripcion').value
    : '';
  const cuerpo = document.getElementById('cuerpo').value;
  const fechaPublicacion = document.getElementById('fechaPublicacion').value;
  const tema = lista_temas[document.getElementById('tema').selectedIndex];
  const direccionInput = document.getElementById('direccion');
  const direccion = direccionInput.value;
  const inputImagenes = document.getElementById('imagenes');

  const continuarGuardado = (imagenesFinales) => {
    const noticia = {
      titulo,
      descripcion,
      cuerpo,
      fechaPublicacion,
      tema,
      imagenes: imagenesFinales,
    };
    if (direccion && direccion.trim() !== '') {
      normalizarDireccionUSIG(direccion)
        .then((ubicacion) => {
          noticia.ubicacion = ubicacion;
          almacenarNoticia(noticia);
          alert('Noticia guardada correctamente');
        })
        .catch(() => {
          direccionInput.setCustomValidity('Dirección inexistente');
          direccionInput.reportValidity();
          return;
        });
    } else {
      noticia.ubicacion = null;
      almacenarNoticia(noticia);
      alert('Noticia guardada correctamente');
    }
  };

  if (inputImagenes && inputImagenes.files && inputImagenes.files.length > 0) {
    const promises = [];
    for (let i = 0; i < inputImagenes.files.length; i++) {
      const file = inputImagenes.files[i];
      promises.push(
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve({
              nombre: file.name,
              tipo: file.type,
              dataUrl: e.target.result,
            });
          };
          reader.readAsDataURL(file);
        })
      );
    }
    Promise.all(promises).then((imagenesData) => {
      continuarGuardado(imagenesData);
    });
  } else {
    continuarGuardado([]);
  }
}

function almacenarNoticia(noticia) {
  const noticias = obtenerNoticias();
  if (indiceEditando !== null) {
    noticias[indiceEditando] = noticia;
    indiceEditando = null;
  } else {
    noticias.push(noticia);
  }
  localStorage.setItem('noticias', JSON.stringify(noticias));
  document.getElementById('formNoticia').reset();
  const inputImagenes = document.getElementById('imagenes');
  if (inputImagenes) inputImagenes.value = '';
  mostrarNoticias();
}

function mostrarMapa(lat, lng, direccion, indice) {
  const contenedor = document.getElementById(`map-container-${indice}`);
  contenedor.style.display = 'block';
  const mapDivExistente = document.getElementById(`map-${indice}`);
  if (mapDivExistente) mapDivExistente.remove();
  const nuevoDiv = document.createElement('div');
  nuevoDiv.id = `map-${indice}`;
  nuevoDiv.style.height = '400px';
  contenedor.insertBefore(nuevoDiv, contenedor.querySelector('button'));
  const mapa = L.map(`map-${indice}`).setView([lat, lng], 15);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(mapa);
  L.marker([lat, lng]).addTo(mapa).bindPopup(direccion).openPopup();
}

function ocultarMapa(indice) {
  const contenedorMapa = document.getElementById(`map-container-${indice}`);
  if (!contenedorMapa) return;
  contenedorMapa.style.display = 'none';
}

function inicializarAutocompletadorDireccionEdicion(indice) {
  const input = $(`#direccion-${indice}`);
  if ($(`#btnVerMapa-editar-${indice}`).length === 0) {
    input.after(`<button type="button" id="btnVerMapa-editar-${indice}" style="margin-left:8px;">Ver en Mapa</button>`);
  }
  if ($(`#mapa-editar-${indice}`).length === 0) {
    input.parent().append(`<div id="mapa-editar-${indice}" style="margin-top:10px;"></div>`);
  }
  const btnMapa = $(`#btnVerMapa-editar-${indice}`);
  const mapaCont = $(`#mapa-editar-${indice}`);

  btnMapa.prop('disabled', true);

  function afterGeoCoding(pt, direccion) {
    mapaCont.empty();
    if ($(`#mapa-leaflet-editar-${indice}`).length === 0) {
      mapaCont.append(`<div id="mapa-leaflet-editar-${indice}" style="height: 400px; width: 100%;"></div>`);
    }
    if (window[`_leafletMapEditar${indice}`]) {
      window[`_leafletMapEditar${indice}`].remove();
    }
    window[`_leafletMapEditar${indice}`] = L.map(`mapa-leaflet-editar-${indice}`).setView([pt.getY(), pt.getX()], 17);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(window[`_leafletMapEditar${indice}`]);
    L.marker([pt.getY(), pt.getX()])
      .addTo(window[`_leafletMapEditar${indice}`])
      .bindPopup(direccion ? String(direccion) : '')
      .openPopup();
  }

  const ac = new usig.AutoCompleter(`direccion-${indice}`, {
    debug: false,
    useInventario: true,
    onReady() {
      input.prop('disabled', false).focus();
    },
    afterSelection(option) {
      ac.selectedOption = option;
      btnMapa.prop('disabled', false);
    }
  });

  ac.addSuggester('DireccionesAMBA', { inputPause: 500, minTextLength: 3 });

  btnMapa.click(function () {
    if (ac.selectedOption) {
      mapaCont.text('Buscando coordenadas…');
      const url = 'https://servicios.usig.buenosaires.gob.ar/normalizar?direccion=' +
        encodeURIComponent(ac.selectedOption);
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data && data.direccionesNormalizadas && data.direccionesNormalizadas.length > 0) {
            const dirObj = data.direccionesNormalizadas[0];
            if (dirObj.coordenadas && dirObj.coordenadas.x != null && dirObj.coordenadas.y != null) {
              const pt = {
                getX: () => Number(dirObj.coordenadas.x),
                getY: () => Number(dirObj.coordenadas.y)
              };
              afterGeoCoding(pt, ac.selectedOption);
            } else {
              mapaCont.text('No se encontraron coordenadas para esta dirección');
            }
          } else {
            mapaCont.text('No se encontraron coordenadas para esta dirección');
          }
        })
        .catch(error => {
          console.error('Error al geocodificar:', error);
          mapaCont.text('Error al buscar las coordenadas');
        });
    }
  });
}

function editarNoticia(indice) {
  const noticias = obtenerNoticias();
  const noticiaOriginal = noticias[indice];
  indiceEditando = indice;

  let direccionOriginal = '';
  if (typeof noticiaOriginal.ubicacion === 'string') {
    direccionOriginal = noticiaOriginal.ubicacion;
  } else if (
    noticiaOriginal.ubicacion &&
    typeof noticiaOriginal.ubicacion === 'object' &&
    noticiaOriginal.ubicacion.direccion_normalizada
  ) {
    direccionOriginal = noticiaOriginal.ubicacion.direccion_normalizada;
  }

  const formularioHTML = `
    <form id="formNoticiaEditar-${indice}">
      <label for="titulo-${indice}">Título:</label>
      <input type="text" id="titulo-${indice}" name="titulo" value="${noticiaOriginal.titulo}" required>
      <label for="descripcion-${indice}">Descripción breve:</label>
      <input type="text" id="descripcion-${indice}" name="descripcion" value="${noticiaOriginal.descripcion}" required>
      <label for="cuerpo-${indice}">Cuerpo de la Noticia:</label>
      <textarea id="cuerpo-${indice}" name="cuerpo" required>"${noticiaOriginal.cuerpo}"</textarea>
      <label for="fechaPublicacion-${indice}">Fecha de Publicación:</label>
      <input type="date" id="fechaPublicacion-${indice}" name="fechaPublicacion" value="${noticiaOriginal.fechaPublicacion}" required>
      <label for="tema-${indice}">Tema:</label>
      <select id="tema-${indice}" name="tema" required>
        ${lista_temas.map(k => `<option value="${k}" ${noticiaOriginal.tema === k ? 'selected' : ''}>${k}</option>`).join('')}
      </select>
      <label for="direccion-${indice}">Dirección (opcional):</label>
      <input type="text" id="direccion-${indice}" name="direccion" value="${direccionOriginal}">
      <label for="imagenes-${indice}">Imágenes (opcional):</label>
      <input type="file" id="imagenes-${indice}" name="imagenes" multiple>
      <button type="submit">Guardar Cambios</button>
      <button type="button" onclick="cancelarEdicion(${indice})">Cancelar</button>
  `;
  const contenedorEditor = document.getElementById(`editor-container-${indice}`);
  contenedorEditor.innerHTML =
    formularioHTML +
    `
    <div id="map-container-${indice}" style="width: 100%; height: 300px; margin-top: 10px; display: none;">
      <div id="map-${indice}" style="width: 100%; height: 100%;"></div>
    </div>
  `;

  inicializarAutocompletadorDireccionEdicion(indice);

  const formEditar = document.getElementById(`formNoticiaEditar-${indice}`);
  formEditar.addEventListener('submit', function (e) {
    e.preventDefault();
    const titulo = formEditar.querySelector(`#titulo-${indice}`).value;
    const descripcion = formEditar.querySelector(`#descripcion-${indice}`).value;
    const cuerpo = formEditar.querySelector(`#cuerpo-${indice}`).value;
    const fechaPublicacion = formEditar.querySelector(
      `#fechaPublicacion-${indice}`
    ).value;
    const tema = lista_temas[formEditar.querySelector(`#tema-${indice}`).selectedIndex];
    const direccionInput = formEditar.querySelector(`#direccion-${indice}`)
    const direccion = direccionInput.value;
    const inputImagenes = formEditar.querySelector(`#imagenes-${indice}`);

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
      noticias[indice] = noticiaEditada;
      localStorage.setItem('noticias', JSON.stringify(noticias));
      indiceEditando = null;
      contenedorEditor.innerHTML = '';
      mostrarNoticias();
    };

    if (
      direccion &&
      direccion.trim() !== '' &&
      direccion !== direccionOriginal
    ) {
      normalizarDireccionUSIG(direccion)
        .then((ubicacionNormalizada) => {
          procesarImagenes(inputImagenes, noticiaOriginal).then((imagenesFinales) => {
            guardarNoticiaFinal(imagenesFinales, ubicacionNormalizada);
          });
        })
        .catch(() => {
          direccionInput.setCustomValidity('Dirección inexistente');
          direccionInput.reportValidity();
          direccionInput.addEventListener('input',() => {direccionInput.setCustomValidity('');});
          return;
        });
    } else {
      procesarImagenes(inputImagenes, noticiaOriginal).then((imagenesFinales) => {
        guardarNoticiaFinal(imagenesFinales, noticiaOriginal.ubicacion);
      });
    }
  });
}

function procesarImagenes(inputElement, noticiaOriginal) {
  return new Promise((resolve) => {
    const existentes = Array.isArray(noticiaOriginal.imagenes)
      ? noticiaOriginal.imagenes.slice()
      : [];

    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const nuevasPromises = [];
      for (let i = 0; i < inputElement.files.length; i++) {
        const file = inputElement.files[i];
        nuevasPromises.push(
          new Promise((res) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              res({
                nombre: file.name,
                tipo: file.type,
                dataUrl: e.target.result,
              });
            };
            reader.readAsDataURL(file);
          })
        );
      }
      Promise.all(nuevasPromises).then((imagenesNuevas) => {
        const todas = existentes.concat(imagenesNuevas);
        resolve(todas);
      });
    } else {
      resolve(existentes);
    }
  });
}

function cancelarEdicion(indice) {
  const contenedorEditor = document.getElementById(`editor-container-${indice}`);
  contenedorEditor.innerHTML = '';
  indiceEditando = null;
}

function eliminarNoticia(indice) {
  const noticias = obtenerNoticias();
  if (confirm('¿Está seguro que desea eliminar la noticia?')) {
    noticias.splice(indice, 1);
    localStorage.setItem('noticias', JSON.stringify(noticias));
    mostrarNoticias();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  actualizarNavegacion();

  const toggleBtn = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("navPrincipal");

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  const toggleBtnAdmin = document.getElementById("nav-toggle-admin");
  const navLinksAdmin = document.getElementById("navAdmin");

  if (toggleBtnAdmin && navLinksAdmin) {
    toggleBtnAdmin.addEventListener("click", () => {
      navLinksAdmin.classList.toggle("show");
    });
  }
});

window.verificarAdmin = verificarAdmin;
window.editarNoticia = editarNoticia;
window.eliminarNoticia = eliminarNoticia;
window.mostrarMapa = mostrarMapa;
window.ocultarMapa = ocultarMapa;
window.cancelarEdicion = cancelarEdicion;
window.guardarNoticia = guardarNoticia;
window.cerrarSesion = cerrarSesion;
window.verMapaConNormalizacion = verMapaConNormalizacion;