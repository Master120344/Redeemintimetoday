document.addEventListener('DOMContentLoaded', () => {
    // console.log("About Us page JavaScript loaded."); // Kept for debugging, can be removed

    // Global functionalities (preloader, header, nav, general animations)
    // are handled by js/index_mobile.js.

    // Handle Newsletter Form Submission specifically for this page
    const newsletterFormAbout = document.getElementById('newsletterFormAbout');
    if (newsletterFormAbout) {
        newsletterFormAbout.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterFormAbout.querySelector('input[type="email"]'); // Ensure class is used if that's preferred
            if (emailInput && emailInput.value.trim() !== '' && emailInput.checkValidity()) {
                // Consider a more user-friendly notification than an alert for production
                alert('Thank you for subscribing to Redeeming Time Today!');
                newsletterFormAbout.reset();
            } else {
                alert('Please enter a valid email address.');
                if (emailInput) { // Focus if input exists
                    emailInput.focus();
                }
            }
        });
    }
    
    // Update year in about page footer if ID is unique
    // If the ID is not unique and uses a global footer, this should be handled in index_mobile.js
    const footerYearAbout = document.getElementById('footerYearAbout');
    if (footerYearAbout) {
        footerYearAbout.textContent = new Date().getFullYear().toString();
    }

    // Parallax effect for .about-values-section if data-parallax-url is set
    // This is a simple JS-driven parallax if CSS 'background-attachment: fixed' isn't sufficient or desired.
    // For now, relying on CSS `background-attachment: fixed;` in about_mobile.css for simplicity.
    // If more advanced parallax is needed, it can be added here or to the global script.
    const parallaxSections = document.querySelectorAll('.parallax-section[data-parallax-url]');
    if (parallaxSections.length > 0 && 'IntersectionObserver' in window) {
        parallaxSections.forEach(section => {
            const imageUrl = section.dataset.parallaxUrl;
            if (imageUrl) {
                section.style.backgroundImage = `url(${imageUrl})`;
                // `background-attachment: fixed;` is now handled in CSS directly for these sections
            }
        });
    }

    // Any About Us page specific dynamic interactions can be added here.
    // For example, if you had an interactive timeline or team member bios that expand.
});