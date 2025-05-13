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
