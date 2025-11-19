interface User {
  email: string;
  jwt: string;
}

function isLoggedIn(): boolean {
  const token = localStorage.getItem("token");
  return !!token;
}

function getUserEmail(): string | null {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try{
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        return decoded.email || null;
    }
    catch {
        return null;
    }
}function logout(): void {
  localStorage.removeItem('token');
  window.location.href = '/index.html';
}

function updateNavigation(): void {
  const navButtons = document.querySelector('.nav-buttons');
  if (!navButtons) return;

  const loginButton = navButtons.querySelector('a[href*="login.html"]') as HTMLAnchorElement;
  if (!loginButton) return;

  if (isLoggedIn()) {
    const email = getUserEmail();
    
    loginButton.outerHTML = `
      <div class="user-info">
        <span class="user-email"> User: ${email || 'User'}</span>
        <button id="logout-btn" class="btn btn-primary">Logout</button>
      </div>
    `;

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', logout);
    }
  }
}

function injectStyles(): void {
  if (document.getElementById('auth-nav-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'auth-nav-styles';
  style.textContent = `
    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .user-email {
      color: white;
      font-weight: 500;
      padding: 0.5rem 1rem;
      background-color: #333;
      border-radius: 8px;
    }
    
    body.dark-mode .user-email {
      background-color: #444;
    }
    
    #logout-btn {
      margin: 0 !important;
    }
  `;
  document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', () => {
  injectStyles();
  updateNavigation();
});

export { isLoggedIn, getUserEmail, logout, updateNavigation };