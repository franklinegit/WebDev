import {gsap} from "gsap";
import Lenis from "lenis";

import {Flip} from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { SplitText } from "gsap/SplitText";

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
	const totalSlide = slidesContainer.offsetWidth - slider.offsetWidth;
	const slideWidth = slider.offsetWidth;


	// TITLE ANIMATION
	slides.forEach(slide => {
		const title = slide.querySelector(".title h1");

		gsap.set(title, {
			yPercent: -100
		});

		let currentVisibleIndex = null;

		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				const currentIndex = slides.indexOf(entry.target);
				const titles = slides.map(slide => slide.querySelector(".title h1"));

				if (entry.intersectionRatio >= 0.25) {
					currentVisibleIndex = currentIndex;
					titles.forEach((title, index) => {
						gsap.to(title, {
							yPercent: index === currentIndex ? 0 : -100,
							duration: 0.5,
							ease: "power2.inOut",
							overwrite: true
						});
					});
				}

				else if (entry.intersectionRatio < 0.25 && currentVisibleIndex === currentIndex) {
					const prevIndex = currentIndex - 1;
					currentVisibleIndex = prevIndex >= 0 ? prevIndex : null;

					titles.forEach((title, index) => {
						gsap.to(title, {
							yPercent: index === prevIndex ? 0 : -100,
							duration: 0.5,
							ease: "power2.inOut",
							overwrite: true
						});
					});
				}
			});
		}, {
			root: slider,
			threshold: [0, 0.25]
		});

		slides.forEach(slide => observer.observe(slide));
	});

	ScrollTrigger.create({
		trigger: stickySection,
		start: "top top",
		end: `+=${stickyHeight}px`,
		scrub: 1,
		pin: true,
		pinSpacing: true,
		snap: {
			snapTo: 1 / (slides.length - 1), // Snap points between slides
			duration: {min: 1.5, max: 3}, // Snap animation duration
			delay: 0, // No delay
			ease: "power2.inOut" // Easing function
		},
		onUpdate: ((self) => {
			const progress = self.progress;
			const mainSlide = progress * totalSlide;

			gsap.set(slidesContainer, {
				x: -mainSlide
			});

			const currentSlide = Math.floor(mainSlide / slideWidth);
			const sliderProgress = (mainSlide % slideWidth) / slideWidth;

			slides.forEach((slide, index) => {
				const image = slide.querySelector("img");

				if (image) {
					if (index === currentSlide || index === currentSlide + 1) {
						const relativeProgress = index === currentSlide ? sliderProgress : sliderProgress - 1;
						const paralaxAmount = relativeProgress * slideWidth * 0.25;

						gsap.set(image, {
							x: paralaxAmount,
							scale: 1.35
						});
					}

					else {
						gsap.set(image, {
							x: 0,
							scale: 1.35
						});
					}
				}
			});
		})
	});
});