document.addEventListener('DOMContentLoaded', () => {
    console.log("Meetings page JavaScript loaded.");

    // Handle Newsletter Form Submission specifically for this page if ID is unique
    const newsletterFormMeetings = document.getElementById('newsletterFormMeetings');
    if (newsletterFormMeetings) {
        newsletterFormMeetings.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterFormMeetings.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '' && emailInput.checkValidity()) {
                alert('Thank you for subscribing to Redeeming Time Today for meeting updates!');
                newsletterFormMeetings.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Update year in meetings page footer if ID is unique
    const footerYearMeetings = document.getElementById('footerYearMeetings');
    if (footerYearMeetings) {
        footerYearMeetings.textContent = new Date().getFullYear().toString();
    }

    // Add any meetings-specific interactions here, e.g.:
    // - Logic for handling RSVP clicks (could open a modal or direct to a form)
    // - Filtering meetings by type or date
});