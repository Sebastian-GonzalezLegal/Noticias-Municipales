document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMsg = document.getElementById('errorMsg');

  fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        errorMsg.innerText = data.error;
      } else {
        localStorage.setItem('rol', data.rol);
        localStorage.setItem('username', data.username);
        window.location.href = 'index.html';
      }
    })
    .catch(err => {
      console.error("Error al iniciar sesión:", err);
      errorMsg.innerText = "Ocurrió un error. Intenta nuevamente.";
    });
});