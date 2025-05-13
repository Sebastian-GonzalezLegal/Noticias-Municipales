document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('errorMsg');
  
    if (username === 'admin' && password === 'admin') { 
// para entrar como admin se debe usar el usuario admin y la contraseña admin
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('username', username);
      window.location.href = 'admin.html';
    } else if (username !== '' && password !== '') { 
// para entrar como usuario normal se debe usar cualquier usuario y contraseña (diferente a admin admin)
      localStorage.setItem('userRole', 'user');
      localStorage.setItem('username', username);
      window.location.href = 'index.html';
    } else {
      errorMsg.innerText = "Credenciales inválidas. Intenta nuevamente.";
    }
  });
  