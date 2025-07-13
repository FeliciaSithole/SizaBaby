function showBabysitters() {
    const babysitters = [
        {
            name: "Felicia",
            surname: "Sithole",
            location: "Katlehong",
            availability: "Weekends",
            age: 17
        },
        {
            name: "Malwandla",
            surname: "Hlungwani",
            location: "Vosloorus",
            availability: "Friday night and Saturday",
            age: 18
        },
        {
            name: "Yvonne",
            surname: "Mathe",
            location: "Tembisa",
            availability: "Full weekends and holidays",
            age: 16
        }
    ];

    const list = document.getElementById("babysitterList");
    list.innerHTML = ""; //Clear the list before adding

    babysitters.forEach(bs => {
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
}

const auth = firebase.auth();

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

auth.onAuthStateChanged(user => {
  const status = document.getElementById("userStatus");
  if (user) {
    status.innerText = "Logged in as: " + user.email;
  } else {
    status.innerText = "Not logged in";
  }
});
