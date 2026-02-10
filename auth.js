import { auth, db}    from "./config";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword }
  from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { doc, setDoc, addDoc, collection, getDocs, deleteDoc, updateDoc, query, orderBy }
  from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
  
export async function signupUser(name, email, password) {

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