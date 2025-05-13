document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('errorMsg');
    if (username === 'admin' && password === 'admin') {
        localStorage.setItem('rol', 'admin');
        localStorage.setItem('username', username);
        window.location.href = 'index.html';
    } else if (username !== '' && password !== '') {
        localStorage.setItem('rol', 'usuario');
        localStorage.setItem('username', username);
        window.location.href = 'index.html';
    } else {
        errorMsg.innerText = "Credenciales inválidas. Intenta nuevamente.";
    }
});
