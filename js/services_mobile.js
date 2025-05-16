<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Our Services - Redeeming Time Today</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="css/services_mobile.css"> <!-- Specific CSS for this page -->
</head>
<body>

    <div class="site-preloader" id="sitePreloader">
        <div class="preloader-logo">
            <svg viewBox="0 0 200 70" xmlns="http://www.w3.org/2000/svg" width="160" height="56" aria-label="Redeeming Time Today Preloader Logo">
                <style>
                    .preloader-text {
                        font-family: 'Merriweather', serif;
                        font-weight: bold;
                        fill: var(--color-text-on-dark, #ECF0F1); /* Fallback color */
                        text-anchor: middle;
                    }
                </style>
                <text x="100" y="30" class="preloader-text" font-size="16">Redeeming Time</text>
                <text x="100" y="55" class="preloader-text" font-size="16">Today</text>
            </svg>
        </div>
        <div class="preloader-progress"><div class="preloader-bar"></div></div>
    </div>

    <header class="site-header" id="siteHeader">
        <div class="container header__container">
            <a href="index_mobile.html" class="header__logo-text-link" aria-label="Redeeming Time Today Home">
                Redeeming Time Today
            </a>
            <button id="menuToggle" class="header__menu-toggle" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobileNav">
                <span class="menu-toggle__bar"></span>
                <span class="menu-toggle__bar"></span>
                <span class="menu-toggle__bar"></span>
            </button>
        </div>
    </header>

    <nav class="mobile-nav" id="mobileNav" aria-hidden="true" aria-labelledby="mobileNavHeading">
        <h2 id="mobileNavHeading" class="sr-only">Main Navigation</h2>
        <button class="mobile-nav__close-btn" aria-label="Close navigation menu">
            <i class="fas fa-times"></i>
        </button>
        <ul class="mobile-nav__list">
            <li><a href="index_mobile.html" class="mobile-nav__link">Home</a></li>
            <li><a href="about_mobile.html" class="mobile-nav__link">About Us</a></li>
            <li><a href="mission_mobile.html" class="mobile-nav__link">Our Mission</a></li>
            <li><a href="services_mobile.html" class="mobile-nav__link">Services</a></li>
            <li><a href="impact_mobile.html" class="mobile-nav__link">Impact</a></li>
            <li><a href="events_mobile.html" class="mobile-nav__link">Events</a></li>
            <li><a href="shop_mobile.html" class="mobile-nav__link">Shop</a></li>
            <li><a href="donate_mobile.html" class="mobile-nav__link">Donate</a></li>
            <li><a href="get_involved_mobile.html" class="mobile-nav__link">Get Involved</a></li>
            <li><a href="contact_mobile.html" class="mobile-nav__link">Contact</a></li>
        </ul>
        <div class="mobile-nav__footer">
            <p>© <span id="navYear"></span> Redeeming Time Today. Every Moment Counts.</p>
        </div>
    </nav>

    <div class="site-overlay" id="siteOverlay" tabindex="-1"></div>

    <main id="mainContent">

        <section class="page-hero services-hero">
            <!-- Overlay is part of the CSS background for services-hero -->
            <div class="container page-hero__content">
                <h1 class="page-hero__title animate-on-scroll" data-animation="fade-in-up">Our Services</h1>
                <p class="page-hero__subtitle animate-on-scroll" data-animation="fade-in-up" data-delay="0.15s">Empowering individuals and communities through dedicated support and transformative programs.</p>
            </div>
        </section>

        <section id="services-overview" class="section services-overview-section">
            <div class="container">
                <div class="section__header animate-on-scroll" data-animation="fade-in">
                    <span class="section__kicker">How We Help</span>
                    <h2 class="section__title">Pathways to Empowerment</h2>
                    <p class="section__intro-text">Redeeming Time Today offers a range of services designed to meet diverse needs, fostering growth, recovery, and reintegration. Our programs are built on compassion, expertise, and a commitment to lasting positive change.</p>
                </div>

                <div class="services-grid">
                    <article class="service-card animate-on-scroll" data-animation="scale-up" data-delay="0s">
                        <div class="service-card__icon-wrapper" aria-hidden="true"><i class="fas fa-people-roof service-card__icon"></i></div>
                        <h3 class="service-card__title">Community Reintegration</h3>
                        <p class="service-card__description">Comprehensive support for individuals transitioning back into society after incarceration or periods of hardship. We focus on housing, employment, and building stable community connections.</p>
                    </article>

                    <article class="service-card animate-on-scroll" data-animation="scale-up" data-delay="0.1s">
                        <div class="service-card__icon-wrapper" aria-hidden="true"><i class="fas fa-user-graduate service-card__icon"></i></div>
                        <h3 class="service-card__title">Youth Mentorship</h3>
                        <p class="service-card__description">Guiding young minds towards positive life choices, academic success, and personal development. Our mentorship programs provide role models and a supportive network for youth.</p>
                    </article>

                    <article class="service-card animate-on-scroll" data-animation="scale-up" data-delay="0.2s">
                        <div class="service-card__icon-wrapper" aria-hidden="true"><i class="fas fa-hand-holding-heart service-card__icon"></i></div>
                        <h3 class="service-card__title">Recovery & Support Services</h3>
                        <p class="service-card__description">Compassionate assistance and resources for individuals overcoming addiction and other life challenges. We offer support groups, counseling referrals, and pathways to recovery.</p>
                    </article>

                    <article class="service-card animate-on-scroll" data-animation="scale-up" data-delay="0.3s">
                        <div class="service-card__icon-wrapper" aria-hidden="true"><i class="fas fa-brain service-card__icon"></i></div>
                        <h3 class="service-card__title">Holistic Development Programs</h3>
                        <p class="service-card__description">Workshops and programs focused on mental, physical, and spiritual well being. These include life skills training, wellness activities, and spiritual guidance to foster overall growth.</p>
                    </article>

                    <article class="service-card animate-on-scroll" data-animation="scale-up" data-delay="0.4s">
                        <div class="service-card__icon-wrapper" aria-hidden="true"><i class="fas fa-briefcase service-card__icon"></i></div>
                        <h3 class="service-card__title">Job Readiness & Skills Training</h3>
                        <p class="service-card__description">Equipping individuals with the necessary skills and confidence to find and maintain meaningful employment. This includes resume building, interview coaching, and vocational training connections.</p>
                    </article>

                    <article class="service-card animate-on-scroll" data-animation="scale-up" data-delay="0.5s">
                        <div class="service-card__icon-wrapper" aria-hidden="true"><i class="fas fa-hands-helping service-card__icon"></i></div>
                        <h3 class="service-card__title">Volunteer Coordination</h3>
                        <p class="service-card__description">Connecting passionate volunteers with opportunities to serve within Redeeming Time Today and our partner organizations, amplifying our collective impact on the community.</p>
                    </article>
                </div>
            </div>
        </section>

        <section id="services-cta" class="section cta-section services-cta-section">
             <!-- Overlay is part of the CSS background for services-cta-section -->
            <div class="container cta-content animate-on-scroll" data-animation="fade-in-up">
                <h2 class="cta-title cta-title--light">Ready to Make a Change?</h2>
                <p class="cta-text cta-text--light">Whether you are seeking support or looking to offer your help, Redeeming Time Today is here. Reach out to learn more about our services or how you can contribute to our mission.</p>
                <div class="cta-buttons">
                    <a href="contact_mobile.html" class="btn btn--light-on-dark">Contact Us <i class="fas fa-envelope btn__icon"></i></a>
                    <a href="get_involved_mobile.html" class="btn btn--outline-light">Get Involved <i class="fas fa-arrow-right btn__icon"></i></a>
                </div>
            </div>
        </section>

    </main>

    <footer class="site-footer">
        <div class="container footer__container">
            <div class="footer__main">
                <div class="footer__about">
                    <svg class="footer__logo-svg" viewBox="0 0 220 40" xmlns="http://www.w3.org/2000/svg" aria-label="Redeeming Time Today Footer Logo">
                         <style>
                            .footer-logo-text {
                                font-family: 'Merriweather', serif;
                                font-size: 15px;
                                fill: var(--color-text-on-dark, #ECF0F1); /* Fallback color */
                                font-weight: bold;
                                text-anchor: middle;
                            }
                        </style>
                        <text x="110" y="28" class="footer-logo-text">Redeeming Time Today</text>
                    </svg>
                    <p>Empowering change, one moment at a time. Join Redeeming Time Today in building a community of hope and purpose.</p>
                     <div class="footer__social-links">
                        <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" aria-label="X (formerly Twitter)"><i class="fab fa-x-twitter"></i></a>
                        <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div class="footer__links">
                    <h4>Explore More</h4>
                    <ul>
                        <li><a href="about_mobile.html">About Us</a></li>
                        <li><a href="mission_mobile.html">Our Mission</a></li>
                        <li><a href="services_mobile.html">Services</a></li>
                        <li><a href="impact_mobile.html">Impact</a></li>
                        <li><a href="events_mobile.html">Events</a></li>
                        <li><a href="shop_mobile.html">Shop</a></li>
                        <li><a href="donate_mobile.html">Donate</a></li>
                        <li><a href="privacy_policy_mobile.html">Privacy Policy</a></li>
                        <li><a href="faq_mobile.html">FAQ</a></li>
                    </ul>
                </div>
                <div class="footer__newsletter">
                    <h4>Stay Connected</h4>
                    <p class="footer__newsletter-text">Get updates from Redeeming Time Today on our work and stories of transformation.</p>
                    <form id="newsletterFormServices" class="newsletter-form">
                        <label for="newsletterEmailServices" class="sr-only">Email for newsletter</label>
                        <input type="email" id="newsletterEmailServices" name="newsletter_email_services" placeholder="Your email address" required class="newsletter-form__input">
                        <button type="submit" class="btn btn--accent newsletter-form__button">Subscribe</button>
                    </form>
                </div>
            </div>
            <div class="footer__bottom">
                <p>© <span id="footerYear"></span> Redeeming Time Today. All Rights Reserved.</p>
            </div>
        </div>
    </footer>

    <button id="scrollTopBtn" class="scroll-top-btn" aria-label="Scroll to top of page">
        <i class="fas fa-arrow-up"></i>
    </button>

    <script src="js/services_mobile.js"></script> <!-- Specific JS for this page -->
</body>
</html>