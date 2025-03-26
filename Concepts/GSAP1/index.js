import {gsap} from "gsap";

const box1 = document.querySelector(".box-1");
const circle1 = document.querySelector(".circle-1");
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

// gsap.to(".box", {
//     x: 900
// });

gsap.to([box1], {
    x: ((windowWidth / 2) - (box1.offsetWidth / 2)),
    y: ((windowHeight / 2) - (box1.offsetHeight / 2)),
    rotate: 720,
    duration: 1.5,
    delay: .5,
    scale: 2,
    borderRadius: `1rem`,
    repeat: 2,
    yoyo: true,
    // onComplete: () => {
    //     alert("Animation Complete.");
    // }
    ease: "back.in",
    // isTweening method
    onStart: () => {
        console.log(`Box1 is tweening: ` + gsap.isTweening(box1));
    },
    onComplete: () => {
        console.log(`Box1 is tweening:`, gsap.isTweening(box1));
    }
});

gsap.to(circle1, {
    width: windowHeight,
    delay: .5,
    duration: 3,
    rotate: 360,
    x: ((windowWidth / 2) - (windowHeight / 2)),
    repeat: 2,
    yoyo: true,
    // onComplete: () => {
    //     alert("Animation Complete.");
    // },
    ease: "elastic.out",
    // ease: parametric
});

// gsap.to([box1, circle1], {
//     repeat: 2
// });

// Custom Ease Function
function parametric(prog) {
    var sqt = prog + prog;
    return sqt / (2.0 + (sqt - prog) + 1.0);
}


// Slider - onUpdate()
const slider = document.querySelector(".slider");
const progress = document.querySelector(".progress");
const label = document.querySelector(".label");

slider.addEventListener("input", function() {
    gsap.to(progress, {
        width: `${this.value}%`,
        duration: 0.1,
        onUpdate: function() {
            label.textContent = `${Math.round(gsap.getProperty(progress, "width"))}%`;
            // label.textContent = `${this.value}%`;
        }
    });
});


// Create Circles
const cont2 = document.querySelector(".cont-2");

function createCircle() {
    let circle = document.createElement("div");
    circle.classList.add("circle");
    cont2.appendChild(circle);
}

// Create 100 circles
for (let i = 0; i < 100; i++) {
    createCircle();
}

// Cirlce Animation
// Stagger Property
gsap.to(".circle", {
    scale: .1,
    opacity: 0,
    duration: 1,
    y: 40,
    lazy: true,  // Delays the write phase of the animation to improve efficiency
    stagger: {
        // each: 2,
        amount: 3,
        grid: [10, 10],
        repeat: -1,
        yoyo: true,
        from: 3,
        ease: "Power1.in"
    }
});


// Context()
// Create boxes
const cont3 = document.querySelector(".cont-3");
const revertBtn = document.querySelector(".revert-btn");

function createBox3() {
    let box3 = document.createElement("div");
    box3.classList.add("box-3");
    cont3.appendChild(box3);
}

for (let i = 0; i < 100; i++) {
    createBox3();
}

gsap.defaults( {
    duration: 1,
})

let ctx = gsap.context(() => {
    gsap.fromTo(".box-3", {
        scale: 1,
        border: "1px solid red",
        opacity: 1,
        repeat: -1,
        yoyo: true,
        ease: "Power1.in",
        stagger: {
            grid: [10, 10],
            amount: 1,
            from: "start"
        }
    }, {
        scale: 1.3,
        opacity: .2,
        border: "1px solid lime",
        repeat: -1,
        yoyo: true,
        ease: "Power1.in",
        stagger: {
            grid: [10, 10],
            amount: 1,
            from: "end"
        }
    })
});

revertBtn.addEventListener("click", () => {
    ctx.revert();
});


// Timeline()
let circle4 = document.querySelector(".circle-4");
let box4 = document.querySelector(".box-4");
let diagonal = Math.sqrt(Math.pow(windowHeight, 2) + Math.pow(windowWidth, 2));

console.log(diagonal);

// Timeline() - 2
let startBtn = document.getElementById("start");
let pauseBtn = document.querySelector("#pause");
let resumeBtn = document.getElementById("resume");
let reverseBtn = document.getElementById("reverse");
let seekBtn = document.getElementById("seek");
let restartBtn = document.getElementById("restart");

let redLightBtn = document.getElementById("red-light");
let amberLightBtn = document.getElementById("amber-light");
let greenLightBtn = document.getElementById("green-light");

let reps = document.getElementById("reps");
let label2 = document.getElementById("label");

console.log(startBtn);
console.log(pauseBtn);

function redLight() {
    let tl = gsap.timeline();
    tl.to(circle4, {y: 400, duration: 1})
        .to(circle4, {x: 400, duration: 2})
        .to(circle4, {y: 0, duration: 1})
        .to(circle4, {x: 0, duration: 2})
    ;
    
    return tl;
}

function amberLight() {
    let tl = gsap.timeline();
    tl.to(circle4, {y: 400, backgroundColor: "orange", duration: 1})
        .to(circle4, {x: 400, backgroundColor: "orange", duration: 2}, "<")
        .to(circle4, {y: 0, backgroundColor: "orange", duration: 1}, "-=1")
        .to(circle4, {x: 0, backgroundColor: "orange", duration: 2}, "+=1")
    ;
    
    return tl;
}

function greenLight() {
    let tl = gsap.timeline(
        {
            defaults: {
                duration: 2,
                ease: "steps(12)"
            }
        }
    );
    tl.to(circle4, {y: 400, backgroundColor: "green"})
        .to(circle4, {x: 400, backgroundColor: "green"})
        .to(circle4, {y: 0, backgroundColor: "green"})
        .to(circle4, {x: 0, backgroundColor: "green"})
    ;
    
    // .to(circle4, {y: window.innerHeight - circle4.offsetWidth, backgroundColor: "green", duration: 1})
    // .to(circle4, {x: window.innerWidth - circle4.offsetWidth, backgroundColor: "green", duration: 2})
    return tl;
}


let master = gsap.timeline( {
    yoyo: true,
    repeat: 2,
    paused: true,
    onRepeat: () => {  // Update repetitions
        // reps.innerHTML = parseInt(reps.innerHTML) + 1;
        reps.innerText = parseInt(reps.innerText) + 1;
    }
});

master.add(redLight(), "redLight")
    .add(amberLight(), "amberLight")
    .add(greenLight(), "greenLight")
;

startBtn.addEventListener("click", () => {
    master.play();
});

pauseBtn.addEventListener("click", () => {
    master.pause();
});
resumeBtn.addEventListener("click", () => {
    master.resume();
});
seekBtn.addEventListener("click", () => {
    master.seek(1);
});
reverseBtn.addEventListener("click", () => {
    master.reverse();
});
restartBtn.addEventListener("click", () => {
    master.restart();
});

greenLightBtn.addEventListener("click", () => {
    master.play("greenLight");
});
amberLightBtn.addEventListener("click", () => {
    master.play("amberLight");
});
redLightBtn.addEventListener("click", () => {
    master.play("redLight");
});


// Update Label
function updateLabelName() {
    let currentLabel = master.currentLabel();
    label2.innerText = currentLabel;
}

master.eventCallback("onUpdate", updateLabelName);

// GetProperty()
let bgColor = gsap.getProperty(box4, "backgroundColor");
let bdRad = gsap.getProperty(circle4, "borderRadius");

console.log(bgColor);
console.log(bdRad);


// MATCHMEDIA
let circle5 = document.querySelector(".circle-5");
let box5 = document.querySelector(".box-5");
let screenLabel = document.querySelector("#screenLabel");
let breakpoint = 800;
let mm = gsap.matchMedia();

gsap.set(circle5, {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
});

gsap.set(box5, {
    x: window.innerWidth / 2,
    y: window.innerHeight / 8
});

mm.add({
    isTAblet: `(max-width: ${breakpoint - 1}px)`,
    isDesktop: `(min-width: ${breakpoint}px)`

}, (context) => {
    
    let {isDesktop, isTablet} = context.conditions;

    gsap.to(circle5, {
        scale: isDesktop? 2: .5,
        x: window.innerWidth / 2,
        y: isDesktop? window.innerHeight / 2: window.innerHeight / 8
    });

    gsap.to(box5, {
        scale: isDesktop? 2: .5,
        x: window.innerWidth / 2,
        y: isDesktop? window.innerHeight / 8: window.innerHeight / 2
    });

    return () => {
        screenLabel.innerText = isDesktop? "Desktop Screen": "Tablet Screen";
    }
}
);


// GLOBAL TIMELINE
let play = document.querySelector(".play");
let pause = document.querySelector(".pause");
let scale = document.querySelector(".scale");

let circle6 = document.querySelector(".circle-6");
let box6 = document.querySelector(".box-6");

gsap.to(circle6, {
    x: 400,
    repeat: -1,
    yoyo: true,
    duration: 2
});

gsap.to(box6, {
    x: 400,
    repeat: -1,
    yoyo: true,
    duration: 1.5
});

play.addEventListener("click", () => {
    gsap.globalTimeline.play();
});

pause.addEventListener("click", () => {
    gsap.globalTimeline.pause();
});

scale.addEventListener("click", () => {
    gsap.globalTimeline.timeScale(2);
});


// SNAP and CLAMP
let slider1 = document.querySelector(".slider1");
let sliderLabel1 = document.querySelector(".sliderLabel1");
let slider2 = document.querySelector(".slider2");
let sliderLabel2 = document.querySelector(".sliderLabel2");

// Snap
slider1.addEventListener("input", () => {
    sliderLabel1.innerText = `${gsap.utils.snap(5, slider1.value)}`;
});

// Clamp
slider2.addEventListener("input", () => {
    // sliderLabel2.innerText = `${gsap.utils.snap(10, slider2.value)}`;
    let clampedVal = gsap.utils.clamp(0, 80, slider2.value);
    sliderLabel2.innerText = `${clampedVal}`;

    if (slider2.value > clampedVal) {
        slider2.value = clampedVal;
    }
});


// SELECTOR() TOARRAY() INTERPOLATE()
let doc = gsap.utils.selector(document);
let boxes7 = doc(".box-7");

console.log(doc);
console.log(boxes7);

let boxes71 = gsap.utils.toArray(".box-7");

console.log(Array.from(boxes71));

gsap.to(boxes7, {
    // backgroundColor: gsap.utils.interpolate(["red", "yellow", "blue"], .8),
    // x: 200,
    x: gsap.utils.interpolate([100, 400, 800], .6)
});


// SHUFFLE
let changeBg = document.querySelector(".clr-btn");
let colors = ["red", "orange", "olive", "lime"];

changeBg.addEventListener("click", () => {
    colors = gsap.utils.shuffle(colors);
    boxes7.forEach((box, index) => {
        gsap.to(box, {
            backgroundColor: colors[index]
        });
    });
});