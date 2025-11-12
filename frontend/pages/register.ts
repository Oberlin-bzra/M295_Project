const registerapiUrl = "http://localhost:3000/api/auth/register";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form") as HTMLFormElement;
  const message = document.getElementById("register-message") as HTMLDivElement;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const confirm = (document.getElementById("confirm") as HTMLInputElement).value;

    if (password !== confirm) {
      message.innerText = "Passwords do not match!";
      message.className = "error";
      return;
    }

    const response = await fetch(registerapiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      message.innerText = "Registration successful! Redirecting to login...";
      message.className = "success";
      setTimeout(() => (window.location.href = "/login.html"), 1500);
    } else {
      message.innerText = data.message || "Registration failed!";
      message.className = "error";
    }
  });
});
