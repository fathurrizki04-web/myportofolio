/**
 * PORTFOLIO JAVASCRIPT
 * Theme: Midnight Security
 * Features: Typewriter, Sticky Navbar, Scrollspy, and 3D Tilt Effect
 */

// 1. TYPEWRITER EFFECT
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.isDeleting = false;
        this.type();
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove character
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add character
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert text into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2; // Delete twice as fast
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before typing next word
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// 2. STICKY NAVBAR DYNAMIC SCROLL
const initNavbar = () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const handleScroll = () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    // Run once on load to set correct state
    handleScroll();
    window.addEventListener('scroll', handleScroll);
};

// 3. SCROLLSPY (ACTIVE NAVIGATION HIGHLIGHT)
const initScrollspy = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    if (!sections.length || !navLinks.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Focus window is biased towards middle/top of screen
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
};

// 4. PURE JS 3D TILT EFFECT
const init3DTilt = () => {
    const tiltCards = document.querySelectorAll('[data-tilt]');
    
    // Disable tilt on mobile devices to save performance and prevent jumpy animations
    if (window.innerWidth <= 768) return;

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            
            // Cursor position relative to the element
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Dimensions
            const width = rect.width;
            const height = rect.height;
            
            // Center points
            const centerX = width / 2;
            const centerY = height / 2;
            
            // Max rotation (degrees)
            const maxTilt = 12;
            
            // Calculate tilt degrees
            const rotateX = ((centerY - y) / centerY) * maxTilt;
            const rotateY = ((x - centerX) / centerX) * maxTilt;
            
            // Set dynamic CSS properties for spotlight cursor element
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            
            // Apply 3D transform
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            // Reset transform smoothly
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
};

// INITIALIZE ALL
document.addEventListener('DOMContentLoaded', () => {
    // Start Typewriter
    const txtElement = document.getElementById('typewriter');
    if (txtElement) {
        const words = ["Web Developer", "Cybersecurity Enthusiast", "System Defender"];
        new TypeWriter(txtElement, words);
    }

    // Start Navbar Scrolling Behavior
    initNavbar();

    // Start Scrollspy
    initScrollspy();

    // Start 3D Tilt Card Effects
    init3DTilt();
});
