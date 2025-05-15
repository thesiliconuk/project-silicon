// Import Firebase and other necessary libraries at the top
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration



const firebaseConfig = {

    apiKey: "AIzaSyC6eRdhg6EtrRPGA423DJIEIndaWy9UUZA",

    authDomain: "silicon-articles.firebaseapp.com",

    projectId: "silicon-articles",

    storageBucket: "silicon-articles.firebasestorage.app",

    messagingSenderId: "404018682364",

    appId: "1:404018682364:web:4e60dd8548f29231eeba79",

    databaseURL: "https://silicon-articles-default-rtdb.europe-west1.firebasedatabase.app"

};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const articleName = getArticleName();

console.log('Firebase initialized');

function getFormattedDate() {
    const date = new Date(2025, 1, 4);
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options);
    return formattedDate;
}

function getArticleName() {
    if (location.pathname.endsWith(".html")) {
        return location.pathname.substring(location.pathname.lastIndexOf("/") + 1).slice(0, -5);
    } else {
        return location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
    }
}

// Ensure the submit button exists
const submit = document.getElementById('submit');
if (submit) {
    submit.addEventListener('click', function (event) {
        event.preventDefault();
        var name = document.getElementById('name').value;
        var comment = document.getElementById('comment').value;
        var date = getFormattedDate();

        console.log('Article Name:', articleName);

        console.log('Name:', name);
        console.log('Comment:', comment);
        console.log('Date:', date);

        const db = getDatabase();
        set(ref(db, articleName + '/' + name), {
            name: name,
            comment: comment,
            date: date,
        }).then(() => {
            alert('Comment added successfully');
        }).catch((error) => {
            console.error('Error adding comment:', error);
        });
    });
} else {
    console.error('Submit button not found');
}

// Function to display comments
function displayComments() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, articleName)).then((snapshot) => {
        if (snapshot.exists()) {
            const commentsContainer = document.getElementById('comments-container');
            commentsContainer.innerHTML = ''; // Clear existing comments
            snapshot.forEach((childSnapshot) => {
                const commentData = childSnapshot.val();
                const commentElement = document.createElement('div');
                commentElement.classList.add('comment');
                commentElement.innerHTML = `
                    <p><strong>${commentData.name}</strong> (${commentData.date}):</p>
                    <p>${commentData.comment}</p>
                `;
                commentsContainer.appendChild(commentElement);
            });
        } else {
            console.log("No comments available");
        }
    }).catch((error) => {
        console.error('Error fetching comments:', error);
    });
}

// Call displayComments on page load
window.onload = displayComments;