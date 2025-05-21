document.addEventListener('DOMContentLoaded', function () {
    mostrarPreguntas();
});

function cerrarSesion() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("rol");
    window.location.href = "/public/index.html";
}

function mostrarPreguntas() {
    let lista = document.getElementById("listaPreguntas");

    fetch('http://localhost:3000/api/preguntas')
        .then(res => res.json())
        .then(preguntas => {
            if (preguntas.length === 0) {
                lista.innerHTML = "<p>No hay preguntas registradas.</p>";
                return;
            }

            lista.innerHTML = ""; // Limpiamos antes de insertar

            preguntas.forEach((pregunta, index) => {
                const card = document.createElement("div");
                card.className = "pregunta-card";

                card.innerHTML = `
                    <div class="pregunta-header">
                        <strong>Noticia:</strong> ${pregunta.idNoticia ?? 'N/A'}
                        <span class="fecha">${pregunta.fecha}</span>
                    </div>
                    <p class="pregunta-texto">${pregunta.mensaje}</p>
                    <p><strong>Estado:</strong> ${pregunta.estado ?? 'Pendiente'}</p>
                    ${pregunta.estado === "Respondida" || pregunta.estado === "Rechazada" ?
                        `<p><strong>Respuesta:</strong> ${pregunta.respuesta}</p>
                         <p><small>${pregunta.fechaRespuesta}</small></p>
                         <div class="pregunta-acciones">
                            <button class="btn-rechazar" onclick="eliminarPregunta(${index})">Eliminar</button>
                         </div>`
                        :
                        `<input type="text" id="respuesta_${index}" placeholder="Ingrese respuesta" class="input-respuesta">
                         <div class="pregunta-acciones">
                            <button class="btn-aprobar" onclick="responderPregunta(${index})">Responder</button>
                            <button class="btn-rechazar" onclick="rechazarPregunta(${index})">Rechazar</button>
                         </div>`
                    }
                `;
                lista.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error al obtener las preguntas:', error);
            lista.innerHTML = "<p>Error al cargar las preguntas.</p>";
        });
}

function responderPregunta(index) {
    let respuesta = document.getElementById("respuesta_" + index).value;
    if (!respuesta || respuesta.trim() === "") {
        alert("Ingrese una respuesta.");
        return;
    }

    fetch(`http://localhost:3000/api/preguntas/${index}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            index,
            respuesta,
            estado: 'Respondida',
            fechaRespuesta: new Date().toLocaleString()

        })
    })
        .then(res => res.json())
        .then(data => {
            alert("Pregunta respondida.");
            mostrarPreguntas();
        })

        .catch(error => {
            console.error('Error al responder la pregunta:', error);
            alert("Hubo un error al responder.");
        });
}

function rechazarPregunta(index) {
    let respuesta = document.getElementById("respuesta_" + index).value;
    if (!respuesta || respuesta.trim() === "") {
        alert("Ingrese una respuesta.");
        return;
    }

    fetch(`http://localhost:3000/api/preguntas/${index}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            index,
            respuesta,
            estado: 'Rechazada',
            fechaRespuesta: new Date().toLocaleString()

        })
    })
        .then(res => res.json())
        .then(data => {
            alert("Pregunta rechazada.");
            mostrarPreguntas();
        })

        .catch(error => {
            console.error('Error al rechazar la pregunta:', error);
            alert("Hubo un error al rechazar.");
        });
}

function eliminarPregunta(index) {
    if (confirm("¿Está seguro de eliminar la pregunta?")) {

        fetch(`http://localhost:3000/api/preguntas/${index}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ index, estado: 'rechazada' })
        })
            .then(res => res.json())
            .then(data => {
                alert("Pregunta eliminada.");
                mostrarPreguntas();
            })
            .catch(error => {
                console.error('Error al eliminar la pregunta:', error);
                alert("Hubo un error al eliminar la pregunta.");
            });
    }
}