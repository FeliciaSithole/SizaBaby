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

//  auth.onAuthStateChanged(user => {
//   const status = document.getElementById("userStatus");
//   if (user) {
//     status.innerText = "Logged in as: " + user.email;
//   } else {
//     status.innerText = "Not logged in";
//   }
// });
