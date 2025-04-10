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

  if (selectedRole === "ship") {
    // Basit bir kontrol
    const shipName = document.getElementById("shipName").value;
    const shipPass = document.getElementById("shipPass").value;

    if (shipName && shipPass) {
      window.location.href = "new-request.html";
    } else {
      alert("Please enter ship credentials.");
    }
  } else {
    const email = document.getElementById("inspectorEmail").value;
    const pass = document.getElementById("inspectorPass").value;

    if (email && pass) {
      window.location.href = "inspector.html";
    } else {
      alert("Please enter inspector credentials.");
    }
  }
});
