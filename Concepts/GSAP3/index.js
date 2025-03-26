import {gsap} from "gsap";
import {Flip} from "gsap/Flip";

import SplitType from 'split-type';

gsap.registerPlugin(Flip);


document.addEventListener("DOMContentLoaded", () => {

    // Split H2
    const splittH2 = new SplitType(".site-content h2", {
        types: "lines"
    });

    splittH2.lines.forEach(line => {
        const text = line.textContent;
        const wrapper = document.createElement("div");
        wrapper.className = "line";
        const span = document.createElement("span");
        span.textContent = text;
        wrapper.appendChild(span);
        line.parentNode.replaceChild(wrapper, line);
    });

    // TIMELINES
    const mainTl = gsap.timeline();
    const revealerTl = gsap.timeline();
    const scaleTl = gsap.timeline();

    // Revealers
    revealerTl.to(".r-1", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        ease: "power1.inOut",
    }).to(".r-2", {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        duration: 1,
        ease: "power1.inOut",
    }, "<");


    // Scale
    scaleTl.to(".img:first-child", {
        scale: 1,
        duration: 2,
        ease: "power4.inOut"
    });


    // IMAGES
    const images = document.querySelectorAll(".img:not(:first-child)");

    images.forEach((img, index) => {
        scaleTl.to(img, {
            opacity: 1,
            scale: 1,
            duration: 1.25,
            fade: true,
            ease: "power3.out"
        }, ">-0.5")
    });


    // MAIN TIMELINE
    mainTl
        .add(revealerTl)
        .add(scaleTl, "-=1.25")
        .add(() => {
            document.querySelectorAll(".img:not(.main)").forEach(img => {
                img.remove();
            });

            const state = Flip.getState(".main");

            const imagesContainer = document.querySelector(".images");
            imagesContainer.classList.add("stacked-container");

            document.querySelectorAll(".main").forEach((img, index) => {
                img.classList.add("stacked");
                img.style.order = index;
                gsap.set(".img.stacked", {
                    clearProps: "transform, top, left"
                });
            });

            return Flip.from(state, {
                duration: 2,
                ease: "power4.inOut",
                absolute: true,
                stagger: {
                    amount: -.3
                }
            });
        })
        .to("h1, .nav__link a, .line p, .site-content h2, .line span", {
            y: 0,
            duration: 1,
            ease: "power1.inOut",
            delay: 1.25,
            stagger: .1
        })
        .to(".cover-img", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%,  0% 100%)",
            duration: 2,
            ease: "power1.inOut",
            delay: -3
        })

});