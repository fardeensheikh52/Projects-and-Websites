// Select elements for interactivity
const toggleButton = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('nav ul');
const whiteLink = document.querySelector('.white-link');
const tealLink = document.querySelector('.teal-link');

// Mobile Navigation Toggle
if (toggleButton) {
    toggleButton.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', event => {
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            event.preventDefault(); // Prevent default link behavior
            targetElement.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu after clicking a link
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// Button Click Events (Placeholder)
if (whiteLink) {
    whiteLink.addEventListener('click', event => {
        event.preventDefault();
        alert('Booking functionality is coming soon!');
    });
}

if (tealLink) {
    tealLink.addEventListener('click', event => {
        event.preventDefault();
        alert('Menu preview functionality is under development!');
    });
}

// Close Mobile Menu on Outside Click
document.addEventListener('click', event => {
    if (!navMenu.contains(event.target) && !toggleButton.contains(event.target)) {
        navMenu.classList.remove('active');
    }
});
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', event => {
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            event.preventDefault(); // Prevent default link behavior
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
