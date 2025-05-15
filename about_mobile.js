document.addEventListener('DOMContentLoaded', () => {
    console.log("About Us page JavaScript loaded.");

    // This page is primarily informational.
    // Global functionalities (preloader, header, nav, animations, parallax)
    // are handled by js/index_mobile.js.

    // Handle Newsletter Form Submission specifically for this page if ID is unique
    const newsletterFormAbout = document.getElementById('newsletterFormAbout');
    if (newsletterFormAbout) {
        newsletterFormAbout.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterFormAbout.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '' && emailInput.checkValidity()) {
                alert('Thank you for subscribing to Redeeming Time Today! (This is a demo feature from about page)');
                newsletterFormAbout.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Update year in about page footer if ID is unique
    const footerYearAbout = document.getElementById('footerYearAbout');
    if (footerYearAbout) {
        footerYearAbout.textContent = new Date().getFullYear().toString();
    }

    // Any About Us page specific interactions can be added here.
    // For example, if you had an interactive timeline or team member bios that expand.
});