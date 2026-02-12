import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyABxt3dYn-Rp0_1i3pD_M4xBmBieKLXi0I",
  authDomain: "projet-firebase-60ae7.firebaseapp.com",
  projectId: "projet-firebase-60ae7",
  storageBucket: "projet-firebase-60ae7.firebasestorage.app",
  messagingSenderId: "384876958413",
  appId: "1:384876958413:web:02ac98db503f96fb97cf84",
  measurementId: "G-6RF6R2WPNF"
};

// 1) Init Firebase + Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// 2) Récupérer le HTML 
const statusEl = document.getElementById("status");
const authForm = document.getElementById("authForm");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const signupBtn = document.getElementById("signupBtn");
const logoutBtn = document.getElementById("logoutBtn");
const postForm = document.getElementById("postForm");
const messageInput = document.getElementById("messageInput");

// Petite sécurité si un élément manque dans le HTML
if (
  !statusEl ||
  !authForm ||
  !emailInput ||
  !passwordInput ||
  !signupBtn ||
  !logoutBtn ||
  !postForm ||
  !messageInput
) {
  alert("Erreur: des éléments HTML attendus sont manquants.");
}

let currentUser = null;

onAuthStateChanged(auth, (user) => {
  currentUser = user;

  if (!statusEl || !postForm || !emailInput || !passwordInput || !signupBtn) return;

  if (user) {
    statusEl.textContent = `Connecté : ${user.email}`;
    statusEl.classList.add("connected");
    statusEl.classList.remove("disconnected");
    postForm.style.display = "block";
    emailInput.disabled = true;
    passwordInput.disabled = true;
    signupBtn.disabled = true;
  } else {
    statusEl.textContent = "Non connecté";
    statusEl.classList.add("disconnected");
    statusEl.classList.remove("connected");
    postForm.style.display = "none";
    emailInput.disabled = false;
    passwordInput.disabled = false;
    signupBtn.disabled = false;
  }
});

authForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput?.value.trim();
  const password = passwordInput?.value.trim();
  if (!email || !password) return;

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert("Erreur connexion : " + err.message);
  }
});

signupBtn?.addEventListener("click", async () => {
  const email = emailInput?.value.trim();
  const password = passwordInput?.value.trim();
  if (!email || !password) return;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert("Erreur inscription : " + err.message);
  }
});

logoutBtn?.addEventListener("click", async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err);
    alert("Erreur déconnexion : " + err.message);
  }
});

// 4) Publication : écrire dans Firestore
postForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!currentUser) {
    alert("Connecte-toi avant de publier.");
    return;
  }

  const contenu = messageInput.value.trim();
  if (!contenu) return;

  try {
    await addDoc(collection(db, "messages"), {
      contenu,
      uid: currentUser.uid,
      email: currentUser.email,
      timestamp: serverTimestamp()
    });

    messageInput.value = "";
    alert("Message enregistré dans Firestore ✅");
  } catch (err) {
    console.error(err);
    alert("Erreur Firestore : " + err.message);
  }
});
