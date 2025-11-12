const loginapiUrl = "http://localhost:3000/api/auth/login";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form") as HTMLFormElement;
  const message = document.getElementById("login-message") as HTMLDivElement;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    const response = await fetch(loginapiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      message.innerText = "Login erfolgreich! Du wirst weitergeleitet...";
      message.className = "success";
      setTimeout(() => (window.location.href = "/dashboard.html"), 1200);
    } else {
      message.innerText = data.message || "Login fehlgeschlagen!";
      message.className = "error";
    }
  });
});
