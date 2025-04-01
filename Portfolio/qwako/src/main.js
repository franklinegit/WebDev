import {gsap} from "gsap";
import {Flip} from "gsap/Flip";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);


document.addEventListener("DOMContentLoaded", async () => {

	// Timelines

	const mainTl = gsap.timeline();


	// REVEALERS
	function revealerTl() {
		const revealTl = gsap.timeline();
		revealTl.to(".revealer-1", {
			clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
			duration: 1,
			ease: "power4.inOut"
		  }).to(".revealer-2", {
			clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
			duration: 1,
			ease: "power4.inOut"
		  }, "<");

		return revealTl;
	}

	// revealerTl();



	// SCALE IMAGES
	function scalingTl() {
		return new Promise((resolve) => {
			const scaleTl = gsap.timeline({
				onComplete: resolve  // Resolves when this timeline completes
			});

			scaleTl.to(".images .img:first-child", {
				scale: 1,
				duration: 2,
				ease: "power4.inOut"
			}, ">-.25");
	
			// Images
			const images = document.querySelectorAll(".images .img:not(:first-child)");
	
			images.forEach(img => {
				scaleTl.to(img, {
					scale: 1,
					opacity: 1,
					duration: 1.25,
					fade: true,
					ease: "power3.inOut"
				}, ">-.25")
			});
	
		});
	
	}


	// // FLIP IMAGES INTO STACK
    function flipImgTl() {
        const flipTl = gsap.timeline();
        const imageStack = document.querySelector(".image-stack");
        const mainImages = document.querySelectorAll(".images .img.main");
        
        // First, remove non-main images
		document.querySelectorAll(".images .img:not(.main)").forEach(img => {img.remove();});

		const state = Flip.getState(".main");
		const state2 = Flip.getState(".images");
		const images = document.querySelector(".images")
		const imgs = Array.from(document.querySelectorAll(".images .img"));

		imageStack.appendChild(images);
		images.classList.add("images-stacked");
		gsap.set(".images.images.stacked", {
			clearProps: "transform, top, left, position, z-index",
			zIndex: -1
		})

		imgs.forEach((img, index) => {
			img.classList.add("stacked");
			img.style.order = index;
			gsap.set(".img.stacked", {
				clearProps: "transform, top, left, position"
			});

		});
		imgs[imgs.length - 1].classList.add("active");

		Flip.from(state, {
			duration: 1.25,
			absolute: true,
			ease: "power4.inOut",
			stagger: {
				amount: -0.3
			}
		});



        return flipTl;
    }


	// MAIN TL
	async function runAnimations() {
		mainTl.add(revealerTl());
		await scalingTl();  // Waits here until scaling completes
		mainTl.add(await flipImgTl());
	}

	runAnimations();

});