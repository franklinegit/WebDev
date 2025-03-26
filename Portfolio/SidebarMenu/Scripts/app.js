

const toggleButton = document.getElementById("toggle-btn");
const sidebar = document.getElementById("sidebar");

// Function to toggle the sidebar
function toggleSideBar() {
    sidebar.classList.toggle("close");
    toggleButton.classList.toggle("rotate");

    Array.from(sidebar.getElementsByClassName("show")).forEach( ul => {
        ul.classList.remove("show");
        ul.previousElementSibling.classList.remove("rotate");
    });
}


// Function to toggle sub-menu and rotate the svg icon
function toggleSubMenu(button) {
    button.nextElementSibling.classList.toggle("show");
    button.classList.toggle("rotate");

    if (sidebar.classList.contains("close")) {
        sidebar.classList.toggle("close");
        toggleButton.classList.toggle("rotate");
    }
}