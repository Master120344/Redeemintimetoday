document.addEventListener('DOMContentLoaded', () => {
    const siteLoader = document.getElementById('siteLoader');
    const siteHeader = document.getElementById('siteHeader');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobileNav');
    const navLinks = mobileNav.querySelectorAll('.nav-link');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const mainContent = document.getElementById('main-content'); // To handle body scroll lock

    // --- Site Loader ---
    if (siteLoader) {
        window.addEventListener('load', () => {
            setTimeout(() => { // Ensure all assets are truly loaded
                siteLoader.classList.add('hidden');
            }, 500); // Small delay for smoother transition
        });
    }
    
    // --- Header Scroll Behavior ---
    let lastScrollTop = 0;
    if (siteHeader) {
        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && scrollTop > siteHeader.offsetHeight) {
                // Scroll Down
                siteHeader.classList.add('header-hidden');
            } else {
                // Scroll Up
                siteHeader.classList.remove('header-hidden');
            }
            if (scrollTop > 50) {
                siteHeader.classList.add('header-scrolled');
            } else {
                siteHeader.classList.remove('header-scrolled');
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
        }, false);
    }

    // --- Mobile Navigation Toggle ---
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            const isActive = mobileNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isActive);
            document.body.classList.toggle('nav-open', isActive);
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('nav-open');
            });
        });
    }

    // --- Active Nav Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('main section[id]');
    function updateActiveNavLink() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - siteHeader.offsetHeight - 50)) { // Adjusted offset
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active-link');
            }
        });
    }
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call

    // --- Smooth Scroll for All Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            if (hrefAttribute.length > 1 && hrefAttribute.startsWith('#')) {
                const targetElement = document.querySelector(hrefAttribute);
                if (targetElement) {
                    e.preventDefault();
                    let offset = siteHeader ? siteHeader.offsetHeight : 0;
                    // Special case for hero, no offset
                    if (hrefAttribute === '#hero') {
                        offset = 0;
                    }
                    
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Close nav if open and it's a nav link
                    if (mobileNav.classList.contains('active') && this.classList.contains('nav-link')) {
                        mobileNav.classList.remove('active');
                        menuToggle.classList.remove('active');
                        menuToggle.setAttribute('aria-expanded', 'false');
                        document.body.classList.remove('nav-open');
                    }
                }
            }
        });
    });

    // --- Intersection Observer for Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animationType = entry.target.dataset.animation || 'fade-in-up'; // Default animation
                    entry.target.classList.add('is-visible', animationType);
                    observer.unobserve(entry.target); // Animate only once
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% of the element is visible
            rootMargin: "0px 0px -50px 0px" // Adjust root margin to trigger a bit earlier
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // --- Parallax Background Effect ---
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    parallaxBgs.forEach(bg => {
        const imageUrl = bg.dataset.parallaxBg;
        if (imageUrl) {
            bg.style.backgroundImage = `url(${imageUrl})`;
        }
    });
    // More sophisticated parallax on scroll (optional, can be performance heavy on mobile)
    // window.addEventListener('scroll', () => {
    //     parallaxBgs.forEach(bg => {
    //         const speed = parseFloat(bg.dataset.parallaxSpeed) || 0.3;
    //         const yPos = -(window.pageYOffset - bg.offsetTop) * speed;
    //         bg.style.backgroundPosition = `center ${yPos}px`;
    //     });
    // });


    // --- Testimonial Carousel ---
    const carousel = document.querySelector('.testimonial-carousel');
    if (carousel) {
        const slides = carousel.querySelectorAll('.testimonial-slide');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        let currentIndex = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
        }

        if (prevBtn && nextBtn && slides.length > 0) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                showSlide(currentIndex);
            });
    
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % slides.length;
                showSlide(currentIndex);
            });
    
            showSlide(currentIndex); // Initial display

            // Autoplay (optional)
            // setInterval(() => {
            //     nextBtn.click();
            // }, 5000);
        }
    }

    // --- Animated Number Counters ---
    const statNumbers = document.querySelectorAll('.stat-number');
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100; // Adjust speed by changing 100
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            element.textContent = Math.ceil(current);
        }, 20); // Adjust interval for speed
    }

    if (statNumbers.length > 0) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const targetValue = parseInt(entry.target.dataset.target);
                    animateCounter(entry.target, targetValue);
                    entry.target.classList.add('counted'); // Mark as counted
                    statObserver.unobserve(entry.target); // Animate only once
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => {
            statObserver.observe(stat);
        });
    }
    
    // --- Contact Form & Newsletter Form (Placeholder Submission) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real app, you'd send data to a server here
            alert('Thank you for your message! (This is a demo)');
            this.reset();
        });
    }
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing! (This is a demo)');
            this.reset();
        });
    }

    // --- Scroll to Top Button ---
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Update Year in Footer & Nav ---
    const currentYear = new Date().getFullYear();
    const footerYearSpan = document.getElementById('footer-year');
    const navYearSpan = document.getElementById('nav-year');
    if (footerYearSpan) footerYearSpan.textContent = currentYear;
    if (navYearSpan) navYearSpan.textContent = currentYear;

});