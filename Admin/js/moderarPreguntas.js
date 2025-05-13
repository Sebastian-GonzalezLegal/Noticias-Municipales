document.addEventListener('DOMContentLoaded', function () {
    mostrarPreguntas();
});

function cerrarSesion() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("rol");
    window.location.href = "/public/index.html";
}

function obtenerPreguntas() {
    let preguntas = localStorage.getItem("preguntas");
    if (preguntas) {
        try {
            return JSON.parse(preguntas);
        } catch (e) {
            console.error("Error al parsear preguntas:", e);
            return [];
        }
    }
    return [];
}

function guardarPreguntas(preguntas) {
    localStorage.setItem("preguntas", JSON.stringify(preguntas));
}

function mostrarPreguntas() {
    let lista = document.getElementById("listaPreguntas");
    let preguntas = obtenerPreguntas();
    if (preguntas.length === 0) {
        lista.innerHTML = "<p>No hay preguntas registradas.</p>";
        return;
    }

    let html = "";
    preguntas.forEach((pregunta, index) => {
        html += `<div class="pregunta">
                  <p><strong>Noticia:</strong> ${pregunta.noticiaIndice !== undefined ? pregunta.noticiaIndice : 'N/A'}</p>
                  <p><strong>Pregunta de ${pregunta.usuario}:</strong> ${pregunta.pregunta}</p>
                  <p><small>${pregunta.fecha}</small></p>
                  <input type="text" id="respuesta_${index}" placeholder="Ingrese respuesta">
                  <button onclick="responderPregunta(${index})">Responder</button>
                  <button onclick="rechazarPregunta(${index})">Rechazar</button>
                  <hr>
               </div>`;
    });
    lista.innerHTML = html;
}

function responderPregunta(index) {
    let respuesta = document.getElementById("respuesta_" + index).value;
    if (!respuesta || respuesta.trim() === "") {
        alert("Ingrese una respuesta.");
        return;
    }
    let preguntas = obtenerPreguntas();
    if (preguntas[index]) {
        preguntas[index].respuesta = respuesta;
        preguntas[index].estado = "respondida";
        preguntas[index].fechaRespuesta = new Date().toLocaleString();
        guardarPreguntas(preguntas);
        alert("Pregunta respondida.");
        mostrarPreguntas();
    }
}

function rechazarPregunta(index) {
    if (confirm("¿Está seguro de rechazar la pregunta?")) {
        let preguntas = obtenerPreguntas();
        if (preguntas[index]) {
            preguntas[index].estado = "rechazada";
            guardarPreguntas(preguntas);
            alert("Pregunta rechazada.");
            mostrarPreguntas();
        }
    }
}
