// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyC6eRdhg6EtrRPGA423DJIEIndaWy9UUZA",

    authDomain: "silicon-articles.firebaseapp.com",

    projectId: "silicon-articles",

    storageBucket: "silicon-articles.firebasestorage.app",

    messagingSenderId: "404018682364",

    appId: "1:404018682364:web:4e60dd8548f29231eeba79"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const submit = document.getElementById('submit');
submit.addEventListener('click', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            alert('User signed up');
            window.location.href = '/login';
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            // ..
    });
})
