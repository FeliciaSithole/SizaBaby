// app.js

import { auth, database } from './firebase-config.js';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
  ref,
  push,
  set,
  onValue
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";


// Show Babysitters
window.showBabysitters = function () {
  const babysitterRef = ref(database, 'babysitters/');
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
          <button onclick="prefillBooking('${bs.name}')">Book</button>
        `;
        list.appendChild(card);
      });
    } else {
      list.innerHTML = "<p>No babysitters have registered yet.</p>";
    }
  });
};

window.prefillBooking = function(name) {
  document.getElementById("bookingBabysitterName").value = name;
  window.scrollTo(0, document.body.scrollHeight);
};


// Sign Up
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

// Login
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

// Logout
window.logout = function () {
  signOut(auth).then(() => {
    alert("Logged out!");
  });
};

// Auth status check
onAuthStateChanged(auth, (user) => {
  const status = document.getElementById("userStatus");
  if (status) {
    status.innerText = user ? `Logged in as: ${user.email}` : "Not logged in";
  }
});


// Submit Booking
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


// Register Babysitter
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
    email: user.email
  };

  const babysittersRef = ref(database, "babysitters/");
  const newBsRef = push(babysittersRef);

  set(newBsRef, babysitterData)
    .then(() => {
      alert("Babysitter registered successfully!");
      document.getElementById("bsName").value = "";
      document.getElementById("bsAge").value = "";
      document.getElementById("bsLocation").value = "";
      document.getElementById("bsAvailability").value = "";
      window.showBabysitters?.(); // Optional
    })
    .catch((error) => {
      alert("Registration failed: " + error.message);
    });
};
