function dom() {
    const dom = {
        get: function (selector) {
            return document.querySelector(selector);
        },
        getAll: function (selector) {
            return document.querySelectorAll(selector);
        },
        create: function (tagName) {
            return document.createElement(tagName);
        },
        append: function (parent, child) {
            parent.appendChild(child);
        },
        remove: function (element) {
            element.parentNode.removeChild(element);
        }
    };
    return dom;
}

const focusimgdiv = dom().get('.focus-image');
const focusimg = dom().get('.focus-image img');
focusimgdiv.addEventListener('click', function () {
    // spin the image 360 degrees
    focusimg.style.transition = 'rotate 1s, transform 0.3s';
    focusimg.style.rotate = '360deg';
    setTimeout(function () {
        focusimg.style.transition = 'transform 0.3s';
        focusimg.style.rotate = '0deg';
    }, 1000);
});

// Function to animate elements on scroll
function animateOnScroll(selector, animationClass = "show", options = { threshold: 0.5 }) {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(animationClass);
                entry.target.style.opacity = "1";
                observer.unobserve(entry.target); 
            }
        });
    }, options);
    elements.forEach(el => observer.observe(el));
} 

// Apply animation to .box elements
animateOnScroll('.box', 'flyin');

let lastScrollY = window.scrollY;
const header = document.querySelector('header');


function setupActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#headcontent nav ul li a');
    let isUserScrolling = false; 

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            isUserScrolling = true; 
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start', 
            });
            navLinks.forEach(link => link.classList.remove('active'));
            link.classList.add('active');

            setTimeout(() => {
                link.parentElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center',
                });
                isUserScrolling = false; 
            }, 500); 
        });
    });
    
    // Observer for #intro and #about with a custom rootMargin
    const customObserver = new IntersectionObserver((entries) => {
        if (isUserScrolling) return; 
        entries.forEach(entry => {
            console.log(entry.target.id, entry.intersectionRatio); // Debug log
            if ((entry.target.id === 'intro' || entry.target.id === 'about' || entry.target.id === 'features') && entry.intersectionRatio > 0.2) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`#headcontent nav ul li a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                    activeLink.parentElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center',
                    });
                }
            }
        });
    }, {
        threshold: [0.2, 0.5],
        rootMargin: "-50px 0px 0px 0px"
    });
    
    // Observer for the other sections
    const otherObserver = new IntersectionObserver((entries) => {
        if (isUserScrolling) return; 
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.id !== 'intro' && entry.target.id !== 'about') {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`#headcontent nav ul li a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                    activeLink.parentElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center',
                    });
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: "-50px 0px 0px 0px"
    });

    sections.forEach(section => {
        if (section.id === 'intro' || section.id === 'about' || section.id === 'features') {
            customObserver.observe(section);
        } else {
            otherObserver.observe(section);
        }
    });
}

setupActiveNav();