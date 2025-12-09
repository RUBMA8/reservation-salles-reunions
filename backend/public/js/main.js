// Confirmation avant déconnexion
document.addEventListener('DOMContentLoaded', () => {
  const logoutLink = document.querySelector('.btn-logout');
  
  if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
      if (!confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        e.preventDefault();
      }
    });
  }
  
  // Confirmation avant suppression
  const deleteButtons = document.querySelectorAll('[data-confirm]');
  deleteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const message = button.getAttribute('data-confirm') || 'Êtes-vous sûr ?';
      if (!confirm(message)) {
        e.preventDefault();
      }
    });
  });
});
