export interface User {
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

  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.email || null;
  } catch {
    return null;
  }
}

function logout(): void {
  localStorage.removeItem('token');
  window.location.href = '/index.html';
}

function updateNavigation(): void {
  const navButtons = document.querySelector('.nav-buttons');
  if (!navButtons) return;

  const loginButton = navButtons.querySelector('a[href*="login.html"]') as HTMLAnchorElement;
  if (!loginButton) return;

  const hasProfileLink = navButtons.querySelector('a[href*="profile.html"]');
  
  if (isLoggedIn()) {
    const email = getUserEmail();
    
    loginButton.outerHTML = `
      <div class="user-info">
        <span class="user-email">User:${email || 'User'}</span>
        <a href="/pages/profile.html" class="btn btn-secondary btn-profile">Profil</a>
        <button id="logout-btn" class="btn btn-primary">Logout</button>
      </div>
    `;

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', logout);
    }

    if (hasProfileLink && !hasProfileLink.closest('.user-info')) {
      hasProfileLink.remove();
    }
  } else {
    if (hasProfileLink) {
      hasProfileLink.remove();
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
      gap: 0.75rem;
    }
    
    .user-email {
      color: white;
      font-weight: 500;
      padding: 0.5rem 1rem;
      background-color: #333;
      border-radius: 8px;
      font-size: 0.9rem;
    }
    
    body.dark-mode .user-email {
      background-color: #444;
    }
    
    #logout-btn {
      margin: 0 !important;
      padding: 0.5rem 1rem !important;
    }
    
    .btn-profile {
      margin: 0 !important;
    }
    
    .user-info .btn {
      margin-left: 0 !important;
    }
  `;
  document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', () => {
  injectStyles();
  updateNavigation();
});

export { isLoggedIn, getUserEmail, logout, updateNavigation };