// Firebase destekli login.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBXLFjHMQISuunaqZzpjR6Hq0EZERa_Y0",
  authDomain: "requisitionfollowup.firebaseapp.com",
  projectId: "requisitionfollowup",
  storageBucket: "requisitionfollowup.appspot.com",
  messagingSenderId: "285248816511",
  appId: "1:285248816511:web:543c18fe600f2fde88464a",
  measurementId: "G-T5FGT3RCDL"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

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

window.selectRole = selectRole;

const form = document.getElementById("login-form");
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  localStorage.setItem("role", selectedRole);

  const dbRef = ref(db);

  if (selectedRole === "ship") {
    const shipName = document.getElementById("shipName").value;
    const shipPass = document.getElementById("shipPass").value;
    const snapshot = await get(child(dbRef, `users/${shipName}`));
    if (snapshot.exists()) {
      const user = snapshot.val();
      if (user.type === "ship" && user.password === shipPass) {
        window.location.href = "new-request.html";
      } else {
        alert("Invalid ship credentials.");
      }
    } else {
      alert("Ship not found.");
    }
  } else if (selectedRole === "inspector") {
    const email = document.getElementById("inspectorEmail").value;
    const pass = document.getElementById("inspectorPass").value;

    if (email === "aykutsaral@gmail.com" && pass === "135246") {
      window.location.href = "admin-panel.html";
      return;
    }

    const snapshot = await get(child(dbRef, `users/${email}`));
    if (snapshot.exists()) {
      const user = snapshot.val();
      if (user.type === "inspector" && user.password === pass) {
        window.location.href = "inspector.html";
      } else {
        alert("Invalid inspector credentials.");
      }
    } else {
      alert("Inspector not found.");
    }
  }
});
