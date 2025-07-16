function showBabysitters() {
  const db = getDatabase();
  const babysitterRef = ref(db, 'babysitters/');
  const list = document.getElementById("babysitterList");

  list.innerHTML = ""; // Clear existing content

  onValue(babysitterRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();

      Object.keys(data).forEach((key) => {
        const bs = data[key];

        const card = document.createElement("div");
        card.className = "babysitter-card";
        card.innerHTML = `
          <strong>${bs.name}</strong><br>
            Location: ${bs.location}<br>
            Availability: ${bs.availability}<br>
            Age: ${bs.age}<br>
          <button>Book</button>
        `;
        list.appendChild(card);
      });
    } else {
      list.innerHTML = "<p>No babysitters have registered yet.</p>";
    }
  });
}

// const auth = firebase.auth();

function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      alert("Sign-up successful!");
    })
    .catch(error => {
      alert("Error: " + error.message);
    });
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(user => {
      alert("Login successful!");
    })
    .catch(error => {
      alert("Error: " + error.message);
    });
}

function logout() {
  auth.signOut()
    .then(() => {
      alert("Logged out!");
    });
}

 // Firebase imports
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
        import {
            getAuth,
            createUserWithEmailAndPassword,
            signInWithEmailAndPassword,
            signOut,
            onAuthStateChanged
        } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

        // Add this line directly below the auth imports
        import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

        // Your Firebase config
        const firebaseConfig = {
            apiKey: "AIzaSyD-KrcVTrTYPyoRLtWn0eYVXlsGdG7NMCA",
            authDomain: "sizababy-2a016.firebaseapp.com",
            projectId: "sizababy-2a016",
            storageBucket: "sizababy-2a016.appspot.com",
            messagingSenderId: "958810729788",
            appId: "1:958810729788:web:45f24883a0dc44292dc239"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        // Initialize Realtime Database here
        const database = getDatabase(app);

        // Expose functions globally so buttons work
        window.signUp = function () {
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("Signup successful!");
            })
            .catch(error => {
                alert("Signup error: " + error.message);
            });
        };

        window.login = function () {
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("Login successful!");
            })
            .catch(error => {
                alert("Login error: " + error.message);
            });
        };

        window.logout = function () {
            signOut(auth).then(() => {
            alert("Logged out!");
            });
        };

        onAuthStateChanged(auth, (user) => {
            const status = document.getElementById("userStatus");
            if (user) {
            status.innerText = "Logged in as: " + user.email;
            } else {
            status.innerText = "Not logged in";
            }
        });

        window.submitBooking = function () {
            const babysitterName = document.getElementById("bookingBabysitterName").value;
            const date = document.getElementById("bookingDate").value;
            const time = document.getElementById("bookingTime").value;
            const hours = document.getElementById("bookingHours").value;
            const message = document.getElementById("bookingMessage").value;

            const user = auth.currentUser;
            const status = document.getElementById("bookingStatus");

        if (!user) {
            alert("You must be logged in to book a babysitter.");
            return;
        }

        if (!babysitterName || !date || !time || !hours) {
            alert("Please fill in all required fields.");
            return;
        }

        const bookingData = {
            parentEmail: user.email,
            babysitterName,
            date,
            time,
            hours,
            message
        };

        const bookingsRef = ref(database, "bookings/");
        const newBookingRef = push(bookingsRef);

        set(newBookingRef, bookingData)
            .then(() => {
            status.innerText = "Booking request sent!";
            document.getElementById("bookingBabysitterName").value = "";
            document.getElementById("bookingDate").value = "";
            document.getElementById("bookingTime").value = "";
            document.getElementById("bookingHours").value = "";
            document.getElementById("bookingMessage").value = "";
            })
            .catch((error) => {
            status.innerText = "Booking failed: " + error.message;
            });
        };

window.registerBabysitter = function () {
  const name = document.getElementById("bsName").value.trim();
  const age = document.getElementById("bsAge").value.trim();
  const location = document.getElementById("bsLocation").value.trim();
  const availability = document.getElementById("bsAvailability").value.trim();

  if (!name || !age || !location || !availability) {
    alert("Please fill in all the fields.");
    return;
  }

  const user = auth.currentUser;
  if (!user) {
    alert("You must be logged in to register as a babysitter.");
    return;
  }

  const babysitterData = {
    name,
    age,
    location,
    availability,
    email: user.email // optional: tie the babysitter to the current user
  };

  const babysittersRef = ref(database, "babysitters/");
  const newBsRef = push(babysittersRef);

  set(newBsRef, babysitterData)
    .then(() => {
      alert("Babysitter registered successfully!");

      // Clear the form
      document.getElementById("bsName").value = "";
      document.getElementById("bsAge").value = "";
      document.getElementById("bsLocation").value = "";
      document.getElementById("bsAvailability").value = "";

      // Optionally refresh list
      showBabysitters();
    })
    .catch((error) => {
      alert("Registration failed: " + error.message);
    });
};
