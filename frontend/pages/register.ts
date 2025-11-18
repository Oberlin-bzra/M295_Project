// Stellt sicher, dass das Backend auf Port 3000 läuft
const registerApiUrl = "http://localhost:3000/api/auth/register";

const registerapiUrl = "http://localhost:3000/api/auth/register";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form") as HTMLFormElement;
  const message = document.getElementById("register-message") as HTMLParagraphElement;

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const confirm = (document.getElementById("confirm") as HTMLInputElement).value;

    if (password !== confirm) {
      message.textContent = "Passwords do not match";
      message.className = "error";
      return;
    }

    try {
      const res = await fetch(registerApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        message.textContent = "Registered. Redirecting to login...";
        message.className = "success";
        setTimeout(() => (window.location.href = "/login.html"), 1200);
      } else {
        message.textContent = data.message || "Registration failed";
        message.className = "error";
      }
    } catch (err) {
      message.textContent = "Failed to connect to server.";
      message.className = "error";
    }
  });
});