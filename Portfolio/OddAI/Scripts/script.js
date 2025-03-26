// Intersection Observer - Scroll Animation
// MAIN 1

const main1 = document.querySelector(".main-1");
const card1 = document.querySelectorAll(".card-1");
const card2 = document.querySelectorAll(".card-2");
const cards = document.getElementsByClassName("card");
const planCards = document.querySelectorAll(".plan-card");
const main2Content = document.querySelector(".main-2 .content");

console.log(card1);
console.log(card2);
console.log(cards);
console.log(main2Content);

document.addEventListener("DOMContentLoaded", () => {

    // Array.from(card1).forEach(card => {
    //     if (!card.classList.contains("hidden")) {
    //         card.classList.add("hidden");
    //     }
    // });

    // Array.from(card2).forEach(card => {
    //     if (!card.classList.contains("hidden")) {
    //         card.classList.add("hidden");
    //     }
    // });

    try {
        if (cards.length > 0) {
            for(let card of cards) {
                console.log(card);
                console.log(card.children);
    
                Array.from(card.children).forEach(child => {
                    if (!child.classList.contains("hidden")) {
                        child.classList.add("hidden");
                    }
                });
            }
        }
    }

    catch(e) {
        console.error(e);
    }

    planCards.forEach(card => {
        if (!card.classList.contains("hidden-left")) {
            card.classList.add("hidden-left");
        }
    });

    if (!main2Content.classList.contains("hidden-down")) {
        main2Content.classList.add("hidden-down");
    }

    // Intersection Observer - Scroll Animation
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            console.log(entry);

            if (entry.isIntersecting  && entry.target.classList.contains("hidden")) {
                entry.target.classList.add("show");
            }

            else {
                entry.target.classList.remove("show");
            }

            if (entry.isIntersecting  && entry.target.classList.contains("hidden-left")) {
                entry.target.classList.add("show-right");
            }

            else {
                entry.target.classList.remove("show-right");
            }

            if (entry.isIntersecting  && entry.target.classList.contains("hidden-down")) {
                entry.target.classList.add("show-up");
            }

            else {
                entry.target.classList.remove("show-up");
            }
        });
    });

    const hiddenElements = document.querySelectorAll(".hidden");
    const hiddenLeft = document.querySelectorAll(".hidden-left");
    const hiddenDown = document.querySelectorAll(".hidden-down");

    hiddenElements.forEach(elem => {
        observer.observe(elem);
    });

    hiddenLeft.forEach(elem => {
        observer.observe(elem);
    });

    hiddenDown.forEach(elem => {
        observer.observe(elem);
    });
});


// Toggle Plan Button
const toggleButton = document.getElementById("toggle-btn");
const prices = document.querySelectorAll(".price")

console.log(toggleButton);
console.log(...prices);

function togglePlan() {
    toggleButton.classList.toggle("toggled");

    if (toggleButton.classList.contains("toggled")){
        prices.forEach((price, index) => {
            price.textContent = ["$300/yr", "$500/yr", "$800/yr"][index];
        });
    }
    
    else {
        prices.forEach((price, index) => {
            price.textContent = ["$29/mo", "$49/mo", "$79/mo"][index];
        });
    }
}

toggleButton.addEventListener("click", togglePlan);


// FAQ POPUPS
const faqs = Array.from(document.querySelectorAll(".faq"));
const faqPopups = Array.from(document.querySelectorAll(".faq-popup"));

console.log(faqs);
console.log(faqPopups);

// Close all Popups
function closeAllPopups() {
    faqPopups.forEach((popup) => {
        popup.style.display = "none";
    });
}

function openFaqPopup(index) {
    // Hide all popups first
    closeAllPopups();

    // Open targeted popup
    faqPopups[index].style.display = "flex";
}

// Add Click event to each FAQ
faqs.forEach((faq, index) => {
    faq.addEventListener("click", (event) => {
        console.log(`FAQ ${index} clicked`);

        // Prevent the click from bubbling up to the document
        event.stopPropagation();
        openFaqPopup(index);
    });
});

// Close Popups when clicking outside
document.addEventListener("click", () => {
    closeAllPopups();
});

// Prevent popup from closing when clicking inside it
faqPopups.forEach(popup => {
    popup.addEventListener("click", (event) => {
        // Prevent the click from bubbling up to the document
        event.stopPropagation();
    });
});