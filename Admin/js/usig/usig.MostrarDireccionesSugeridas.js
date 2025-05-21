$(function () {
  function afterGeoCoding(pt, direccion) {
    // Limpia el contenedor
    $('#mapa').empty();

    // Crea un div para el mapa si no existe
    if ($('#mapa-leaflet').length === 0) {
      $('#mapa').append('<div id="mapa-leaflet" style="height: 400px; width: 100%;"></div>');
    }

    if (window._leafletMap) {
      window._leafletMap.remove();
    }

    window._leafletMap = L.map('mapa-leaflet').setView([pt.getY(), pt.getX()], 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(window._leafletMap);

    L.marker([pt.getY(), pt.getX()])
      .addTo(window._leafletMap)
      .bindPopup(direccion ? String(direccion) : '')
      .openPopup();
  }

  $('#direccion').val('Cargando…');
  const ac = new usig.AutoCompleter('direccion', {
    debug: false,
    useInventario: true,
    onReady() {
      $('#direccion').val('').prop('disabled', false).focus();
    },
    afterSelection(option) {
      ac.selectedOption = option;
      $('#btnVerMapa').prop('disabled', false);
    }
  });

  ac.addSuggester('DireccionesAMBA', { inputPause: 500, minTextLength: 3 });

  $('#btnVerMapa').click(function () {
    if (ac.selectedOption) {
      $('#mapa').text('Buscando coordenadas…');
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
              $('#mapa').text('No se encontraron coordenadas para esta dirección');
            }
          } else {
            $('#mapa').text('No se encontraron coordenadas para esta dirección');
          }
        })
        .catch(error => {
          console.error('Error al geocodificar:', error);
          $('#mapa').text('Error al buscar las coordenadas');
        });
    }
  });
});
