// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD-KrcVTrTYPyoRLtWn0eYVXlsGdG7NMCA",
  authDomain: "sizababy-2a016.firebaseapp.com",
  projectId: "sizababy-2a016",
  storageBucket: "sizababy-2a016.appspot.com",
  messagingSenderId: "958810729788",
  appId: "1:958810729788:web:45f24883a0dc44292dc239"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database };
