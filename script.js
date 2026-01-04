f// ===== DARK MODE BACKEND (STATE + STORAGE) =====
window.onload = () => {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  }
};

function toggleDarkMode() {
  document.documentElement.classList.toggle("dark");

  if (document.documentElement.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

// ===== PASSWORD LENGTH =====
function updateLength() {
  document.getElementById("lengthValue").innerText =
    document.getElementById("length").value;
}

// ===== PASSWORD GENERATION (BACKEND CORE) =====
function generatePassword() {
  const length = document.getElementById("length").value;
  const upper = document.getElementById("uppercase").checked;
  const lower = document.getElementById("lowercase").checked;
  const numbers = document.getElementById("numbers").checked;
  const symbols = document.getElementById("symbols").checked;

  let chars = "";
  if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
  if (numbers) chars += "0123456789";
  if (symbols) chars += "!@#$%^&*()_+[]{}<>?";

  if (chars === "") {
    alert("Select at least one option!");
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  const output = document.getElementById("passwordOutput");
  output.value = password;

  // Animation controlled by backend logic
  output.classList.add("animate-pulse");
  setTimeout(() => output.classList.remove("animate-pulse"), 500);

  checkStrength(password);
}

// ===== PASSWORD STRENGTH BACKEND =====
function checkStrength(password) {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  let strength = "Weak";
  let color = "red";

  if (score >= 4) {
    strength = "Strong";
    color = "green";
  } else if (score === 3) {
    strength = "Medium";
    color = "orange";
  }

  const text = document.getElementById("strengthText");
  text.innerText = "Strength: " + strength;
  text.style.color = color;
}

// ===== COPY TO CLIPBOARD BACKEND =====
function copyPassword() {
  const password = document.getElementById("passwordOutput").value;
  if (!password) return;

  navigator.clipboard.writeText(password);
  alert("Password copied successfully!");
}

