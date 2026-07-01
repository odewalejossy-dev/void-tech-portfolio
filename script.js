// ============ HAMBURGER MENU ============
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });
}

// ============ SMOOTH SCROLLING ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============ NAVBAR SCROLL EFFECT ============
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============ ACTIVE NAV LINK ============
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============ FORM VALIDATION ============
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const subject = formData.get('subject').trim();
        const service = formData.get('service');
        const message = formData.get('message').trim();
        
        // Simple validation
        if (!name || !email || !subject || !service || !message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Submit form (you can customize this to send to your backend)
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        contactForm.reset();
        
        // Uncomment below to actually submit to a service
        // contactForm.submit();
    });
}

// ============ NOTIFICATION SYSTEM ============
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============ SCROLL ANIMATIONS ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.6s ease-out forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.feature-card, .service-card, .team-card, .faq-item').forEach(el => {
    observer.observe(el);
});

// ============ COUNTER ANIMATION ============
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Start counter animation when stats section is in view
window.addEventListener('load', () => {
    const statCards = document.querySelectorAll('.stat-card h3');
    let hasAnimated = false;
    
    window.addEventListener('scroll', () => {
        if (!hasAnimated && window.pageYOffset > 1000) {
            statCards.forEach(card => {
                const number = parseInt(card.textContent);
                if (!isNaN(number)) {
                    animateCounter(card, number);
                }
            });
            hasAnimated = true;
        }
    });
});

// ============ PARALLAX EFFECT ============
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach(element => {
        const scrollPosition = window.pageYOffset;
        element.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
});

// ============ BUTTON RIPPLE EFFECT ============
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ============ LAZY LOADING IMAGES ============
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============ PAGE LOAD ANIMATION ============
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ============ KEYBOARD SHORTCUTS ============
document.addEventListener('keydown', (e) => {
    // Press 'h' to go home
    if (e.key.toLowerCase() === 'h') {
        window.location.href = 'index.html';
    }
    // Press 's' to go to services
    if (e.key.toLowerCase() === 's') {
        window.location.href = 'services.html';
    }
    // Press 'a' to go to about
    if (e.key.toLowerCase() === 'a') {
        window.location.href = 'about.html';
    }
    // Press 'c' to go to contact
    if (e.key.toLowerCase() === 'c') {
        window.location.href = 'contact.html';
    }
});

// ============ MOBILE MENU CLOSE ON LINK CLICK ============
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.style.display = 'none';
        hamburger.classList.remove('active');
    });
});

// ============ TEXT ANIMATION ============
function typeWriter(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';
    
    const type = () => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    };
    
    type();
}

// ============ FLOATING ANIMATION FOR ELEMENTS ============
function addFloatingAnimation(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
        el.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
    });
}

// ============ FORM INPUT FOCUS EFFECT ============
document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// ============ DARK MODE TOGGLE (Optional) ============
const darkModeToggle = () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.body.style.background = '#0f172a';
        document.body.style.color = '#f1f5f9';
    }
};

// Uncomment to enable dark mode
// darkModeToggle();

// ============ SMOOTH SCROLL BEHAVIOR ============
document.documentElement.style.scrollBehavior = 'smooth';

// ============ ACCESSIBILITY - FOCUS VISIBLE ============
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ============ PRINT STYLES ============
window.addEventListener('beforeprint', () => {
    document.querySelectorAll('.navbar, .footer').forEach(el => {
        el.style.display = 'none';
    });
});

window.addEventListener('afterprint', () => {
    document.querySelectorAll('.navbar, .footer').forEach(el => {
        el.style.display = '';
    });
});

// ============ SERVICE ANIMATIONS ============
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// ============ PERFORMANCE OPTIMIZATION ============
// Debounce function for scroll events
function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Use debounced scroll handler
const handleScroll = debounce(() => {
    // Your scroll handling code here
}, 100);

window.addEventListener('scroll', handleScroll);

// ============ CONSOLE MESSAGE ============
console.log('%cWelcome to Void Tech! 🚀', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cWe create stunning digital experiences through innovative design.', 'font-size: 14px; color: #a855f7;');
