document.addEventListener('DOMContentLoaded', () => {
    console.log("Privacy Policy page JavaScript loaded.");

    // This page is primarily informational, so extensive JS might not be needed.
    // Global functionalities (preloader, header, nav, animations for footer if any)
    // are handled by js/index_mobile.js.

    // Handle Newsletter Form Submission specifically for this page if ID is unique
    const newsletterFormPolicy = document.getElementById('newsletterFormPolicy');
    if (newsletterFormPolicy) {
        newsletterFormPolicy.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterFormPolicy.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '' && emailInput.checkValidity()) {
                alert('Thank you for subscribing to Redeeming Time Today! (This is a demo feature from policy page)');
                newsletterFormPolicy.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Update year in policy page footer if ID is unique
    const footerYearPolicy = document.getElementById('footerYearPolicy');
    if (footerYearPolicy) {
        footerYearPolicy.textContent = new Date().getFullYear().toString();
    }
});