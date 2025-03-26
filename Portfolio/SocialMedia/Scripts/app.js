

// Sidebar
const menuItems = document.querySelectorAll(".menu-item");

// Messages
const messagesNotification = document.getElementById("messages-notifs");
const messages = document.querySelector(".messages");
const message = messages.querySelectorAll(".message");
// const messageSearch = document.getElementById("message-search");
const messageSearch = document.querySelector("#message-search");

// Theme
const theme = document.getElementById("theme");
const themeModal = document.querySelector(".customize-theme");
const fontSizes = document.querySelectorAll(".choose-size span");
var root = document.querySelector(":root");
const colorPallete = document.querySelectorAll(".choose-color span");
const bg1 = document.querySelector(".bg-1");
const bg2 = document.querySelector(".bg-2");
const bg3 = document.querySelector(".bg-3");
    

// ========------ SIDEBAR ------========
// Function to change the active item
const changeActiveItem = () => {
    menuItems.forEach(item => {
        item.classList.remove("active");
    });  
}

// Activate selected Item
menuItems.forEach(item => {
    item.addEventListener("click", () => {
        changeActiveItem();
        item.classList.add("active")

        // Open Notifications Popup
        if (item.id != "notifications") {
            document.querySelector(".notif-popup").style.display = "none";
        }

        else {
            document.querySelector(".notif-popup").style.display = "block";
            document.querySelector("#notifications .notif-count").style.display = "none"
        }

        // Highlight messages card when message is clicked and remove notif count
        if (item.id != "messages-notifs") {
            messages.style.boxShadow = "none";
        }

        else {
            messages.style.boxShadow = `0 0 2rem var(--clr-primary)`;
            messagesNotification.querySelector(".notif-count").style.display = "none";
        }
    });
});


// ========------ MESSAGES ------========
// messagesNotification.addEventListener("click", () => {
//     messages.style.boxShadow = `0 0 2rem var(--clr-primary)`;
//     messagesNotification.querySelector(".notif-count").style.display = "none";

//     // Remove box shadow with setTimeout
//     setTimeout(() => {
//         messages.style.boxShadow = "none";
//     }, 3000)
// });

// Searches chats
const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();
    console.log(val);
    message.forEach(chat => {
        let name = chat.querySelector("h5").textContent.toLowerCase();
        if (name.indexOf(val) != -1) {
            chat.style.display = "flex";
        }

        else {
            chat.style.display = "none";
        }
    });
}

// Search chats
messageSearch.addEventListener("keyup", searchMessage);



// ========------ THEME CUSTOMIZATION ------========
// THEME MODAL
// Open theme modal
// function openThemeModal() {
//     themeModal.style.display = "grid";
// }

const openThemeModal = () => {
    themeModal.style.display = "grid";
}
// theme.addEventListener("click", openThemeModal());

// Close Theme modal when you click outside the card
// function closeThemeModal(e) {
//     if (e.target.classList.contains("customize-theme")) {
//         themeModal.style.display = "none";
//     }
// }

const closeThemeModal = (e) => {
    if (e.target.classList.contains("customize-theme")) {
        themeModal.style.display = "none";
    }
}

themeModal.addEventListener("click", closeThemeModal);

theme.addEventListener("click", openThemeModal);


// FONT SIZE
// Remove size selector
const removeSizeSelector = () => {
    fontSizes.forEach(size => {
        size.classList.remove("active");
    });
}

console.log(fontSizes);
fontSizes.forEach(size => {

    size.addEventListener("click", () => {
        removeSizeSelector();

        let fontSize;

        size.classList.toggle("active");

        if (size.classList.contains("font-size-1")) {
            fontSize = "10px";
            root.style.setProperty('--sticky-top-left', '4.8rem');
            root.style.setProperty('--sticky-top-right', '4.8rem');
        }
        else if (size.classList.contains("font-size-2")) {
            fontSize = "12px";
            root.style.setProperty('--sticky-top-left', '4.8rem');
            root.style.setProperty('--sticky-top-right', '-5rem');
        }
        else if (size.classList.contains("font-size-3")) {
            fontSize = "14px";
            root.style.setProperty('--sticky-top-left', '4.8rem');
            root.style.setProperty('--sticky-top-right', '-7rem');
        }
        else if (size.classList.contains("font-size-4")) {
            fontSize = "16px";
            root.style.setProperty('--sticky-top-left', '4.8rem');
            root.style.setProperty('--sticky-top-right', '-12rem');
        }
        else if (size.classList.contains("font-size-5")) {
            fontSize = "18px";
            root.style.setProperty('--sticky-top-left', '4.8rem');
            root.style.setProperty('--sticky-top-right', '-17rem');
        }
    
        // change font size of the root html element
        document.querySelector("html").style.fontSize = fontSize;
    });
});


// PRIMARY COLOR
console.log(colorPallete);

// Remove active class from color picker
const changeActiveColorClass = () => {
    colorPallete.forEach(colorPicker => {
        colorPicker.classList.remove("active");
    });
}

colorPallete.forEach(color => {
    color.addEventListener("click", () => {
        // Remove active class from color picker
        changeActiveColorClass();
        let primaryHue;

        if (color.classList.contains("color-1")) {
            primaryHue = 252;
        }
        else if (color.classList.contains("color-2")) {
            primaryHue = 52;
        }
        else if (color.classList.contains("color-3")) {
            primaryHue = 352;
        }
        else if (color.classList.contains("color-4")) {
            primaryHue = 152;
        }
        else if (color.classList.contains("color-5")) {
            primaryHue = 202;
        }

        // Add active class from color picker
        color.classList.add("active");

        root.style.setProperty("--primary-color-hue", primaryHue);
    });
});


// BACKGROUND
// Lightness Values
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;


// Change Background Color
const changeBg = () => {
    root.style.setProperty("--light-color-lightness", lightColorLightness);
    root.style.setProperty("--white-color-lightness", whiteColorLightness);
    root.style.setProperty("--dark-color-lightness", darkColorLightness);
}

bg1.addEventListener("click", () => {
    darkColorLightness = "17%";
    whiteColorLightness = "100%";
    lightColorLightness = "95%";

    // Add active class
    bg1.classList.add("active")
    // Remove active class
    bg2.classList.remove("active");
    bg3.classList.remove("active");

    changeBg();
});


bg2.addEventListener("click", () => {
    darkColorLightness = "95%";
    whiteColorLightness = "20%";
    lightColorLightness = "15%";

    // Add active class
    bg2.classList.add("active")
    // Remove active class
    bg1.classList.remove("active");
    bg3.classList.remove("active");

    changeBg();
});


bg3.addEventListener("click", () => {
    darkColorLightness = "95%";
    whiteColorLightness = "5%";
    lightColorLightness = "0%";

    // Add active class
    bg3.classList.add("active")
    // Remove active class
    bg1.classList.remove("active");
    bg2.classList.remove("active");

    changeBg();
});