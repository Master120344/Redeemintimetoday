document.addEventListener('DOMContentLoaded', () => {
    const sitePreloader = document.getElementById('sitePreloader');
    const preloaderBar = document.querySelector('.preloader-bar');
    const siteHeader = document.getElementById('siteHeader');
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const siteOverlay = document.getElementById('siteOverlay');
    const navLinks = mobileNav.querySelectorAll('.mobile-nav__link');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const parallaxSections = document.querySelectorAll('.parallax-section');

    // --- Site Preloader ---
    if (sitePreloader && preloaderBar) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10; 
            preloaderBar.style.width = progress + '%';
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => sitePreloader.classList.add('loaded'), 200);
            }
        }, 50);

        window.addEventListener('load', () => {
            clearInterval(interval);
            preloaderBar.style.width = '100%';
            setTimeout(() => {
                sitePreloader.classList.add('loaded');
            }, 300);
        });
    }

    // --- Header Scroll Behavior ---
    let lastScrollY = window.scrollY;
    if (siteHeader) {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > siteHeader.offsetHeight) {
                siteHeader.classList.add('header--hidden');
            } else {
                siteHeader.classList.remove('header--hidden');
            }
            siteHeader.classList.toggle('header--scrolled', currentScrollY > 50);
            lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
        });
    }

    // --- Mobile Navigation ---
    function toggleMobileNav(isOpen) {
        menuToggle.classList.toggle('is-active', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen.toString());
        mobileNav.classList.toggle('is-open', isOpen);
        mobileNav.setAttribute('aria-hidden', (!isOpen).toString());
        siteOverlay.classList.toggle('is-visible', isOpen);
        document.body.classList.toggle('no-scroll', isOpen);
    }

    if (menuToggle && mobileNav && siteOverlay) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mobileNav.classList.contains('is-open');
            toggleMobileNav(!isOpen);
        });

        siteOverlay.addEventListener('click', () => toggleMobileNav(false));
        // Navigation links lead to other pages, so active toggling on click isn't needed here
        // for closing the nav. Page load will handle nav state.
    }
    
    // --- Active Nav Link Highlighting for Multi-Page Site ---
    function updateActiveLinkForMultiPage() {
        const currentPath = window.location.pathname.split('/').pop();
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop();
            const isActive = (linkPath === currentPath) || (currentPath === '' && (linkPath === 'index_mobile.html' || linkPath === '/'));
            link.classList.toggle('active-nav-link', isActive);
        });
    }
    if (mobileNav) { // Ensure mobileNav exists before trying to update links
        updateActiveLinkForMultiPage();
    }


    // --- Smooth Scroll for On-Page Anchors (e.g., Hero scroll indicator) ---
    const headerHeight = () => siteHeader ? siteHeader.offsetHeight : 0;
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1 && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    let offset = headerHeight();
                    if (targetId === '#hero' || targetElement.offsetTop < offset) {
                        offset = 0; 
                    }

                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - offset;

                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    if (mobileNav && mobileNav.classList.contains('is-open')) { // Check mobileNav exists
                        toggleMobileNav(false);
                    }
                }
            }
        });
    });

    // --- Intersection Observer for Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
        animatedElements.forEach(el => observer.observe(el));
    }

    // --- Parallax Background Effect ---
    parallaxSections.forEach(section => {
        const url = section.dataset.parallaxUrl;
        if (url) section.style.backgroundImage = `url(${url})`;
    });

    // --- Animated Number Counters (If any are on this specific page) ---
    const statNumbers = document.querySelectorAll('.stat-item__number'); 
    function animateCounter(el, target) {
        let current = 0;
        const duration = 2000;
        const increment = target / (duration / 16); 

        const updateCount = () => {
            current += increment;
            if (current < target) {
                el.textContent = Math.ceil(current);
                requestAnimationFrame(updateCount);
            } else {
                el.textContent = target;
                el.classList.add('counted');
            }
        };
        requestAnimationFrame(updateCount);
    }

    if (statNumbers.length > 0) {
        const statObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const targetVal = parseInt(entry.target.dataset.target);
                    if (!isNaN(targetVal)) {
                        animateCounter(entry.target, targetVal);
                    }
                    obs.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.6 });
        statNumbers.forEach(stat => statObserver.observe(stat));
    }

    // --- Form Submission (Placeholder for Newsletter on this page) ---
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '' && emailInput.checkValidity()) {
                alert('Thank you for subscribing to Redeeming Time Today! (This is a demo feature)');
                newsletterForm.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // --- Scroll to Top Button ---
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.classList.toggle('is-visible', window.scrollY > 400);
        });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Update Year in Footers ---
    const currentYear = new Date().getFullYear();
    const footerYearEl = document.getElementById('footerYear');
    if (footerYearEl) {
        footerYearEl.textContent = currentYear.toString();
    }
    // 'navYear' element was removed from HTML, so no longer trying to update it.

});