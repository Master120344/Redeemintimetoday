document.addEventListener('DOMContentLoaded', () => {
    console.log("Success Stories page JavaScript loaded.");

    // This page is primarily informational.
    // Global functionalities (preloader, header, nav, animations)
    // are handled by js/index_mobile.js.

    // Handle Newsletter Form Submission specifically for this page if ID is unique
    const newsletterFormSuccess = document.getElementById('newsletterFormSuccess');
    if (newsletterFormSuccess) {
        newsletterFormSuccess.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterFormSuccess.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '' && emailInput.checkValidity()) {
                alert('Thank you for subscribing to Redeeming Time Today updates!');
                newsletterFormSuccess.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Update year in success stories page footer if ID is unique
    const footerYearSuccess = document.getElementById('footerYearSuccess');
    if (footerYearSuccess) {
        footerYearSuccess.textContent = new Date().getFullYear().toString();
    }

    // Any Success Stories page specific interactions can be added here.
    // For example, if you implement a filter for story categories or a "load more" feature.
});