import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyC6eRdhg6EtrRPGA423DJIEIndaWy9UUZA",
    authDomain: "silicon-articles.firebaseapp.com",
    projectId: "silicon-articles",
    storageBucket: "silicon-articles.appspot.com",
    messagingSenderId: "404018682364",
    appId: "1:404018682364:web:4e60dd8548f29231eeba79"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
var isAlreadyClicked = false;

const submit = document.getElementById('submit');
submit.addEventListener('click', async function (event) {
    if (isAlreadyClicked) {
        var isAlreadyClicked = true;
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
                name : name,
                email: email
            });
            alert('User signed up');
            window.location.href = '/login';
        } catch (error) {
            const errorMessage = error.message;
            alert(errorMessage);
        }
        var isAlreadyClicked = false;
    }
});