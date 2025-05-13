function verificarAdmin() {
    if (localStorage.getItem('userRole') !== 'admin') {
        window.location.href = 'login.html';
      }
  
      document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('userRole');
        localStorage.removeItem('username');
        window.location.href = 'login.html';
      });
}