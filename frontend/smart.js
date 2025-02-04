function toggleForm(formId) {
    // Hide all dropdown forms first
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'none';

    // Show the clicked form
    const form = document.getElementById(formId);
    if (form.style.display === 'flex') {
        form.style.display = 'none';
    } else {
        form.style.display = 'flex';
    }
}

// Close form when clicking outside
document.addEventListener("click", function(event) {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const navLinks = document.querySelectorAll('.nav a');

    let isClickInsideNav = false;
    navLinks.forEach(link => {
        if (link.contains(event.target)) {
            isClickInsideNav = true;
        }
    });

    if (!registerForm.contains(event.target) && !loginForm.contains(event.target) && !isClickInsideNav) {
        registerForm.style.display = 'none';
        loginForm.style.display = 'none';
    }
});
/*
function toggleChat() {
const chatPopup = document.getElementById("chatbot");
chatPopup.style.display = (chatPopup.style.display === "block") ? "none" : "block";
}
*/
function toggleChat() {
    var chatbot = document.getElementById("chatbot");
    chatbot.classList.toggle("active");
}

// Default: Show the register form first
function handleLend() {
alert("Redirecting to the Lender's section...");
// Here you can add code to navigate to the lender's section or page
}

function handleBorrow() {
alert("Redirecting to the Borrower's section...");
// Here you can add code to navigate to the borrower's section or page
}
function handleLend() {
window.location.href = 'lend.html'; // Redirect to lend.html
}

function handleBorrow() {
window.location.href = 'borrow.html'; // Redirect to borrow.html
}

let currentSlide = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;
/*
function moveSlide(direction) {
currentSlide += direction;

// Loop back to the first slide if we go past the last slide
if (currentSlide >= totalSlides) {
    currentSlide = 0;
}

// Loop back to the last slide if we go before the first slide
if (currentSlide < 0) {
    currentSlide = totalSlides - 1;
}

// Update the transform property to show the current slide
slides.style.transform = `translateX(-${currentSlide * 100}%)`;
} */
let currentIndex = 0;

function moveSlide(direction) {
    const slides = document.querySelector(".slides");
    const totalSlides = document.querySelectorAll(".slide").length;

    currentIndex += direction;

    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    }

    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Auto-slide every 3 seconds
setInterval(() => moveSlide(1), 3000);


// Automatically move to the next slide every 3 seconds
setInterval(() => {
moveSlide(1);
}, 1000); // 3000 milliseconds = 3 seconds

