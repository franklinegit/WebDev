
const cards = document.querySelectorAll(".card");

let stackArea = document.querySelector(".stack-area");

// Function that rotates cards
function rotateCards() {
    let angle = 0;

    cards.forEach((card, index) => {
        if (card.classList.contains("away")) {
            card.style.transform = `translateY(-130vh) rotate(-48deg)`;
        }

        else {
            card.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
            angle -= 10;
            // Set z-index
            card.style.zIndex = cards.length - index;
        }
    });
}

rotateCards();


// Detect scrolling
window.addEventListener("scroll", () => {
    let distance = window.innerHeight / 2;
    let topVal = stackArea.getBoundingClientRect().top;
    let index = Math.floor(-1 * ((topVal / distance) + 1));  // Offset the index so it starts at -1

    for (let i = 0; i < cards.length; i++) {
        if (i <= index) {
            cards[i].classList.add("away");
        }

        else {
            cards[i].classList.remove("away");
        }
    }

    rotateCards();
});
