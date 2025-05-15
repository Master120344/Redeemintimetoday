document.addEventListener('DOMContentLoaded', () => {
    console.log("Our Programs page JavaScript loaded.");

    // This page is primarily informational.
    // Global functionalities (preloader, header, nav, animations)
    // are handled by js/index_mobile.js.

    // Handle Newsletter Form Submission specifically for this page if ID is unique
    const newsletterFormPrograms = document.getElementById('newsletterFormPrograms');
    if (newsletterFormPrograms) {
        newsletterFormPrograms.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterFormPrograms.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '' && emailInput.checkValidity()) {
                alert('Thank you for subscribing to Redeeming Time Today program updates!');
                newsletterFormPrograms.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Update year in programs page footer if ID is unique
    const footerYearPrograms = document.getElementById('footerYearPrograms');
    if (footerYearPrograms) {
        footerYearPrograms.textContent = new Date().getFullYear().toString();
    }

    // Any Our Programs page specific interactions can be added here.
});