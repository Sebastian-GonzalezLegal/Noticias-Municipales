/**
 * Obtiene las noticias del localStorage
 * @returns {Array} Array de noticias
 */
function obtenerNoticias() {
    console.log("Obteniendo noticias desde localStorage");
    let noticiasLocalStorage = localStorage.getItem("noticias");
    if (noticiasLocalStorage) {
        try {
            const noticias = JSON.parse(noticiasLocalStorage);
            console.log(`${noticias.length} noticias obtenidas del localStorage`);
            return noticias;
        } catch (e) {
            console.error("Error al parsear las noticias desde localStorage:", e);
            return [];
        }
    }
    console.log("No hay noticias en localStorage");
    return [];
}
/**
* Normaliza una dirección usando el servicio USIG
* @param {string} direccion - Dirección a normalizar
* @returns {Promise} Promise con la ubicación normalizada
*/
async function obtenerCoordenadasUSIG(direccion) {
    const url = `http://servicios.usig.buenosaires.gob.ar/normalizar?direccion=${encodeURIComponent(direccion)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error("Error en la respuesta de USIG:", response.statusText);
            return null;
        }

        const data = await response.json();
        console.log("Respuesta completa de USIG para:", direccion, data);

        // Verificar estructura de respuesta según API de USIG
        if (data && data.direccionesNormalizadas && data.direccionesNormalizadas.length > 0) {
            const candidato = data.direccionesNormalizadas[0];
            console.log("Candidato obtenido:", candidato);

            // Asegurarse de que hay coordenadas
            if (candidato.coordenadas && candidato.coordenadas.x != null && candidato.coordenadas.y != null) {
                return {
                    lat: candidato.coordenadas.y,
                    lng: candidato.coordenadas.x,
                    direccion_normalizada: candidato.direccion || direccion
                };
            } else {
                console.warn("No se encontraron coordenadas para la dirección:", direccion);
            }
        } else {
            console.warn("No se pudo normalizar la dirección:", direccion, data);
        }
    } catch (error) {
        console.error("Error al obtener coordenadas con USIG:", error);
    }

    return null;
}

function cerrarSesion() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("rol");
    window.location.href = "/public/index.html";
}

export { obtenerNoticias, obtenerCoordenadasUSIG, cerrarSesion };