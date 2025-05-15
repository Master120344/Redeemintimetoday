document.addEventListener('DOMContentLoaded', () => {
    const sitePreloader = document.getElementById('sitePreloader');
    const preloaderBar = document.querySelector('.preloader-bar');
    const siteHeader = document.getElementById('siteHeader');
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const siteOverlay = document.getElementById('siteOverlay');
    const navLinks = mobileNav ? mobileNav.querySelectorAll('.mobile-nav__link') : []; 
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    // Site Preloader
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

    // Header Scroll Behavior
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

    // Mobile Navigation
    function toggleMobileNav(isOpen) {
        if (menuToggle) menuToggle.classList.toggle('is-active', isOpen);
        if (menuToggle) menuToggle.setAttribute('aria-expanded', isOpen.toString());
        if (mobileNav) mobileNav.classList.toggle('is-open', isOpen);
        if (mobileNav) mobileNav.setAttribute('aria-hidden', (!isOpen).toString());
        if (siteOverlay) siteOverlay.classList.toggle('is-visible', isOpen);
        document.body.classList.toggle('no-scroll', isOpen);
    }

    if (menuToggle && mobileNav && siteOverlay) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mobileNav.classList.contains('is-open');
            toggleMobileNav(!isOpen);
        });

        siteOverlay.addEventListener('click', () => toggleMobileNav(false));
        navLinks.forEach(link => {
            if (!link.getAttribute('href').startsWith('#')) {
                link.addEventListener('click', () => toggleMobileNav(false));
            }
        });
    }
    
    // Active Nav Link Highlighting for Multi-Page Site
    function updateActiveLinkForMultiPage() {
        if (!navLinks.length) return; 
        const currentPath = window.location.pathname.split('/').pop();
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop();
            const isActive = (linkPath === currentPath) || 
                             (currentPath === '' && (linkPath === 'index_mobile.html' || linkPath === '/')) ||
                             (currentPath === 'index_mobile.html' && (linkPath === '' || linkPath === '/'));
            link.classList.toggle('active-nav-link', isActive);
        });
    }
    updateActiveLinkForMultiPage(); 

    // Smooth Scroll for On-Page Anchors
    const headerHeight = () => siteHeader ? siteHeader.offsetHeight : 0;
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1 && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    let offset = headerHeight();
                    
                    const topLogoContainer = document.getElementById('top-logo-container');
                    let topLogoHeight = 0;
                    if (topLogoContainer) {
                        topLogoHeight = topLogoContainer.offsetHeight;
                    }

                    if (targetId === '#hero' || (targetElement.getBoundingClientRect().top - offset) < 10) { 
                        offset = 0; 
                    } else if (topLogoContainer && targetElement.offsetTop < (topLogoHeight + headerHeight() + 20)) {
                         // Adjust if scrolling to something just below the top logo
                        offset = headerHeight(); // standard offset might be enough
                    }


                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - offset;

                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    if (mobileNav && mobileNav.classList.contains('is-open')) { 
                        toggleMobileNav(false);
                    }
                }
            }
        });
    });

    // Intersection Observer for Animations
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

    // Form Submission (Newsletter on this page)
    const newsletterForm = document.getElementById('newsletterForm'); 
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '' && emailInput.checkValidity()) {
                alert('Thank you for subscribing to Redeeming Time Today!');
                newsletterForm.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Scroll to Top Button
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.classList.toggle('is-visible', window.scrollY > 400);
        });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Update Year in Footers
    const currentYear = new Date().getFullYear();
    const footerYearEl = document.getElementById('footerYear'); 
    if (footerYearEl) {
        footerYearEl.textContent = currentYear.toString();
    }
});