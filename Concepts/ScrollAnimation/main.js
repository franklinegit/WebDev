
// Assign class autoShow to items for autoShow animation

document.addEventListener("DOMContentLoaded", () => {
    const main2Content = document.getElementsByClassName("main2__content");

    if (main2Content.length > 0) {
        main2Elem = main2Content[0];

        Array.from(main2Elem.children).forEach(child => {
            if (!child.classList.contains("autoShow")) {
                child.classList.add("autoShow")
            }
        });
    }
});



// SlideRight Animation on Main3 Elements

document.addEventListener("DOMContentLoaded", () => {
    const main3 = document.querySelector(".main3");

    if (main3) {
        Array.from(main3.children).forEach(child => {
            if (!child.classList.contains("slideRight")) {
                child.classList.add("slideRight");
            }
        });
    }
});


// AutoBlur Animation on main__caps
document.addEventListener("DOMContentLoaded", () => {
    const mainCaps = document.querySelector(".main__caps");

    if (mainCaps) {
        Array.from(mainCaps.children).forEach(child => {
            if (!child.classList.contains("autoBlur")) {
                child.classList.add("autoBlur");
            }
        });
    }
});



// Using Intersection Observer to animate on scroll
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        console.log(entry);

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

        else {
            entry.target.classList.remove("show");
        }
    });
});


const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach(el => {
    observer.observe(el);
});