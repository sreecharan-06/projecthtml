document.addEventListener("DOMContentLoaded", function () {
  const loggedIn = localStorage.getItem("loggedIn");

  const signinBtn = document.getElementById("signin-btn");
  const signupBtn = document.getElementById("signup-btn");
  const signoutBtn = document.getElementById("signout-btn");

  if (loggedIn) {
    if (signinBtn) signinBtn.style.display = "none";
    if (signupBtn) signupBtn.style.display = "none";
    if (signoutBtn) signoutBtn.style.display = "inline-block";
  } else {
    if (signinBtn) signinBtn.style.display = "inline-block";
    if (signupBtn) signupBtn.style.display = "inline-block";
    if (signoutBtn) signoutBtn.style.display = "none";
  }
});

function goToSignup() {
  if (localStorage.getItem("loggedIn")) {
    window.location.href = "index.html";
  } else {
    window.location.href = "signup.html";
  }
}

function signup() {
  alert("Signup successful!");
  localStorage.setItem("loggedIn", "true");
  window.location.href = "index.html";
}

function login() {
  alert("Login successful!");
  localStorage.setItem("loggedIn", "true");
  window.location.href = "index.html";
}

function logout() {
  localStorage.removeItem("loggedIn");
  alert("Signed out successfully!");
  window.location.href = "index.html";
}
