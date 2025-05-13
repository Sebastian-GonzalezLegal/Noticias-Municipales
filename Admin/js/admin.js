const noticias = [];

document.getElementById('formNoticia').addEventListener('submit', function (e) {
  e.preventDefault();

  const titulo = document.getElementById('titulo').value;
  const cuerpo = document.getElementById('cuerpo').value;
  const fecha = document.getElementById('fecha').value;
  const direccion = document.getElementById('direccion').value;

  normalizarDireccion(direccion).then(coordenadas => {
    const noticia = { titulo, cuerpo, fecha, direccion, coordenadas };
    noticias.push(noticia);

    mostrarNoticias();
    this.reset();

  }).catch(error => {
    alert('No se pudo normalizar la dirección: ' + error);
  });
});

function normalizarDireccion(dir) {
  return new Promise((resolve, reject) => {
    const direccionFormateada = encodeURIComponent(dir);
    const url = `http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=${direccionFormateada}&geocodificar=true`;

    console.log('Consultando URL:', url); // Depuración: verificar la URL que estamos enviando

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('Datos obtenidos:', data); // Depuración: verificar los datos obtenidos

        if (data.direccionesNormalizadas && data.direccionesNormalizadas.length > 0) {
          // Verificar si hay coordenadas en el primer resultado
          const resultado = data.direccionesNormalizadas[0];
          if (resultado.coordenadas && resultado.coordenadas.x && resultado.coordenadas.y) {
            const latLng = { lat: resultado.coordenadas.y, lng: resultado.coordenadas.x }; // Usar x para longitud e y para latitud
            console.log('Coordenadas obtenidas:', latLng); // Depuración
            resolve(latLng);
          } else {
            reject('No se encontraron coordenadas exactas para esta dirección.');
          }
        } else {
          reject('No se encontraron resultados para esta dirección. Intenta con una variante o verifica la dirección.');
        }
      })
      .catch(error => {
        console.error('Error al consultar la API de USIG:', error);
        reject('Error al consultar la API de USIG: ' + error);
      });
  });
}

function mostrarNoticias() {
  const contenedor = document.getElementById('listaNoticias');
  contenedor.innerHTML = '';

  noticias.forEach((noticia, index) => {
    const btn = document.createElement('button');
    btn.textContent = noticia.titulo + ' (' + noticia.fecha + ')';
    btn.addEventListener('click', () => mostrarMapa(noticia));
    contenedor.appendChild(btn);
  });
}

// Mostrar ubicación en el mapa con Leaflet
let mapa = L.map('map').setView([-34.6037, -58.3816], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(mapa);

function mostrarMapa(noticia) {
  mapa.setView([noticia.coordenadas.lat, noticia.coordenadas.lng], 15);
  L.marker([noticia.coordenadas.lat, noticia.coordenadas.lng])
    .addTo(mapa)
    .bindPopup(`<b>${noticia.titulo}</b><br>${noticia.direccion}`)
    .openPopup();
}
