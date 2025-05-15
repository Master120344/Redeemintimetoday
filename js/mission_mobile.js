document.addEventListener('DOMContentLoaded', () => {
    const sitePreloader = document.getElementById('sitePreloader');
    const preloaderBar = document.querySelector('.preloader-bar');
    const siteHeader = document.getElementById('siteHeader');
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavCloseBtn = mobileNav ? mobileNav.querySelector('.mobile-nav__close-btn') : null;
    const siteOverlay = document.getElementById('siteOverlay');
    const navLinks = mobileNav ? mobileNav.querySelectorAll('.mobile-nav__link') : [];
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    // --- Site Preloader ---
    if (sitePreloader && preloaderBar) {
        let progress = 0;
        const intervalTime = 30; // Slightly faster interval
        // Simulate loading completion, window.load will be the final trigger
        const interval = setInterval(() => {
            progress += 5; // Faster progress steps
            preloaderBar.style.width = Math.min(progress, 100) + '%';
            if (progress >= 100) {
                clearInterval(interval);
                // Wait for window.load to add 'loaded' class for actual content readiness
            }
        }, intervalTime);

        window.addEventListener('load', () => {
            clearInterval(interval); 
            preloaderBar.style.width = '100%'; // Ensure bar is full
            setTimeout(() => { // Short delay for visual completion
                sitePreloader.classList.add('loaded');
            }, 200); 
        });
    }

    // --- Header Scroll Behavior ---
    let lastScrollY = window.scrollY;
    const headerScrollThreshold = 30; // Reduced threshold for quicker effect
    if (siteHeader) {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > (siteHeader.offsetHeight + headerScrollThreshold)) {
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
        if (!menuToggle || !mobileNav || !siteOverlay) return;
        const isOpen = typeof forceOpen === 'boolean' ? forceOpen : !mobileNav.classList.contains('is-open');
        
        menuToggle.classList.toggle('is-active', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen.toString());
        
        mobileNav.classList.toggle('is-open', isOpen);
        mobileNav.setAttribute('aria-hidden', (!isOpen).toString());
        
        siteOverlay.classList.toggle('is-visible', isOpen);
        document.body.classList.toggle('no-scroll', isOpen);

        if (isOpen) {
            // Optional: Focus the close button or first link when nav opens
            if (mobileNavCloseBtn) mobileNavCloseBtn.focus();
            else if (navLinks.length > 0) navLinks[0].focus();
        } else {
            menuToggle.focus(); // Return focus to menu toggle when nav closes
        }
    }

    if (menuToggle && mobileNav && siteOverlay) {
        menuToggle.addEventListener('click', () => toggleMobileNav());
        if (mobileNavCloseBtn) {
            mobileNavCloseBtn.addEventListener('click', () => toggleMobileNav(false));
        }
        siteOverlay.addEventListener('click', () => toggleMobileNav(false));
        // Close nav on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
                toggleMobileNav(false);
            }
        });
    }
    
    // --- Active Nav Link Highlighting ---
    function updateActiveLink() {
        if (!navLinks.length) return;
        const currentPath = window.location.pathname.split('/').pop() || 'index_mobile.html'; // Default to index if path is '/'
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (!linkHref) return;
            const linkPath = linkHref.split('/').pop() || (linkHref === '/' || linkHref === './' ? 'index_mobile.html' : '');
            link.classList.toggle('active-nav-link', linkPath === currentPath);
        });
    }
    updateActiveLink(); // Call on page load

    // --- Smooth Scroll for On-Page Anchors ---
    // (Not used on this specific page based on HTML, but good to keep for global script consistency)
    const getHeaderHeight = () => siteHeader ? siteHeader.offsetHeight : 0;
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1 && targetId.startsWith('#')) { // Ensure it's not just "#"
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const offsetPosition = targetElement.getBoundingClientRect().top + window.scrollY - getHeaderHeight() - 10; // 10px extra offset

                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    if (mobileNav && mobileNav.classList.contains('is-open')) {
                        toggleMobileNav(false);
                    }
                }
            }
        });
    });

    // --- Intersection Observer for Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1, // Start animation earlier
            rootMargin: "0px 0px -50px 0px" // Trigger sooner when scrolling down
        };
        const animationObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay;
                    if (delay) {
                        setTimeout(() => {
                            entry.target.classList.add('is-visible');
                        }, parseInt(delay.replace('s', '') * 1000));
                    } else {
                        entry.target.classList.add('is-visible');
                    }
                    obs.unobserve(entry.target); // Animate only once
                }
            });
        }, observerOptions);
        animatedElements.forEach(el => animationObserver.observe(el));
    }

    // --- Form Submission (Placeholder for Newsletter) ---
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '' && emailInput.checkValidity()) {
                alert('Thank you for subscribing!'); // Simplified message
                newsletterForm.reset();
            } else {
                alert('Please enter a valid email address.');
                if(emailInput) emailInput.focus();
            }
        });
    }

    // --- Scroll to Top Button ---
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.classList.toggle('is-visible', window.scrollY > 250); // Show a bit earlier
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