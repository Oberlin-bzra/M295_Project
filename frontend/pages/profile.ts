const API_BASE = "http://localhost:3000/api";

interface UserProfile {
  _id: string;
  email: string;
  savedTeams: string[];
  savedDrivers: string[];
  savedVehicles: string[];
}

function getToken(): string | null {
  return localStorage.getItem("token");
}

function showElement(el: HTMLElement | null): void {
  if (el) {
    el.classList.remove('hidden');
    el.style.display = 'block';
  }
}

function hideElement(el: HTMLElement | null): void {
  if (el) {
    el.classList.add('hidden');
    el.style.display = 'none';
  }
}

function showMessage(elementId: string, message: string, isSuccess: boolean): void {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = message;
  el.className = `message ${isSuccess ? 'success' : 'error'}`;
  showElement(el);
  
  setTimeout(() => {
    hideElement(el);
  }, 5000);
}

async function loadProfile(): Promise<void> {
  const token = getToken();
  const loading = document.getElementById("loading");
  const loginRequired = document.getElementById("login-required");
  const profileContent = document.getElementById("profile-content");

  hideElement(loginRequired);
  hideElement(profileContent);

  if (!token) {
    hideElement(loading);
    showElement(loginRequired);
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/user`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (res.status === 401) {
      localStorage.removeItem("token");
      hideElement(loading);
      showElement(loginRequired);
      return;
    }

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${res.status}`);
    }

    const user: UserProfile = await res.json();

    hideElement(loading);
    showElement(profileContent);

    const userIdEl = document.getElementById("user-id");
    const userEmailEl = document.getElementById("user-email");
    const savedTeamsEl = document.getElementById("saved-teams-count");
    const savedDriversEl = document.getElementById("saved-drivers-count");
    const savedVehiclesEl = document.getElementById("saved-vehicles-count");
    const newEmailInput = document.getElementById("new-email") as HTMLInputElement;

    if (userIdEl) userIdEl.textContent = user._id;
    if (userEmailEl) userEmailEl.textContent = user.email;
    if (savedTeamsEl) savedTeamsEl.textContent = String(user.savedTeams?.length || 0);
    if (savedDriversEl) savedDriversEl.textContent = String(user.savedDrivers?.length || 0);
    if (savedVehiclesEl) savedVehiclesEl.textContent = String(user.savedVehicles?.length || 0);
    if (newEmailInput) newEmailInput.placeholder = user.email;

  } catch (err) {
    console.error("Error loading profile:", err);
    if (loading) {
      loading.textContent = `Fehler beim Laden des Profils: ${err instanceof Error ? err.message : 'Unbekannter Fehler'}`;
      loading.style.color = 'red';
    }
  }
}

async function updateEmail(newEmail: string): Promise<void> {
  const token = getToken();
  if (!token) {
    showMessage("email-message", "Nicht eingeloggt", false);
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/user`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: newEmail })
    });

    const data = await res.json();

    if (res.ok) {
      showMessage("email-message", "E-Mail erfolgreich aktualisiert!", true);
      const userEmailEl = document.getElementById("user-email");
      if (userEmailEl) userEmailEl.textContent = newEmail;
      const input = document.getElementById("new-email") as HTMLInputElement;
      if (input) {
        input.value = "";
        input.placeholder = newEmail;
      }
    } else {
      showMessage("email-message", data.message || "Fehler beim Aktualisieren", false);
    }
  } catch (err) {
    console.error("Update email error:", err);
    showMessage("email-message", "Verbindungsfehler zum Server", false);
  }
}

async function updatePassword(currentPassword: string, newPassword: string): Promise<void> {
  const token = getToken();
  if (!token) {
    showMessage("password-message", "Nicht eingeloggt", false);
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/user`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ currentPassword, newPassword })
    });

    const data = await res.json();

    if (res.ok) {
      showMessage("password-message", "Passwort erfolgreich geändert!", true);
      (document.getElementById("current-password") as HTMLInputElement).value = "";
      (document.getElementById("new-password") as HTMLInputElement).value = "";
      (document.getElementById("confirm-password") as HTMLInputElement).value = "";
    } else {
      showMessage("password-message", data.message || "Fehler beim Ändern", false);
    }
  } catch (err) {
    console.error("Update password error:", err);
    showMessage("password-message", "Verbindungsfehler zum Server", false);
  }
}

async function deleteAccount(password: string): Promise<void> {
  const token = getToken();
  if (!token) {
    showMessage("delete-message", "Nicht eingeloggt", false);
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/user`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password })
    });

    const data = await res.json();

    if (res.ok) {
      showMessage("delete-message", "Account gelöscht. Auf Wiedersehen!", true);
      localStorage.removeItem("token");
      setTimeout(() => {
        window.location.href = "/index.html";
      }, 2000);
    } else {
      showMessage("delete-message", data.message || "Fehler beim Löschen", false);
    }
  } catch (err) {
    console.error("Delete account error:", err);
    showMessage("delete-message", "Verbindungsfehler zum Server", false);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadProfile();

  const emailForm = document.getElementById("email-form");
  if (emailForm) {
    emailForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const newEmail = (document.getElementById("new-email") as HTMLInputElement).value.trim();
      if (newEmail) {
        await updateEmail(newEmail);
      }
    });
  }

  const passwordForm = document.getElementById("password-form");
  if (passwordForm) {
    passwordForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const currentPassword = (document.getElementById("current-password") as HTMLInputElement).value;
      const newPassword = (document.getElementById("new-password") as HTMLInputElement).value;
      const confirmPassword = (document.getElementById("confirm-password") as HTMLInputElement).value;

      if (newPassword !== confirmPassword) {
        showMessage("password-message", "Passwörter stimmen nicht überein", false);
        return;
      }

      if (newPassword.length < 6) {
        showMessage("password-message", "Passwort muss mindestens 6 Zeichen haben", false);
        return;
      }

      await updatePassword(currentPassword, newPassword);
    });
  }

  const deleteForm = document.getElementById("delete-form");
  if (deleteForm) {
    deleteForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const password = (document.getElementById("delete-password") as HTMLInputElement).value;

      const confirmed = confirm(
        "⚠️ WARNUNG: Dein Account wird unwiderruflich gelöscht!\n\n" +
        "Alle deine Daten gehen verloren.\n\n" +
        "Bist du sicher, dass du fortfahren möchtest?"
      );

      if (confirmed) {
        await deleteAccount(password);
      }
    });
  }
});