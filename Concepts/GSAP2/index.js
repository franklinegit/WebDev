import {gsap} from "gsap";
import {Flip} from "gsap/Flip";

gsap.registerPlugin(Flip);

const box1 = document.querySelector(".box-1"),
    original = document.querySelector(".original"),
    newCont = document.querySelector(".new")
;

// Set up initial positioning
gsap.set([original, newCont], {
    position: "relative"
})
gsap.set(box1, {
    position: "absolute",
    top: 20,
    left: 20
})

document.querySelector(".changeCont").addEventListener("click", () => {
    const state = Flip.getState(box1);

    (box1.parentNode === original ? newCont : original).appendChild(box1);

    Flip.from(state, {
        duration: 2,
        ease: "Power1.inOut",
        scale: true,
        rotate: 360
    });
});


// FLIP.FIT()
// document.querySelector(".fit-btn").addEventListener("click", () => {
//     Flip.fit(".cont-212", ".target", {
//         duration: 2,
//         ease: "power1.inOut",
//         scale: true
//     })
// });

// Flipping a child element
// document.querySelector(".fit-btn").addEventListener("click", () => {
//     Flip.fit(".cont-212", ".target", {
//         duration: 2,
//         ease: "power1.inOut",
//         scale: true,
//         fitChild: ".child-1"
//     })
// });

// Flip from modified positions
// gsap.to(".cont-212", {
//     scale: .8,
//     rotate: 25
// });

// gsap.to(".target", {
//     scale: 1.2,
//     rotation: -18,
//     x: "5rem"
// })

// document.querySelector(".fit-btn").addEventListener("click", () => {
//     Flip.fit(".cont-212", ".target", {
//         duration: 2,
//         ease: "power1.inOut",
//         scale: true,
//         fitChild: ".child-1"
//     });
// });

// Record previous state and flip to that original state
const state = Flip.getState(".target");

gsap.to(".cont-212", {
    scale: .8,
    rotate: 25
});

gsap.to(".target", {
    scale: 1.2,
    rotation: -18
})

gsap.to(".fit-btn", {
    y: "4rem"
})

document.querySelector(".fit-btn").addEventListener("click", () => {
    Flip.fit(".target", state, {
        duration: 2,
        ease: "power1.inOut",
        scale: true,
    });
});


// Cont 3
const group = document.querySelector(".group"),
    boxes3 = Array.from(document.querySelectorAll(".box-3")),
    flexBtn = document.querySelector(".change-flex");
;

let boxes31 = gsap.utils.toArray(".box-3");

let colors = ["lime", "silver", "olive", "yellow", "purple", "green", "red", "orange"];
boxes3.forEach((box, index) => {
    box.style.backgroundColor = colors[index];
});

// const state1 = Flip.getState(".group, .box-3");

flexBtn.addEventListener("click", () => {
    const state1 = Flip.getState(".group, .box-3");

    group.classList.toggle("reorder");

    colors = gsap.utils.shuffle(colors);

    // boxes3.forEach((box, index) => {
    //     box.style.backgroundColor = colors[index];
    // });

    boxes3.forEach((box, index) => {
        gsap.to(box, {
            backgroundColor: colors[index],
            duration: 1
        });
    });

    // gsap.to(boxes31, {
    //     backgroundColor: gsap.utils.wrap(colors);
    // });

    Flip.from(state1, {
        ease: "power1.inOut",
        duration: 1,
        absolute: true
    });
});


// Cont 4
const content = document.querySelector(".content");
const contDivs = document.querySelectorAll(".cont-div");

document.querySelector(".switch-col").addEventListener("click", () => {

    const state = Flip.getState(".content, .cont-div, .cont-div p");
    // const state = Flip.getState([".content", ".content .cont-div"]);

    content.classList.toggle("switch-cols");
    
    contDivs.forEach(div => {
        // const state1 = Flip.getState(div);

        div.classList.toggle("switch-cols");

        // Flip.from(state1, {
        //     duration: 1
        // });
    });

    Flip.from(state, {
        ease: "power1.inOut",
        duration: 1,
        absolute: true,
        nested: true
    });
});


document.querySelector(".switch-row").addEventListener("click", () => {
    const state = Flip.getState(".content, .cont-div, .cont-div p");

    // content.classList.toggle("switch-rows");

    contDivs.forEach(div => {
        div.classList.toggle("switch-rows");
    });

    Flip.from(state, {
        ease: "power1.inOut",
        duration: 1,
        absolute: true,
        nested: true,
        // scale: true
    });
});


// Cont 5
const boxes5 = Array.from(document.querySelectorAll(".box-5"));
const container1 = document.querySelector(".container1");
const container2 = document.querySelector(".container2");

document.querySelector(".shuffle-btn").addEventListener("click", () => {
    const state = Flip.getState(".orange, .purple");

    // Shuffle and swap containers
    const newContainer = boxes5[0].parentNode === container1 ? container2 : container1;
    gsap.utils.shuffle(boxes5).forEach(box => {
        newContainer.appendChild(box);
    });

    Flip.from(state, {
        duration: .5,
        // targets: ".purple",
        ease: "power1.inOut",
        spin: -2
    })
});


// Cont 6
// DATA FLIP ID
const fullImage = document.querySelector(".full-img");
const thumbnail = document.querySelector(".thumbnail");

thumbnail.addEventListener("click", () => {
    const state = Flip.getState([thumbnail, fullImage]);

    thumbnail.style.display = "none";
    fullImage.style.display = "block";
    fullImage.style.pointerEvents = "all";

    Flip.from(state, {
        duration: 1,
        ease: "power1.inOut",
    });
})

fullImage.addEventListener("click", () => {
    const state = Flip.getState([thumbnail, fullImage]);

    thumbnail.style.display = "block";
    fullImage.style.display = "none";
    fullImage.style.pointerEvents = "none";

    Flip.from(state, {
        duration: 1,
        ease: "power1.inOut",
        fade: true,
        absolute: true
    });
})