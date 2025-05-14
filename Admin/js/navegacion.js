function crearNavegacionSiNoExiste() {
    let navPrincipal = document.getElementById('navPrincipal');

    if (!navPrincipal) {
        console.log("Creando elemento de navegación principal...");

        navPrincipal = document.createElement('nav');
        navPrincipal.id = 'navPrincipal';
        navPrincipal.className = 'nav-principal';

        let header = document.querySelector('header');
        if (header) {
            header.insertBefore(navPrincipal, header.firstChild);
        } else {
            let body = document.body;
            body.insertBefore(navPrincipal, body.firstChild);
        }
    }

    return navPrincipal;
}

function actualizarNavegacion() {

    const navPrincipal = crearNavegacionSiNoExiste();
    if (!navPrincipal) return;

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

document.addEventListener('DOMContentLoaded', function () {
    actualizarNavegacion();
});