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



function updateProgressBar() {
  const progressBar = document.getElementById('progress-bar');
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercentage = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
  progressBar.style.width = `${scrollPercentage}%`;
}

let lastScrollY = window.scrollY;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
//   if (window.scrollY > lastScrollY && window.scrollY > header.offsetHeight) {
//     // Scrolling down
//     header.classList.add('hidden');
//     header.classList.remove('visible');
//   } else {
//     // Scrolling up
//     header.classList.add('visible');
//     header.classList.remove('hidden');
//   }
//   lastScrollY = window.scrollY;
  updateProgressBar();
});


window.addEventListener('load', updateProgressBar);


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
        // Observer for the #intro and #about sections
    const introObserver = new IntersectionObserver((entries) => {
        if (isUserScrolling) return; 
        entries.forEach(entry => {
            if (
                (entry.target.id === 'intro' || entry.target.id == 'about') 
                && entry.intersectionRatio > 0.3) {
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
        threshold: [0.3, 0.5],
        rootMargin: "-50px 0px 0px 0px"
    });
      // Observer for the other sections
     const otherObserver = new IntersectionObserver((entries) => {
        if (isUserScrolling) return; 
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.id !== 'intro') {
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
        threshold: 0.5
    });

    sections.forEach(section => {
        if (section.id === 'intro') {
            introObserver.observe(section);
        } else {
            otherObserver.observe(section);
        }
    });
}

setupActiveNav();