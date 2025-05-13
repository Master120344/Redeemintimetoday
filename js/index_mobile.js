document.addEventListener('DOMContentLoaded', () => {
    const sitePreloader = document.getElementById('sitePreloader');
    const preloaderBar = document.querySelector('.preloader-bar');
    const siteHeader = document.getElementById('siteHeader');
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const siteOverlay = document.getElementById('siteOverlay');
    const navLinks = mobileNav.querySelectorAll('.mobile-nav__link');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const mainContent = document.getElementById('mainContent');
    const parallaxSections = document.querySelectorAll('.parallax-section');

    // --- Site Preloader ---
    if (sitePreloader && preloaderBar) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10; // Simulate loading progress
            preloaderBar.style.width = progress + '%';
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => sitePreloader.classList.add('loaded'), 200); // Wait for bar to fill
            }
        }, 50); // Adjust timing as needed

        window.addEventListener('load', () => { // Fallback for actual load
            clearInterval(interval);
            preloaderBar.style.width = '100%';
            setTimeout(() => {
                sitePreloader.classList.add('loaded');
            }, 300); // Ensure animation finishes
        });
    }

    // --- Header Scroll Behavior ---
    let lastScrollY = window.scrollY;
    if (siteHeader) {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > siteHeader.offsetHeight) {
                siteHeader.classList.add('header--hidden'); // Hide on scroll down
            } else {
                siteHeader.classList.remove('header--hidden'); // Show on scroll up
            }
            siteHeader.classList.toggle('header--scrolled', currentScrollY > 50);
            lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
        });
    }

    // --- Mobile Navigation ---
    function toggleMobileNav(isOpen) {
        menuToggle.classList.toggle('is-active', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen);
        mobileNav.classList.toggle('is-open', isOpen);
        mobileNav.setAttribute('aria-hidden', !isOpen);
        siteOverlay.classList.toggle('is-visible', isOpen);
        document.body.classList.toggle('no-scroll', isOpen);
    }

    if (menuToggle && mobileNav && siteOverlay) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mobileNav.classList.contains('is-open');
            toggleMobileNav(!isOpen);
        });

        siteOverlay.addEventListener('click', () => toggleMobileNav(false));
        navLinks.forEach(link => link.addEventListener('click', () => toggleMobileNav(false)));
    }
    
    // --- Smooth Scroll & Active Nav Link Highlighting ---
    const headerHeight = () => siteHeader ? siteHeader.offsetHeight : 0;
    const sections = Array.from(document.querySelectorAll('main section[id]'));

    function updateActiveLink() {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + headerHeight() + 50; // Offset by header + a bit

        for (const section of sections) {
            if (section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
                currentSectionId = section.id;
                break;
            }
        }
        // If no section is active (e.g., at the very top or bottom), fallback or clear
        if (!currentSectionId && window.scrollY < sections[0]?.offsetTop) {
            currentSectionId = sections[0]?.id; // Default to first section if near top
        }

        navLinks.forEach(link => {
            link.classList.toggle('active-nav-link', link.getAttribute('href') === `#${currentSectionId}`);
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                let offset = headerHeight();
                if (targetId === '#hero') offset = 0; // No offset for hero

                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - offset;

                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                if (mobileNav.classList.contains('is-open')) toggleMobileNav(false);
            }
        });
    });
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call

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
    // Note: True CSS parallax (`background-attachment: fixed;`) is used.
    // JS-based parallax can be added here if more complex effects are needed,
    // but be mindful of mobile performance.

    // --- Testimonial Slider ---
    const slider = document.getElementById('testimonialSlider');
    if (slider) {
        const wrapper = slider.querySelector('.testimonial-slider__wrapper');
        const slides = Array.from(wrapper.querySelectorAll('.testimonial-slide'));
        const prevBtn = slider.querySelector('.slider-control--prev');
        const nextBtn = slider.querySelector('.slider-control--next');
        let currentIndex = 0;
        let slideInterval;

        function updateSlider() {
            wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
            slides.forEach((slide, index) => {
                slide.classList.toggle('is-active-slide', index === currentIndex);
            });
            if(prevBtn) prevBtn.disabled = currentIndex === 0;
            if(nextBtn) nextBtn.disabled = currentIndex === slides.length - 1;
        }

        function nextSlide() {
            if (currentIndex < slides.length - 1) currentIndex++; else currentIndex = 0; // Loop
            updateSlider();
        }
        
        function prevSlide() {
            if (currentIndex > 0) currentIndex--; else currentIndex = slides.length - 1; // Loop
            updateSlider();
        }

        if(nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
        if(prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
        
        function startInterval() {
            slideInterval = setInterval(nextSlide, 7000); // Autoplay every 7 seconds
        }
        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        if (slides.length > 0) {
             updateSlider(); // Initial setup
             startInterval(); // Start autoplay
        }
    }
    
    // --- Animated Number Counters ---
    const statNumbers = document.querySelectorAll('.stat-item__number');
    function animateCounter(el, target) {
        let current = 0;
        const duration = 2000; // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / target));
        const timer = setInterval(() => {
            current += 1;
            el.textContent = current;
            if (current === target) clearInterval(timer);
        }, stepTime < 1 ? 1 : stepTime); // Ensure stepTime is at least 1ms
    }

    if (statNumbers.length > 0) {
        const statObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const targetVal = parseInt(entry.target.dataset.target);
                    animateCounter(entry.target, targetVal);
                    entry.target.classList.add('counted');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.6 });
        statNumbers.forEach(stat => statObserver.observe(stat));
    }

    // --- Form Submission (Placeholder) ---
    ['contactForm', 'newsletterForm'].forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Thank you for your submission! (This is a demo feature)');
                form.reset();
            });
        }
    });

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
        if (el) el.textContent = currentYear;
    });

});