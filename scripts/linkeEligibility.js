import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";

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

onAuthStateChanged(auth, async (user) => {
    const signup = document.getElementById('signup');
    const login = document.getElementById('login');

    const account = document.getElementById('account');
    const logout = document.getElementById('logout');

    const admin = document.getElementById('admin');
    if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().banned) {
            alert('Your account has been banned.');
            await auth.signOut();
            window.location.href = '/login';
        } //else if (userDoc.exists() && userDoc.data().role === 'admin') {
            // admin.style.display = 'inline';
        //  }

        account.style.display = 'inline';
        logout.style.display = 'inline';
        logout.addEventListener('click', async (event) => {
            event.preventDefault();
            await signOut(auth);
            window.location.reload();
        });
    } else {
        login.style.display = 'inline';
        signup.style.display = 'inline';
    }
});