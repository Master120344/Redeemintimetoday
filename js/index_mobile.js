document.addEventListener('DOMContentLoaded', () => {
    const sitePreloader = document.getElementById('sitePreloader');
    const preloaderBar = document.querySelector('.preloader-bar');
    const siteHeader = document.getElementById('siteHeader');
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const siteOverlay = document.getElementById('siteOverlay');
    const navLinks = mobileNav ? mobileNav.querySelectorAll('.mobile-nav__link') : []; 
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    // --- Site Preloader ---
    if (sitePreloader && preloaderBar) {
        let progress = 0;
        // Fallback for quick load or if window.load fires too fast
        const initialLoad = () => {
            if (progress < 100) {
                 progress += 10; 
                 preloaderBar.style.width = progress + '%';
            }
        };
        const interval = setInterval(() => {
            initialLoad();
            if (progress >= 100) {
                clearInterval(interval);
                // Ensure loaded class is added even if window.load was missed or fast
                if (!sitePreloader.classList.contains('loaded')) {
                    setTimeout(() => sitePreloader.classList.add('loaded'), 200);
                }
            }
        }, 50); // Reduced interval for quicker visual progress

        window.addEventListener('load', () => {
            clearInterval(interval); // Clear our interval
            progress = 100; // Force to 100%
            preloaderBar.style.width = '100%';
            setTimeout(() => {
                sitePreloader.classList.add('loaded');
            }, 300); // Delay to allow 100% bar to be seen briefly
        });

        // Safety net: if load event somehow fails or is extremely delayed
        setTimeout(() => {
            if (!sitePreloader.classList.contains('loaded')) {
                clearInterval(interval);
                preloaderBar.style.width = '100%';
                sitePreloader.classList.add('loaded');
            }
        }, 3000); // Max wait 3 seconds
    }


    // --- Header Scroll Behavior ---
    let lastScrollY = window.scrollY;
    if (siteHeader) {
        window.addEventListener('scroll', () => {
            if (document.body.classList.contains('no-scroll')) return; // Don't change header if nav is open

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

    // --- Mobile Navigation ---
    function toggleMobileNav(isOpen) {
        if (menuToggle) menuToggle.classList.toggle('is-active', isOpen);
        if (menuToggle) menuToggle.setAttribute('aria-expanded', isOpen.toString());
        if (mobileNav) mobileNav.classList.toggle('is-open', isOpen);
        if (mobileNav) mobileNav.setAttribute('aria-hidden', (!isOpen).toString());
        if (siteOverlay) siteOverlay.classList.toggle('is-visible', isOpen);
        document.body.classList.toggle('no-scroll', isOpen);

        // If opening the nav, ensure header is not hidden
        if (isOpen && siteHeader) {
            siteHeader.classList.remove('header--hidden');
        }
    }

    if (menuToggle && mobileNav && siteOverlay) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mobileNav.classList.contains('is-open');
            toggleMobileNav(!isOpen);
        });

        siteOverlay.addEventListener('click', () => toggleMobileNav(false));
        navLinks.forEach(link => {
            // Close nav for any link click, not just non-anchor ones for a dropdown
            link.addEventListener('click', () => {
                // If it's not an on-page anchor link, or if it is but we always want to close
                // For a dropdown menu, it's common to always close.
                // The smooth scroll part will handle scrolling after close.
                toggleMobileNav(false);
            });
        });
    }
    
    // --- Active Nav Link Highlighting for Multi-Page Site ---
    function updateActiveLinkForMultiPage() {
        if (!navLinks.length) return; 
        const currentPath = window.location.pathname.split('/').pop() || 'index_mobile.html'; // Default to index if path is empty
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (!linkHref) return;
            const linkPath = linkHref.split('/').pop();

            // More robust check for active link
            let isActive = (linkPath === currentPath);
            
            // Handle cases like '/' or 'index.html' for home page
            if ((currentPath === 'index_mobile.html' || currentPath === '') && (linkPath === 'index_mobile.html' || linkPath === '' || linkPath === './')) {
                 isActive = true;
            }
            // Check if current path ends with link path (e.g. /folder/page.html and page.html)
            if (window.location.pathname.endsWith(linkHref)){
                isActive = true;
            }

            link.classList.toggle('active-nav-link', isActive);
        });
    }
    updateActiveLinkForMultiPage(); 

    // --- Smooth Scroll for On-Page Anchors ---
    const headerHeight = () => (siteHeader && !siteHeader.classList.contains('header--hidden')) ? siteHeader.offsetHeight : 0;
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1 && targetId.startsWith('#')) { // Ensure it's a valid ID selector
                try {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        
                        // If mobile nav is open, close it first. The scroll might be slightly delayed.
                        // Or, calculate position immediately.
                        if (mobileNav && mobileNav.classList.contains('is-open')) { 
                            toggleMobileNav(false); // This might trigger a layout change
                        }

                        // Recalculate offset *after* potential nav close
                        let offset = headerHeight(); 
                        if (targetId === '#hero' || targetElement.offsetTop < offset) { // If target is hero or above where header would obscure it
                            offset = 0; 
                        }
    
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.scrollY - offset;
    
                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                } catch (error) {
                    console.warn("Smooth scroll target not found or invalid selector:", targetId, error);
                }
            }
        });
    });

    // --- Intersection Observer for Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add delay if data-delay attribute is present
                    const delay = entry.target.dataset.delay;
                    if (delay) {
                        setTimeout(() => {
                            entry.target.classList.add('is-visible');
                        }, parseFloat(delay) * 1000);
                    } else {
                        entry.target.classList.add('is-visible');
                    }
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }); // Trigger a bit earlier
        animatedElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers or if no elements to animate
        animatedElements.forEach(el => el.classList.add('is-visible'));
    }

    // --- Form Submission (Newsletter on this page) ---
    const newsletterForm = document.getElementById('newsletterForm'); 
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const feedbackMessage = document.createElement('p'); // For better feedback
            feedbackMessage.style.marginTop = '10px';
            feedbackMessage.style.fontSize = '0.9em';

            // Clear previous messages
            const existingFeedback = newsletterForm.parentElement.querySelector('.form-feedback');
            if (existingFeedback) existingFeedback.remove();
            
            feedbackMessage.className = 'form-feedback';


            if (emailInput && emailInput.value.trim() !== '' && emailInput.checkValidity()) {
                // Simulate submission
                feedbackMessage.textContent = 'Thank you for subscribing to Redeeming Time Today!';
                feedbackMessage.style.color = 'var(--color-accent-light)'; // Or a success color
                newsletterForm.parentElement.appendChild(feedbackMessage);
                newsletterForm.reset();
                
                setTimeout(() => feedbackMessage.remove(), 4000); // Remove after a few seconds

            } else {
                feedbackMessage.textContent = 'Please enter a valid email address.';
                feedbackMessage.style.color = 'var(--color-accent-dark)'; // Or an error color
                newsletterForm.parentElement.appendChild(feedbackMessage);
                if(emailInput) emailInput.focus();
            }
        });
    }

    // --- Scroll to Top Button ---
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.classList.toggle('is-visible', window.scrollY > 400);
        }, { passive: true });
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
});