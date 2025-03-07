import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, doc, getDoc, updateDoc, deleteDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";
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

const leftRailAccountDetails = document.getElementById('account-links-account-details');
const leftRailYourComments = document.getElementById('account-links-your-comments');
const leftRailAdminPanel = document.getElementById('account-links-admin-panel');
const leftRailLogOut = document.getElementById('account-links-log-out');

leftRailLogOut.addEventListener('click', async (event) => {
    event.preventDefault();
    await signOut(auth);
    window.location.href = '/';
});

const mainRailAccountDetails = document.getElementById('main-rail-account-details');
const mainRailYourComments = document.getElementById('main-rail-your-comments');

var railPos = 0;
var admin;

onAuthStateChanged(auth, async (user) => {
    const signup = document.getElementById('signup');
 
    if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        
        if (userDoc.exists() && userDoc.data().role == 'admin') {
            leftRailAdminPanel.style.display = 'block';
            admin = true;
        }

        const accountName = document.getElementById('account-overview-name');
        accountName.textContent = userDoc.data().name;

        const accountEmail = document.getElementById('account-overview-email');
        accountEmail.textContent = userDoc.data().email;

        const accountDetailsName = document.getElementById('account-details-name');
        accountDetailsName.textContent = `Name: ${userDoc.data().name}`;

        const accountDetailsEmail = document.getElementById('account-details-email');
        accountDetailsEmail.textContent = `Email: ${userDoc.data().email}`;

        const userBadges = await getDoc(doc(db, "users", user.uid, "extra", "badges"));
        const accountDetailsBadges = document.getElementById('account-details-badges');
        if (userBadges.exists()) {
            accountDetailsBadges.textContent = `Badges: ${userBadges.data().badges}`;
        } else {
            accountDetailsBadges.textContent = `You have no badges. Participate in the community and in events to earn badges.`;
        }

        const articlesSnapshot = await getDocs(collection(db, "articles"));
        const yourCommentsContainer = document.getElementById('your-comments-container');
        yourCommentsContainer.innerHTML = '';
        for (const articleDoc of articlesSnapshot.docs) {
            const articleData = articleDoc.data();
            const commentsQuery = query(collection(db, `articles/${articleDoc.id}/comments`));
            const commentsSnapshot = await getDocs(commentsQuery);
            console.log(`Found ${commentsSnapshot.size} comments in article ${articleDoc.id}`);
            for (const commentDoc of commentsSnapshot.docs) {
                const comment = commentDoc.data();
                if (comment.authorName == userDoc.data().name) {
                    console.log(comment)
                    const commentContainer = document.createElement('div');
                    commentContainer.classList.add('comment-container');

                    const commentContent = document.createElement('h3');
                    commentContent.classList.add('comment-content');
                    commentContent.textContent = `"${comment.text}"`;
                    commentContainer.appendChild(commentContent);
                    console.log(comment.text);

                    const commentArticle = document.createElement('p');
                    commentArticle.classList.add('comment-article');
                    commentArticle.textContent = `Article: ${articleData.title}`;
                    commentContainer.appendChild(commentArticle);

                    const commentDate = document.createElement('p');
                    commentDate.classList.add('comment-date');
                    commentDate.textContent = `Date: ${comment.createdAt.toDate().toLocaleString()}`;
                    commentContainer.appendChild(commentDate);

                    const deleteButton = document.createElement('button');
                    deleteButton.classList.add('comment-delete-button');
                    deleteButton.textContent = 'Delete';
                    
                    deleteButton.addEventListener('click', async () => {
                        await deleteDoc(doc(db, `articles/${articleDoc.id}/comments`, commentDoc.id));
                        commentContainer.remove();
                    });
                    commentContainer.appendChild(deleteButton);
                    yourCommentsContainer.appendChild(commentContainer);
                }
            }
        }
    } else {
        alert('Sign in to view your account.');
        window.location.href = '/login';
    }
});

(async () => {accountRailSwitch(0);})();

leftRailAccountDetails.addEventListener('click', () => {
    accountRailSwitch(0);
});

leftRailYourComments.addEventListener('click', () => {
    accountRailSwitch(1);
});

function accountRailSwitch(pos) {
    railPos = pos;
    mainRailAccountDetails.style.display = 'none';
    mainRailYourComments.style.display = 'none';
    if (pos == 0) {
        mainRailAccountDetails.style.display = 'block';
    } else if (pos == 1) {
        mainRailYourComments.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fetchUserData();
});

async function fetchUserData() {
    try {
        const user = auth.currentUser;
        const userId = user.uid;
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);

        const userdata = userDoc.data();
        displayUserData(userdata);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

function displayUserData(userdata) {
    if (!userdata) {
        console.error('User data is not defined');
        return;
    }

    document.getElementById('account-overview-name').textContent = userdata.name || 'N/A';
    document.getElementById('account-overview-email').textContent = userdata.email || 'N/A';
    document.getElementById('account-details-name').textContent = userdata.name || 'N/A';
    document.getElementById('account-details-email').textContent = userdata.email || 'N/A';

    // Display badges
    const badgesContainer = document.getElementById('account-details-badges');
    badgesContainer.innerHTML = '';
    if (userdata.badges) {
        userdata.badges.forEach(badge => {
            const badgeElement = document.createElement('div');
            badgeElement.className = 'badge';
            badgeElement.textContent = badge;
            badgesContainer.appendChild(badgeElement);
        });
    }

    // Display comments
    const commentsContainer = document.getElementById('your-comments-container');
    commentsContainer.innerHTML = '';
    if (userdata.comments) {
        userdata.comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.textContent = comment;
            commentsContainer.appendChild(commentElement);
        });
    }
}