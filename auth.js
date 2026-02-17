import { auth, db}    from "./config";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut }
  from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { doc, setDoc, addDoc, collection, getDocs, deleteDoc, updateDoc, query, orderBy }
  from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
  
//DOM reference
const authSection = document.getElementById('auth-section');
const dashboardSection = document.getElementById('dashboard-section');
const homePopup = document.getElementById('home-popup');
const popupBtn = document.getElementById('popup-btn');

const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const toggleText = document.getElementById("toggle-text");
const toggleLink = document.getElementById("toggle-link");
const message = document.getElementById("auth-message");
const statusBox = document.getElementById("status-box");

//Helpers
function showStatus(msg, isError=false){
  statusBox.style.display = "block" 
  statusBox.textContent = msg; 
  statusBox.style.background = isError? "red":"green"; 
  statusBox.style.color= isError? "white":"white"; 
  statusBox.style.border= isError? "1px solid red":"1px solid green"; 

}

function hideStatus(){
  statusBox.style.display = "none" 
}

export function showDashboard(isnewUser=false){ 
  dashboardSection.style.display="block"
  dashboardSection.setAttribute("aria- hidden", false)
  authSection.classList.add("slide-out-up")
  dashboardSection.classList.add("slide-in-up")
  setTimeout(()=>{
  authSection.style.display = "none"
  authSection.classList.remove("slide-out-up")
  dashboardSection.classList.remove("slide-in-up")
  if (isnewUser){
    homePopup.style.display = "flex"
  }


  },600) 

}
function showAuth(){
  dashboardSection.style.display="none"
  authSection.style.display="flex"
  hideStatus()
}

export function toggleForm(e){ 
  if (e && e.preventDefault){
    e.preventDefault()
  }
hideStatus()

}
window.toggleForms = toggleForms()


export async function signupUser(name, email, password) {
  console.log("Heloo")

  const cred = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "users", cred.user.uid), {
    name,
    email
  });

  return cred.user;
}

// ---------- LOGIN ----------
export async function loginUser(email, password) {

  const cred = await signInWithEmailAndPassword(auth, email, password);

  return cred.user;
}

// ---------- LOGOUT ----------
export async function logoutUser() {
  await signOut(auth);
}

// ---------- SESSION LISTENER ----------
export function listenSession(callback) {
  onAuthStateChanged(auth, callback);
}

