import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC6eRdhg6EtrRPGA423DJIEIndaWy9UUZA",
    authDomain: "silicon-articles.firebaseapp.com",
    projectId: "silicon-articles",
    storageBucket: "silicon-articles.firebasestorage.app",
    messagingSenderId: "404018682364",
    appId: "1:404018682364:web:4e60dd8548f29231eeba79"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const submit = document.getElementById('submit');
submit.addEventListener('click', async function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        alert('User signed in');
        window.location.href = '/';
    } catch (error) {
        alert(error.message);
    }
});