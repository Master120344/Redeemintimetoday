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
            progress += 10; // Simulate loading progress
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
        // Nav links will navigate away, so closing is handled by page load.
        // If any nav links are on-page anchors, uncomment this:
        // navLinks.forEach(link => {
        //     if (link.getAttribute('href').startsWith('#')) {
        //        link.addEventListener('click', () => toggleMobileNav(false));
        //     }
        // });
    }
    
    // --- Active Nav Link Highlighting for Multi-Page Site ---
    function updateActiveLinkForMultiPage() {
        const currentPath = window.location.pathname.split('/').pop();
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop();
            // Handle index_mobile.html as home
            const isActive = (linkPath === currentPath) || (currentPath === '' && (linkPath === 'index_mobile.html' || linkPath === '/'));
            link.classList.toggle('active-nav-link', isActive);
        });
    }
    updateActiveLinkForMultiPage(); // Call on page load

    // --- Smooth Scroll for On-Page Anchors (e.g., Hero scroll indicator) ---
    const headerHeight = () => siteHeader ? siteHeader.offsetHeight : 0;
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // Ensure it's a valid ID selector and not just "#"
            if (targetId.length > 1 && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    let offset = headerHeight();
                     // Special case for hero or elements already at very top
                    if (targetId === '#hero' || targetElement.offsetTop < offset) {
                        offset = 0; 
                    }

                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - offset;

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
    // Note: Original stat counters were in the 'Impact' section, now likely on impact_mobile.html
    // If you add counters to index_mobile.html previews, this code will work for them.
    const statNumbers = document.querySelectorAll('.stat-item__number'); // Make sure class exists on index
    function animateCounter(el, target) {
        let current = 0;
        const duration = 2000;
        const increment = target / (duration / 16); // Aim for ~60fps updates

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
                    // Unobserve after attempting, even if targetVal is bad, to prevent re-trigger
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
            // Basic validation example
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '' && emailInput.checkValidity()) {
                alert('Thank you for subscribing to Redeeming Time Today! (This is a demo feature)');
                newsletterForm.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    // Contact form logic would be on contact_mobile.html's JS

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
    ['navYear', 'footerYear'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = currentYear.toString();
    });

});