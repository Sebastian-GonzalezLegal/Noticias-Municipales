document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const dni = document.getElementById('dni').value.trim();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMsg = document.getElementById('errorMsg');

  fetch('http://localhost:3000/api/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, dni, username, password })
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        errorMsg.innerText = data.error;
      } else {
        localStorage.setItem('rol', 'usuario');
        localStorage.setItem('username', username);
        window.location.href = 'index.html';
      }
    })
    .catch(err => {
      console.error("Error en el registro:", err);
      errorMsg.innerText = "Ocurrió un error. Intente nuevamente.";
    });
});
