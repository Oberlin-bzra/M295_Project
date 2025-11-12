<<<<<<< HEAD
// Stellt sicher, dass das Backend auf Port 3000 läuft
const loginApiUrl = "http://localhost:3000/api/auth/login";
=======
const loginapiUrl = "http://localhost:3000/api/auth/login";
>>>>>>> 27174dcb08b1092741bd5035c89a2933850222b6

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form") as HTMLFormElement;
  const message = document.getElementById("login-message") as HTMLParagraphElement;

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const password = (document.getElementById("password") as HTMLInputElement).value;

    try {
      const res = await fetch(loginApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token); // Token im Browser speichern
        message.textContent = "Login successful. Redirecting...";
        message.className = "success";
        // Hier zur geschützten Seite weiterleiten
        setTimeout(() => (window.location.href = "/dashboard.html"), 800); 
      } else {
        message.textContent = data.message || "Login failed";
        message.className = "error";
      }
    } catch (err) {
      message.textContent = "Failed to connect to server.";
      message.className = "error";
    }
  });
});