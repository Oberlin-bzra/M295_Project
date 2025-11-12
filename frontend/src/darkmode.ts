const darkModeBtn = document.getElementById("darkmode-btn") as HTMLButtonElement;
const body = document.body;

const savedMode = localStorage.getItem("darkMode");
if (savedMode === "enabled") {
  body.classList.add("dark-mode");
}

darkModeBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", "disabled");
  }
});

const style = document.createElement("style");
style.innerHTML = `
/* Dark Mode */
body.dark-mode {
  background-color: #111;
  color: #f8f9fa;
}

body.dark-mode header {
  background-color: #222;
  color: #f8f9fa;
}

body.dark-mode footer {
  background-color: #222;
  color: #f8f9fa;
}

body.dark-mode .nav-buttons a.btn-primary {
  background-color: #e10600;
  color: white;
}

body.dark-mode .nav-buttons a.btn-primary:hover {
  background-color: #c50500;
}

body.dark-mode .nav-buttons a.btn-secondary {
  background-color: #555;
  color: white;
}

body.dark-mode .nav-buttons a.btn-secondary:hover {
  background-color: #666;
}

body.dark-mode .hero, body.dark-mode .dashboard-content {
  background-color: #222;
  color: #f8f9fa;
}

body.dark-mode table {
  background-color: #333;
  color: #f8f9fa;
  border-color: #555;
}

body.dark-mode table th {
  background-color: #444;
  color: #f8f9fa;
}

body.dark-mode table tr:nth-child(even) {
  background-color: #2a2a2a;
}

body.dark-mode input, body.dark-mode .login-container, body.dark-mode .register-link {
  background-color: #222;
  color: #f8f9fa;
  border-color: #555;
}

/* Dark Mode Button kleiner */
#darkmode-btn {
  padding: 0.3rem 0.6rem;
  font-size: 0.9rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

#darkmode-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

#darkmode-btn:active {
  transform: translateY(1px);
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
}
`;
document.head.appendChild(style);

if (!savedMode && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  body.classList.add("dark-mode");
}
