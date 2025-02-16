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
function toggleChat() {
const chatPopup = document.getElementById("chatbot");
chatPopup.style.display = (chatPopup.style.display === "block") ? "none" : "block";
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
async function registerUser(event) {
event.preventDefault();
const fullName = document.getElementById('fullName').value;
const phoneNumber = document.getElementById('phoneNumber').value;
const password = document.getElementById('password').value;

const response = await fetch('http://localhost:3000/api/users/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ fullName, phoneNumber, password })
});

if (response.ok) {
    
    alert('User registered successfully');
} else {
    console.log(response)
    alert('Error registering user');
}
}

async function registerUser(event) {
event.preventDefault();
const fullName = document.getElementById('fullName').value;
const phoneNumber = document.getElementById('phoneNumber').value;
const password = document.getElementById('password').value;

const response = await fetch('http://localhost:3000/api/users/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ fullName, phoneNumber, password })
});

if (response.ok) {
    
    alert('User registered successfully');
} else {
    console.log(response)
    alert('Error registering user');
}
}
async function loginUser(event) {
    event.preventDefault();
    
    const phoneNumber = document.getElementById('loginPhoneNumber').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phoneNumber, password })
    });

    const result = await response.json();

    if (response.ok) {
        // Store user info in local storage
        console.log(result)
        console.log(result.token)
        localStorage.setItem('token', JSON.stringify(result.token));

        alert('Login successful');
        
        // Redirect to dashboard or homepage
        // window.location.href = 'dashboard.html'; 
    } else {
        alert(result.message || 'Login failed. Please check your credentials.');
    }
}

let currentSlide = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;

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
}

// Automatically move to the next slide every 3 seconds
setInterval(() => {
moveSlide(1);
}, 100000000); // 3000 milliseconds = 3 seconds