// ============================================
//  PERSONAL PORTFOLIO — MAIN JAVASCRIPT
//  Contact form powered by EmailJS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initEmailJS();
    initThemeToggle();
    initNavbar();
    initTypingEffect();
    initScrollAnimations();
    initSkillBars();
    initCountUp();
    initProjectFilters();
    initContactForm();
    initBackToTop();
    initCursorGlow();
    initParticles();
    setCurrentYear();
});

// ============================================
//  EMAILJS INITIALIZATION
//  ⚠️ REPLACE WITH YOUR OWN PUBLIC KEY
// ============================================
function initEmailJS() {
    // ============================================
    // ⚠️⚠️⚠️ IMPORTANT: REPLACE THIS KEY ⚠️⚠️⚠️
    // Go to https://www.emailjs.com → Account → Public Key
    // Copy your key and paste it below
    // ============================================
    emailjs.init("_1WOlE1PgsPiVupYq");
}

// ============================================
//  THEME TOGGLE
// ============================================
function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const saved = localStorage.getItem('theme');
    if (saved) html.setAttribute('data-theme', saved);
    toggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
}

// ============================================
//  NAVBAR
// ============================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        updateActiveNavLink(sections, navLinks);
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

function updateActiveNavLink(sections, navLinks) {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-nav') === current) link.classList.add('active');
    });
}

// ============================================
//  TYPING EFFECT
// ============================================
function initTypingEffect() {
    const element = document.getElementById('typingText');
    const phrases = ['Web Developer', 'Frontend Developer', 'ICS Student', 'Problem Solver', 'Tech Enthusiast'];
    let phraseIndex = 0, charIndex = 0, isDeleting = false, typeSpeed = 80;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            element.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            element.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }
        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }
        setTimeout(type, typeSpeed);
    }
    type();
}

// ============================================
//  SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    elements.forEach(el => observer.observe(el));
}

// ============================================
//  SKILL BARS
// ============================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.setProperty('--target-width', width + '%');
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    skillBars.forEach(bar => observer.observe(bar));
}

// ============================================
//  COUNT UP
// ============================================
function initCountUp() {
    const numbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCount(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    numbers.forEach(num => observer.observe(num));
}

function animateCount(element, start, end, duration) {
    const startTime = performance.now();
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = Math.floor(start + (end - start) * eased);
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

// ============================================
//  PROJECT FILTERS
// ============================================
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

const animStyle = document.createElement('style');
animStyle.textContent = `@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`;
document.head.appendChild(animStyle);

// ============================================
//  ✅ CONTACT FORM — EMAILJS INTEGRATION
//  This sends real emails to your Gmail
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const subject = form.querySelector('#subject').value.trim();
        const message = form.querySelector('#message').value.trim();

        // Validation
        if (!name || !email || !subject || !message) {
            showFormStatus('❌ Please fill in all fields.', 'error');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showFormStatus('❌ Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        const btn = form.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `
            <span>Sending...</span>
            <svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
        `;
        btn.disabled = true;

        // ============================================
        // ⚠️⚠️⚠️ REPLACE THESE 2 VALUES ⚠️⚠️⚠️
        // service_id  → from EmailJS → Email Services tab
        // template_id → from EmailJS → Email Templates tab
        // ============================================
        const SERVICE_ID = 'service_kx2ad1f';
        const TEMPLATE_ID = 'template_mvu6ua2';

        // Template parameters (must match your EmailJS template variables)
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_name: 'Faridullah',
            reply_to: email
        };

        // Send email via EmailJS
        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
            .then(function(response) {
                // ✅ SUCCESS
                console.log('SUCCESS!', response.status, response.text);
                showFormStatus('✅ Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
                btn.innerHTML = originalHTML;
                btn.disabled = false;

                // Clear success message after 7 seconds
                setTimeout(() => {
                    status.textContent = '';
                    status.className = 'form-status';
                }, 7000);
            })
            .catch(function(error) {
                // ❌ ERROR
                console.error('FAILED...', error);
                showFormStatus('❌ Failed to send message. Please try again or email me directly.', 'error');
                btn.innerHTML = originalHTML;
                btn.disabled = false;

                // Clear error message after 7 seconds
                setTimeout(() => {
                    status.textContent = '';
                    status.className = 'form-status';
                }, 7000);
            });
    });
}

function showFormStatus(message, type) {
    const status = document.getElementById('formStatus');
    status.textContent = message;
    status.className = `form-status ${type}`;
}

// ============================================
//  BACK TO TOP
// ============================================
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 500));
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ============================================
//  CURSOR GLOW
// ============================================
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!window.matchMedia('(hover: hover)').matches) return;
    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; });
    });
}

// ============================================
//  PARTICLES
// ============================================
function initParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    const count = window.innerWidth < 768 ? 15 : 30;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        const size = Math.random() * 4 + 1;
        p.style.cssText = `position:absolute;width:${size}px;height:${size}px;background:var(--accent-primary);border-radius:50%;left:${Math.random()*100}%;top:${Math.random()*100}%;opacity:${Math.random()*0.3+0.1};animation:particleFloat ${Math.random()*20+10}s ${Math.random()*10}s linear infinite;pointer-events:none;`;
        container.appendChild(p);
    }
    const s = document.createElement('style');
    s.textContent = `@keyframes particleFloat{0%,100%{transform:translate(0,0) scale(1);opacity:0}10%{opacity:.3}50%{transform:translate(${Math.random()>0.5?'':'-'}${Math.random()*100}px,-${Math.random()*200+100}px) scale(1.5);opacity:.15}90%{opacity:.3}}`;
    document.head.appendChild(s);
}

// Add spinner animation for loading button
const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
document.head.appendChild(spinnerStyle);

// ============================================
//  SET YEAR
// ============================================
function setCurrentYear() {
    const el = document.getElementById('currentYear');
    if (el) el.textContent = new Date().getFullYear();
}