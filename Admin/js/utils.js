export const lista_temas = [
	'Obras Públicas',
	'Medio Ambiente',
	'Cultura',
	'Deportes',
	'Salud',
	'Educación',
	'Eventos',
	'Transporte'
];

export function obtenerNoticias() {
    try {
        const raw = localStorage.getItem('noticias');
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error("Error al obtener noticias:", error);
        return [];
    }
}

export function cerrarSesion() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
    window.location.href = '/public/index.html';
}

export async function normalizarDireccionUSIG(direccion) {
    const url =
        'https://servicios.usig.buenosaires.gob.ar/normalizar?direccion=' +
        encodeURIComponent(direccion);
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error en USIG');
    const data = await response.json();
    if (
        data &&
        data.direccionesNormalizadas &&
        data.direccionesNormalizadas.length > 0
    ) {
        const dirObj = data.direccionesNormalizadas[0];
        if (
            dirObj.coordenadas &&
            dirObj.coordenadas.x != null &&
            dirObj.coordenadas.y != null
        ) {
            return {
                direccion_normalizada: dirObj.direccion,
                lat: dirObj.coordenadas.y,
                lng: dirObj.coordenadas.x,
            };
        }
    }
    throw new Error('No se pudo normalizar dirección');
}

export function formatearFecha(fechaISO) {
    if (!fechaISO) return 'Fecha desconocida';
    try {
        const fecha = new Date(fechaISO);
        return fecha.toLocaleDateString('es-AR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    } catch {
        return fechaISO;
    }
}

export function guardarPregunta(pregunta) {
    return fetch('http://localhost:3000/api/preguntas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pregunta),
    }).then((res) => {
        if (!res.ok) throw new Error('Error en servidor');
        return res.json();
    });
}

export function obtenerPreguntasDeNoticia(tituloNoticia) {
    return fetch('http://localhost:3000/api/preguntas')
        .then((response) => {
            if (!response.ok) throw new Error('Error al obtener preguntas');
            return response.json();
        })
        .then((preguntas) =>
            preguntas.filter((p) => p.idNoticia === tituloNoticia)
        );
}

export function actualizarPregunta(index, datos) {
    return fetch(`http://localhost:3000/api/preguntas/${index}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
    }).then((response) => {
        if (!response.ok) throw new Error('Error al actualizar');
        return response.json();
    });
}

export function eliminarPregunta(index) {
    return fetch(`http://localhost:3000/api/preguntas/${index}`, {
        method: 'DELETE',
    }).then((response) => {
        if (!response.ok) throw new Error('Error al eliminar');
        return response.json();
    });
}

export function normalizarRutaImagen(imagen) {
    if (!imagen) return '';
    if (typeof imagen === 'object' && imagen.dataUrl) {
        return imagen.dataUrl;
    }
    if (typeof imagen === 'string') {
        const rutaLimpia = imagen.startsWith('/') ? imagen : `/${imagen}`;
        if (rutaLimpia.startsWith('/imagenes/')) {
            return rutaLimpia;
        }
        if (rutaLimpia.includes('/images/')) {
            return rutaLimpia.replace('/images/', '/imagenes/');
        }
        if (!rutaLimpia.includes('/')) {
            return `/data/imagenes/${rutaLimpia}`;
        }
        return rutaLimpia;
    }
    return '';
}