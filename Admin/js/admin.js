document.addEventListener('DOMContentLoaded', function () {
  mostrarNoticias();
  actualizarNavegacion();

  document.getElementById('btnCrearNoticia').addEventListener('click', function () {
    let seccionCrear = document.getElementById('crearNoticiaSection');
    seccionCrear.style.display = (seccionCrear.style.display === 'none' || seccionCrear.style.display === '') ? 'block' : 'none';
  });

  const formNoticia = document.getElementById('formNoticia');
  if (formNoticia) {
    formNoticia.addEventListener('submit', guardarNoticia);
  }

  if (document.getElementById('map')) {
    window.mapa = L.map('map').setView([-34.6037, -58.3816], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(window.mapa);
  }
});

document.addEventListener('DOMContentLoaded', function () {
  function actualizarNavegacion() {
    const navPrincipal = document.getElementById('navPrincipal');
    if (!navPrincipal) {
      console.error('No se encontró el elemento con id "navPrincipal"');
      return;
    }

    const rol = localStorage.getItem('rol');

    if (rol === 'admin') {
      navPrincipal.innerHTML = `
        <a href="/Admin/panel.html">Panel de Administración</a> |
        <a href="#" onclick="cerrarSesion()">Cerrar Sesión</a>
      `;
    } else if (rol === 'usuario') {
      navPrincipal.innerHTML = `
        <a href="mis-preguntas.html">Mis Preguntas</a> |
        <a href="#" onclick="cerrarSesion()">Cerrar Sesión</a>
      `;
    } else {
      navPrincipal.innerHTML = `<a href="login.html">Login</a>`;
    }
  }

  actualizarNavegacion();
});

function cerrarSesion() {
  localStorage.removeItem('usuario');
  localStorage.removeItem('rol');
  window.location.href = "/public/index.html";
}

function obtenerNoticias() {
  let noticias = localStorage.getItem("noticias");
  if (noticias) {
    try {
      return JSON.parse(noticias);
    } catch (e) {
      console.error("Error al parsear las noticias desde localStorage:", e);
      return [];
    }
  }
  return [];
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
              <p>${noticia.cuerpo}</p>
              <div class="acciones">
                <button onclick="editarNoticia(${indice})">Editar</button>
                <button onclick="eliminarNoticia(${indice})">Eliminar</button>
              </div>`;
    if (noticia.ubicacion) {
      html += `<div class="ubicacion">
                <button onclick="mostrarMapa(${noticia.ubicacion.lat}, ${noticia.ubicacion.lng}, '${noticia.ubicacion.direccion_normalizada}', ${indice})">Ver en el mapa</button>
                <div id="contenedorMapa_${indice}" class="contenedor-mapa" style="height: 300px; margin-top: 10px; display: none;"></div>
              </div>`;
    } else {
      html += `<div class="ubicacion">
                <p>Sin ubicación asignada</p>
              </div>`;
    }
    html += `</div><hr>`;
  });

  listaNoticiasDiv.innerHTML = html;
}

function guardarNoticia(event) {
  event.preventDefault();

  const titulo = document.getElementById('titulo').value;
  const descripcion = document.getElementById('descripcion') ? document.getElementById('descripcion').value : "";
  const cuerpo = document.getElementById('cuerpo').value;
  const fechaPublicacion = document.getElementById('fechaPublicacion').value;
  const tema = document.getElementById('tema').value;
  const direccion = document.getElementById('direccion').value;

  const inputImagenes = document.getElementById('imagenes');
  let imagenes = [];
  if (inputImagenes && inputImagenes.files && inputImagenes.files.length > 0) {
    for (let i = 0; i < inputImagenes.files.length; i++) {
      imagenes.push(inputImagenes.files[i].name);
    }
  }

  let noticia = {
    titulo,
    descripcion,
    cuerpo,
    fechaPublicacion,
    tema,
    imagenes
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

function almacenarNoticia(noticia) {
  let noticias = obtenerNoticias();
  noticias.push(noticia);
  localStorage.setItem("noticias", JSON.stringify(noticias));
  alert("Noticia guardada exitosamente!");
  document.getElementById('formNoticia').reset();
  mostrarNoticias();
}

let mapasInstancias = {};

function mostrarMapa(lat, lng, direccionNormalizada, indice) {
  const contenedorMapaId = `contenedorMapa_${indice}`;
  const contenedorMapa = document.getElementById(contenedorMapaId);

  if (contenedorMapa.style.display === 'none') {
    contenedorMapa.style.display = 'block';

    if (mapasInstancias[indice]) {
      mapasInstancias[indice].remove();
      delete mapasInstancias[indice];
    }

    mapasInstancias[indice] = L.map(contenedorMapaId).setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapasInstancias[indice]);

    const noticia = obtenerNoticias()[indice];
    L.marker([lat, lng]).addTo(mapasInstancias[indice])
      .bindPopup(`<b>${noticia.titulo}</b><br>${direccionNormalizada}`)
      .openPopup();
  } else {
    contenedorMapa.style.display = 'none';

    if (mapasInstancias[indice]) {
      mapasInstancias[indice].remove();
      delete mapasInstancias[indice];
    }
  }
}

function editarNoticia(indice) {
  let noticias = obtenerNoticias();
  if (noticias[indice]) {
    let noticia = noticias[indice];
    document.getElementById('titulo').value = noticia.titulo;
    if (document.getElementById('descripcion')) {
      document.getElementById('descripcion').value = noticia.descripcion;
    }
    document.getElementById('cuerpo').value = noticia.cuerpo;
    document.getElementById('fechaPublicacion').value = noticia.fechaPublicacion;
    document.getElementById('tema').value = noticia.tema;
    if (noticia.ubicacion) {
      document.getElementById('direccion').value = noticia.ubicacion.direccion_normalizada;
    }
    noticias.splice(indice, 1);
    localStorage.setItem("noticias", JSON.stringify(noticias));
    document.getElementById('crearNoticiaSection').style.display = 'block';
  }
}

function eliminarNoticia(indice) {
  let noticias = obtenerNoticias();
  if (confirm("¿Está seguro que desea eliminar la noticia?")) {
    noticias.splice(indice, 1);
    localStorage.setItem("noticias", JSON.stringify(noticias));
    mostrarNoticias();
  }
}

function verificarAdmin() {
  if (localStorage.getItem('rol') !== 'admin') {
    window.location.href = 'login.html';
  }

  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('rol');
    localStorage.removeItem('username');
    window.location.href = 'login.html';
  });
}