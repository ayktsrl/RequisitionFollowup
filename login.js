let selectedRole = "ship";

function selectRole(role) {
  selectedRole = role;
  document.getElementById("btn-ship").classList.remove("active");
  document.getElementById("btn-inspector").classList.remove("active");

  if (role === "ship") {
    document.getElementById("ship-fields").style.display = "block";
    document.getElementById("user-fields").style.display = "none";
    document.getElementById("btn-ship").classList.add("active");
  } else {
    document.getElementById("ship-fields").style.display = "none";
    document.getElementById("user-fields").style.display = "block";
    document.getElementById("btn-inspector").classList.add("active");
  }
}

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  localStorage.setItem("role", selectedRole);

  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (selectedRole === "ship") {
    const shipName = document.getElementById("shipName").value;
    const shipPass = document.getElementById("shipPass").value;

    const matchedUser = users.find(
      (user) => user.type === "ship" && user.username === shipName && user.password === shipPass
    );

    if (matchedUser) {
      window.location.href = "new-request.html";
    } else {
      alert("Invalid ship credentials.");
    }

  } else if (selectedRole === "inspector") {
    const email = document.getElementById("inspectorEmail").value;
    const pass = document.getElementById("inspectorPass").value;

    // Admin girişi
    if (email === "aykutsaral@gmail.com" && pass === "135246") {
      window.location.href = "admin-panel.html";
      return;
    }

    const matchedUser = users.find(
      (user) => user.type === "inspector" && user.username === email && user.password === pass
    );

    if (matchedUser) {
      window.location.href = "inspector.html";
    } else {
      alert("Unauthorized inspector access.");
    }
  }
});
