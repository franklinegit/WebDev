
const scrollers = document.querySelectorAll(".scroller");

if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}

function addAnimation() {
    scrollers.forEach(scroller => {
        scroller.setAttribute("data-animated", true);

        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        console.log(scrollerContent);

        scrollerContent.forEach(item => {
            const duplicatedItem = item.cloneNode(true);

            console.log(duplicatedItem);
            duplicatedItem.setAttribute("aria-hidden", true);  // Hides duplicated items from screen reader
            scrollerInner.appendChild(duplicatedItem);
        });
    });
}