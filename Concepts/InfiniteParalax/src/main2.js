import {gsap} from "gsap";
import Lenis from "lenis";
import {Flip} from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, Flip);

document.addEventListener("DOMContentLoaded", () => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Variables
    const stickySection = document.querySelector(".sticky");
    const slidesContainer = document.querySelector(".slides");
    const slider = document.querySelector(".slider");
    const slides = Array.from(document.querySelectorAll(".slide"));

    const stickyHeight = window.innerHeight * 6;
    const totalSlide = slidesContainer.offsetWidth - window.innerWidth; // Changed this
    const slideWidth = window.innerWidth; // Each slide should be viewport width

    // TITLE ANIMATION
    const titles = slides.map(slide => slide.querySelector(".title h1"));
    
    // Set initial state
    gsap.set(titles, {
        yPercent: -100
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const currentIndex = slides.indexOf(entry.target);
            
            if (entry.isIntersecting) {
                // Show current title
                gsap.to(titles[currentIndex], {
                    yPercent: 0,
                    duration: 0.5,
                    ease: "power2.inOut"
                });
                
                // Hide other titles
                titles.forEach((title, index) => {
                    if (index !== currentIndex) {
                        gsap.to(title, {
                            yPercent: -100,
                            duration: 0.5,
                            ease: "power2.inOut"
                        });
                    }
                });
            }
        });
    }, {
        root: slider,
        threshold: 0.5 // Adjust this as needed
    });

    slides.forEach(slide => observer.observe(slide));

    ScrollTrigger.create({
        trigger: stickySection,
        start: "top top",
        end: `+=${stickyHeight}`,
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
            const progress = self.progress;
            const mainSlide = progress * totalSlide;

            gsap.to(slidesContainer, {
                x: -mainSlide,
                ease: "none"
            });

            const currentSlide = Math.floor(mainSlide / slideWidth);
            const sliderProgress = (mainSlide % slideWidth) / slideWidth;

            slides.forEach((slide, index) => {
                const image = slide.querySelector("img");

                if (image) {
                    if (index === currentSlide || index === currentSlide + 1) {
                        const relativeProgress = index === currentSlide ? sliderProgress : sliderProgress - 1;
                        const parallaxAmount = relativeProgress * slideWidth * 0.25;

                        gsap.to(image, {
                            x: parallaxAmount,
                            duration: 0.1
                        });
                    } else {
                        gsap.to(image, {
                            x: 0,
                            duration: 0.1
                        });
                    }
                }
            });
        }
    });
});