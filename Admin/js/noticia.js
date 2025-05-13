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

fetch('/data/noticias.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al obtener el archivo JSON');
    }
    return response.json();
  })
  .then(jsonNoticias => {
    let localStorageNoticias = obtenerNoticiasLocalStorage();
    let todasNoticias = jsonNoticias.concat(localStorageNoticias);

    const contenedor = document.getElementById('contenedorNoticias');
    contenedor.innerHTML = '';

    todasNoticias.forEach(noticia => {
      const div = document.createElement('div');
      div.className = 'noticia clickable';
      div.innerHTML = `
        <h2>${noticia.titulo}</h2>
        <small>Fecha: ${noticia.fecha || noticia.fechaPublicacion}</small>
        <p>${noticia.cuerpo.slice(0, 100)}...</p>
      `;

      div.addEventListener('click', () => {
        localStorage.setItem('noticiaSeleccionada', JSON.stringify(noticia));
        window.location.href = 'noticia.html';
      });

      contenedor.appendChild(div);
    });
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById('contenedorNoticias').innerText = 'No se pudieron cargar las noticias.';
  });

const contenedorDetalle = document.getElementById('detalleNoticia');
const noticiaSeleccionada = JSON.parse(localStorage.getItem('noticiaSeleccionada'));

if (noticiaSeleccionada) {
  contenedorDetalle.innerHTML = `
    <h2>${noticiaSeleccionada.titulo}</h2>
    <small>Fecha: ${noticiaSeleccionada.fecha || noticiaSeleccionada.fechaPublicacion}</small>
    <p>${noticiaSeleccionada.cuerpo}</p>
  `;
} else {
  contenedorDetalle.innerHTML = '<p>No se encontró la noticia. Volvé a la <a href="inicio.html">página principal</a>.</p>';
}


const contenedor = document.getElementById('detalleNoticia');
const noticia = JSON.parse(localStorage.getItem('noticiaSeleccionada'));

if (noticia) {
  contenedor.innerHTML = `
    <h2>${noticia.titulo}</h2>
    <small>Fecha: ${noticia.fecha}</small>
    <p>${noticia.cuerpo}</p>
  `;
} else {
  contenedor.innerHTML = '<p>No se encontró la noticia. Volvé a la <a href="inicio.html">página principal</a>.</p>';
}

