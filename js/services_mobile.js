// This JS file will be very similar to index_mobile.js and mission_mobile.js
// as most functionality is shared (preloader, header, nav, scroll top, etc.).
document.addEventListener('DOMContentLoaded', () => {
    const sitePreloader = document.getElementById('sitePreloader');
    const preloaderBar = document.querySelector('.preloader-bar');
    const siteHeader = document.getElementById('siteHeader');
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const siteOverlay = document.getElementById('siteOverlay');
    const navLinks = mobileNav.querySelectorAll('.mobile-nav__link');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    // --- Site Preloader ---
    if (sitePreloader && preloaderBar) {
        let progress = 0;
        const intervalTime = 40;
        const totalTime = 800;
        const progressIncrement = (intervalTime / totalTime) * 100;

        const interval = setInterval(() => {
            progress += progressIncrement;
            preloaderBar.style.width = Math.min(progress, 100) + '%';
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => sitePreloader.classList.add('loaded'), 150); 
            }
        }, intervalTime);

        window.addEventListener('load', () => {
            clearInterval(interval); 
            preloaderBar.style.width = '100%';
            setTimeout(() => {
                sitePreloader.classList.add('loaded');
            }, 250); 
        });
    }

    // --- Header Scroll Behavior ---
    let lastScrollY = window.scrollY;
    const headerScrollThreshold = 50; 
    if (siteHeader) {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > siteHeader.offsetHeight + headerScrollThreshold) {
                siteHeader.classList.add('header--hidden');
            } else {
                siteHeader.classList.remove('header--hidden');
            }
            siteHeader.classList.toggle('header--scrolled', currentScrollY > headerScrollThreshold);
            lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
        }, { passive: true });
    }

    // --- Mobile Navigation ---
    function toggleMobileNav(forceOpen) {
        const isOpen = typeof forceOpen === 'boolean' ? forceOpen : !mobileNav.classList.contains('is-open');
        menuToggle.classList.toggle('is-active', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen.toString());
        mobileNav.classList.toggle('is-open', isOpen);
        mobileNav.setAttribute('aria-hidden', (!isOpen).toString());
        siteOverlay.classList.toggle('is-visible', isOpen);
        document.body.classList.toggle('no-scroll', isOpen);
    }

    if (menuToggle && mobileNav && siteOverlay) {
        menuToggle.addEventListener('click', () => toggleMobileNav());
        siteOverlay.addEventListener('click', () => toggleMobileNav(false));
    }
    
    // --- Active Nav Link Highlighting for Multi-Page Site ---
    function updateActiveLinkForMultiPage() {
        const currentPath = window.location.pathname.split('/').pop() || 'index_mobile.html';
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop();
            link.classList.toggle('active-nav-link', linkPath === currentPath);
        });
    }
    if (navLinks.length > 0) {
        updateActiveLinkForMultiPage();
    }

    // --- Smooth Scroll for On-Page Anchors (if any on this page) ---
    const headerHeight = () => siteHeader ? siteHeader.offsetHeight : 0;
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1 && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerHeight();

                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    if (mobileNav.classList.contains('is-open')) {
                        toggleMobileNav(false);
                    }
                }
            }
        });
    });

    // --- Intersection Observer for Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observerOptions = {
            threshold: 0.15, 
            rootMargin: "0px 0px -60px 0px" 
        };
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target); 
                }
            });
        }, observerOptions);
        animatedElements.forEach(el => observer.observe(el));
    }

    // --- Form Submission (Placeholder for Newsletter in Footer) ---
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '' && emailInput.checkValidity()) {
                alert('Thank you for subscribing to Redeeming Time Today! (This is a demo feature)');
                newsletterForm.reset();
            } else {
                alert('Please enter a valid email address to subscribe to Redeeming Time Today.');
                if(emailInput) emailInput.focus();
            }
        });
    }

    // --- Scroll to Top Button ---
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.classList.toggle('is-visible', window.scrollY > 300); 
        }, { passive: true });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Update Year in Footers ---
    const currentYear = new Date().getFullYear();
    ['navYear', 'footerYear'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = currentYear.toString();
    });

});