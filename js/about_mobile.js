document.addEventListener('DOMContentLoaded', () => {
    // console.log("About Us page JavaScript loaded.");

    // Global functionalities (preloader, header, nav, general animations)
    // are handled by js/index_mobile.js.

    // Handle Newsletter Form Submission specifically for this page
    const newsletterFormAbout = document.getElementById('newsletterFormAbout');
    if (newsletterFormAbout) {
        newsletterFormAbout.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterFormAbout.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '' && emailInput.checkValidity()) {
                alert('Thank you for subscribing to Redeeming Time Today!');
                newsletterFormAbout.reset();
            } else {
                alert('Please enter a valid email address.');
                if (emailInput) {
                    emailInput.focus();
                }
            }
        });
    }
    
    const footerYearAbout = document.getElementById('footerYearAbout');
    if (footerYearAbout) {
        footerYearAbout.textContent = new Date().getFullYear().toString();
    }

    const parallaxSections = document.querySelectorAll('.parallax-section[data-parallax-url]');
    if (parallaxSections.length > 0 && 'IntersectionObserver' in window) {
        parallaxSections.forEach(section => {
            const imageUrl = section.dataset.parallaxUrl;
            if (imageUrl) {
                section.style.backgroundImage = `url(${imageUrl})`;
            }
        });
    }
});