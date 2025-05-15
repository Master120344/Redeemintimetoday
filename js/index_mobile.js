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
        const initialLoad = () => {
            if (progress < 100) {
                 progress += Math.floor(Math.random() * 10) + 5; 
                 if (progress > 100) progress = 100;
                 preloaderBar.style.width = progress + '%';
            }
        };
        const interval = setInterval(() => {
            initialLoad();
            if (progress >= 100) {
                clearInterval(interval);
                if (!sitePreloader.classList.contains('loaded')) {
                    setTimeout(() => sitePreloader.classList.add('loaded'), 250); 
                }
            }
        }, 80); 

        window.addEventListener('load', () => {
            clearInterval(interval); 
            progress = 100; 
            preloaderBar.style.width = '100%';
            setTimeout(() => {
                sitePreloader.classList.add('loaded');
            }, 400); 
        });

        setTimeout(() => {
            if (!sitePreloader.classList.contains('loaded')) {
                clearInterval(interval);
                preloaderBar.style.width = '100%';
                sitePreloader.classList.add('loaded');
            }
        }, 4000); 
    }


    // --- Header Scroll Behavior ---
    let lastScrollY = window.scrollY;
    if (siteHeader) {
        window.addEventListener('scroll', () => {
            if (document.body.classList.contains('no-scroll')) return; 

            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > siteHeader.offsetHeight + 50) { 
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

        if (isOpen && siteHeader) {
            siteHeader.classList.remove('header--hidden');
            siteHeader.classList.add('header--scrolled'); 
        }
    }

    if (menuToggle && mobileNav && siteOverlay) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mobileNav.classList.contains('is-open');
            toggleMobileNav(!isOpen);
        });

        siteOverlay.addEventListener('click', () => toggleMobileNav(false));
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => { 
                if (link.getAttribute('href') && (link.getAttribute('href').startsWith('#') || !link.getAttribute('href').startsWith('javascript:'))) {
                    toggleMobileNav(false);
                }
            });
        });
    }
    
    // --- Active Nav Link Highlighting for Multi-Page Site ---
    function updateActiveLinkForMultiPage() {
        if (!navLinks.length) return;

        const currentPagePath = window.location.pathname;
        const currentPageName = currentPagePath.substring(currentPagePath.lastIndexOf('/') + 1) || 'index_mobile.html';

        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (!linkHref) {
                link.classList.remove('active-nav-link');
                return;
            }
            
            let linkPageName = linkHref.substring(linkHref.lastIndexOf('/') + 1);
            if (linkPageName === '' || linkPageName === './') {
                linkPageName = 'index_mobile.html';
            }
            
            let isActive = (currentPageName === linkPageName);
            
            if (currentPageName === 'index_mobile.html' && (linkPageName === 'index_mobile.html' || link.getAttribute('href') === 'index_mobile.html')) {
                 isActive = true;
            }

            link.classList.toggle('active-nav-link', isActive);
        });
    }
    updateActiveLinkForMultiPage(); 

    // --- Smooth Scroll for On-Page Anchors ---
    const getHeaderHeight = () => {
        if (siteHeader && window.getComputedStyle(siteHeader).position === 'fixed') {
            return siteHeader.offsetHeight;
        }
        return 0;
    };
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1 && targetId.startsWith('#')) { 
                try {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        
                        if (mobileNav && mobileNav.classList.contains('is-open')) { 
                            toggleMobileNav(false); 
                        }

                        let offset = getHeaderHeight(); 
                        if (targetId === '#hero' || targetElement.getBoundingClientRect().top + window.scrollY < offset + 20) { 
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
        }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }); 
        animatedElements.forEach(el => observer.observe(el));
    } else {
        animatedElements.forEach(el => el.classList.add('is-visible'));
    }

    // --- Form Submission (Newsletter on this page) ---
    const newsletterForm = document.getElementById('newsletterForm'); 
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            let feedbackMessage = newsletterForm.parentElement.querySelector('.form-feedback');
            if (!feedbackMessage) {
                feedbackMessage = document.createElement('p');
                feedbackMessage.className = 'form-feedback';
                feedbackMessage.style.marginTop = '12px';
                feedbackMessage.style.fontSize = '0.9em';
                feedbackMessage.style.textAlign = 'left'; 
                newsletterForm.parentElement.appendChild(feedbackMessage);
            }
            
            if (emailInput && emailInput.value.trim() !== '' && emailInput.checkValidity()) {
                feedbackMessage.textContent = 'Thank you for subscribing to Redeeming Time Today!';
                feedbackMessage.style.color = 'var(--color-link-bright)'; 
                newsletterForm.reset();
                
                setTimeout(() => {
                    feedbackMessage.style.opacity = '0';
                    setTimeout(() => feedbackMessage.remove(), 500); 
                }, 4000); 
                feedbackMessage.style.opacity = '1'; 
                feedbackMessage.style.transition = 'opacity 0.5s ease';

            } else {
                feedbackMessage.textContent = 'Please enter a valid email address.';
                feedbackMessage.style.color = 'var(--color-accent-dark)'; 
                if(emailInput) emailInput.focus();
                feedbackMessage.style.opacity = '1';
                feedbackMessage.style.transition = 'opacity 0.5s ease';
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
    const footerYearEl = document.getElementById('footerYear'); 
    if (footerYearEl) {
        footerYearEl.textContent = currentYear.toString();
    }
});