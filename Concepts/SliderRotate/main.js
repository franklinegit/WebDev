
let items = document.querySelectorAll(".slider .item");
let prevBtn = document.getElementById("prev");
let nextBtn = document.getElementById("next");
let lastPosition = items.length - 1;
let firstPosition = 0;
let active = 0;

nextBtn.onclick = () => {
    active++;
    setSlider();
}

prevBtn.onclick = () => {
    active--;
    setSlider();
}

const setSlider = () => {
    let oldActive = document.querySelector(".slider .item.active");

    if (oldActive) {
        oldActive.classList.remove("active");
    }

    // console.log(items);
    // console.log(Array.from(items));
    items[active].classList.add("active");

    // At End of List
    nextBtn.classList.remove("btn-none");
    prevBtn.classList.remove("btn-none");

    if (active == lastPosition) {
        nextBtn.classList.add("btn-none");
    }
    if (active == firstPosition) {
        prevBtn.classList.add("btn-none");
    }
}

setSlider();


// Set diameter
const setDiameter = () => {
    let slider = document.querySelector(".slider");
    let widthSlider = slider.offsetWidth;
    let heightSlider = slider.offsetHeight;
    let diameter = Math.sqrt(Math.pow(widthSlider, 2) + Math.pow(heightSlider, 2));

    document.documentElement.style.setProperty("--diameter", diameter + "px");
}

setDiameter();
window.addEventListener("resize", setDiameter);