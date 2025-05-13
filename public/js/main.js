fetch('/data/noticias.json')
  .then(response => {
    if (!response.ok) throw new Error('Error al obtener el archivo JSON');
    return response.json();
  })
  .then(noticias => {
    const contenedor = document.getElementById('contenedorNoticias');
    contenedor.innerHTML = '';

  noticias.forEach(noticia => {
    const div = document.createElement('div');
    div.className = 'noticia clickable';
    div.innerHTML = `
    <h2>${noticia.titulo}</h2>
    <small>Fecha: ${noticia.fecha}</small>
    <p>${noticia.cuerpo.slice(0, 100)}...</p>
    `;

    // Evento de clic: guarda la noticia y redirige
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
