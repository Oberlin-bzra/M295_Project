 const loginApiUrl = "http://localhost:3000/api/auth/login";

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

      const data: { jwt:string, email:string } | { message:string } = await res.json();
      if ('jwt' in data) {
        localStorage.setItem("token", data.jwt); 
        message.textContent = "Login successful. Redirecting...";
        message.className = "success";
        setTimeout(() => (window.location.href = "/index.html"), 800);
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