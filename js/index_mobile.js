document.addEventListener('DOMContentLoaded', () => {
    const sitePreloader = document.getElementById('sitePreloader');
    const preloaderBar = document.querySelector('.preloader-bar');
    const siteHeader = document.getElementById('siteHeader');
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const siteOverlay = document.getElementById('siteOverlay');
    const navLinks = mobileNav ? mobileNav.querySelectorAll('.mobile-nav__link') : []; 
    const mobileNavCloseBtn = mobileNav ? mobileNav.querySelector('.mobile-nav__close-btn') : null; // Added close button
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    // Site Preloader
    if (sitePreloader && preloaderBar) {
        let progress = 0;
        const intervalTime = 50; // ms
        const totalSteps = 100 / 10; // Assuming progress increases by 10

        const interval = setInterval(() => {
            progress += 10; 
            preloaderBar.style.width = progress + '%';
            if (progress >= 100) {
                clearInterval(interval);
                // Don't hide here, let window.load handle it for a more accurate load feel
            }
        }, intervalTime);

        window.addEventListener('load', () => {
            clearInterval(interval); // Clear interval if not already cleared
            preloaderBar.style.width = '100%'; // Ensure it's 100%
            setTimeout(() => {
                sitePreloader.classList.add('loaded');
            }, 250); // Delay after bar hits 100% on load
        });

        // Fallback if load event is too slow or preloader finishes too fast
        setTimeout(() => {
            if (progress < 100) {
                clearInterval(interval);
                preloaderBar.style.width = '100%';
            }
            if (!sitePreloader.classList.contains('loaded')) {
                 setTimeout(() => sitePreloader.classList.add('loaded'), 200);
            }
        }, (totalSteps * intervalTime) + 500); // Max preloader time + buffer
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
        }, { passive: true });
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

        if (mobileNavCloseBtn) { // Added event listener for new close button
            mobileNavCloseBtn.addEventListener('click', () => toggleMobileNav(false));
        }

        siteOverlay.addEventListener('click', () => toggleMobileNav(false));
        
        navLinks.forEach(link => {
            // Close nav for any link click, whether it's an anchor or a new page
            link.addEventListener('click', (e) => {
                if (!link.getAttribute('href').startsWith('#') || (link.getAttribute('href').length > 1 && document.querySelector(link.getAttribute('href')))) {
                    // If it's not a simple "#" or if it's an anchor that exists on page, allow smooth scroll to handle, then close.
                    // For actual page navigation, it will close and navigate.
                    // For on-page anchors, smooth scroll logic below will also close it.
                    // This ensures closure for links leading to other pages directly.
                    if (!link.getAttribute('href').startsWith('#')) {
                         toggleMobileNav(false);
                    }
                    // Smooth scroll part will handle closing for # links
                }
            });
        });
    }
    
    // Active Nav Link Highlighting for Multi-Page Site
    function updateActiveLinkForMultiPage() {
        if (!navLinks.length) return; 
        const currentPath = window.location.pathname.split('/').pop();
        const homeFilenames = ['index_mobile.html', '']; // Handles both "index_mobile.html" and "/"

        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (!linkHref) return;
            const linkPath = linkHref.split('/').pop();
            
            let isActive = (linkPath === currentPath);

            if (homeFilenames.includes(currentPath) && homeFilenames.includes(linkPath)) {
                isActive = true;
            }
            // Special case for root if index_mobile.html is home
            if (currentPath === '' && linkPath === 'index_mobile.html') isActive = true;
            if (currentPath === 'index_mobile.html' && linkPath === '') isActive = true;


            link.classList.toggle('active-nav-link', isActive);
        });
    }
    updateActiveLinkForMultiPage(); 

    // Smooth Scroll for On-Page Anchors
    const headerHeight = () => siteHeader ? siteHeader.offsetHeight : 0;
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1 && targetId.startsWith('#')) { // Ensure it's not just "#"
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    
                    let offset = headerHeight();
                    // No special offset logic needed for general anchor scroll with fixed header
                    // The previous complex offset logic for hero/toplogo might not be necessary if headerHeight is consistent
                    
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - offset;

                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    
                    // Close mobile nav if it's open after clicking an anchor link
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
        const observerOptions = {
            threshold: 0.1, // Start animation when 10% of element is visible
            rootMargin: "0px 0px -50px 0px" // Trigger a bit sooner when scrolling down
        };
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Apply delay if specified
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
        animatedElements.forEach(el => observer.observe(el));
    }

    // Form Submission (Newsletter on this page)
    const newsletterForm = document.getElementById('newsletterForm'); 
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '' && emailInput.checkValidity()) {
                // Consider a more subtle notification than alert
                console.log('Newsletter subscribed:', emailInput.value);
                alert('Thank you for subscribing to Redeeming Time Today!');
                newsletterForm.reset();
            } else {
                alert('Please enter a valid email address.');
                if(emailInput) emailInput.focus();
            }
        });
    }

    // Scroll to Top Button
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.classList.toggle('is-visible', window.scrollY > 400);
        }, { passive: true });
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