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
        list.appendChild(card):
    });
}