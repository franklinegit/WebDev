import {gsap} from "gsap";
import {Flip} from "gsap/Flip";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);


document.addEventListener("DOMContentLoaded", () => {

	// Timelines
	const revealTl = gsap.timeline();
	const scaleTl = gsap.timeline();
	const mainTl = gsap.timeline();


	// REVEALERS



	// SCALE IMAGES
	scaleTl.to(".images .img:first-child", {
		scale: 1,
		duration: 2,
		ease: "power4.inOut"
	}, ">-.25");




});