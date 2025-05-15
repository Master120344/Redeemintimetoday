document.addEventListener('DOMContentLoaded', () => {
    console.log("Get Involved page JavaScript loaded.");

    // Character Counter Function
    function initCharacterCounter(textareaId, charCountDisplayId, maxLength) {
        const textarea = document.getElementById(textareaId);
        const charCountDisplay = document.getElementById(charCountDisplayId);

        if (textarea && charCountDisplay) {
            // Set initial count
            charCountDisplay.textContent = `${textarea.value.length} / ${maxLength}`;

            textarea.addEventListener('input', () => {
                const currentLength = textarea.value.length;
                charCountDisplay.textContent = `${currentLength} / ${maxLength}`;
                if (currentLength > maxLength) {
                    charCountDisplay.style.color = 'var(--color-accent-dark)'; // Or some error color
                    textarea.style.borderColor = 'var(--color-accent-dark)';
                } else {
                    charCountDisplay.style.color = 'var(--color-text-light)';
                    textarea.style.borderColor = 'var(--color-border)'; // Reset to default
                }
            });
        }
    }

    // Initialize counters
    initCharacterCounter('volunteerMessage', 'volunteerCharCount', 500);
    initCharacterCounter('seekHelpMessage', 'seekHelpCharCount', 1000);

    // Volunteer Form Submission
    const volunteerForm = document.getElementById('volunteerForm');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Basic validation example (more robust validation recommended)
            const name = document.getElementById('volunteerName').value;
            const email = document.getElementById('volunteerEmail').value;
            const message = document.getElementById('volunteerMessage').value;

            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Please fill in all required fields for volunteering.');
                return;
            }
            if (message.length > 500) {
                alert('Your volunteer message exceeds the maximum character limit.');
                return;
            }

            alert('Thank you for your interest in volunteering with Redeeming Time Today! We will be in touch soon. (This is a demo submission)');
            volunteerForm.reset();
            initCharacterCounter('volunteerMessage', 'volunteerCharCount', 500); // Reset counter display
        });
    }

    // Seek Help Form Submission
    const seekHelpForm = document.getElementById('seekHelpForm');
    if (seekHelpForm) {
        seekHelpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('seekHelpName').value;
            const contact = document.getElementById('seekHelpContact').value;
            const message = document.getElementById('seekHelpMessage').value;
            const consent = document.getElementById('consentToContact').checked;

            if (name.trim() === '' || contact.trim() === '' || message.trim() === '') {
                alert('Please fill in all required fields to request assistance.');
                return;
            }
            if (!consent) {
                alert('Please consent to be contacted so we can assist you.');
                return;
            }
            if (message.length > 1000) {
                alert('Your message exceeds the maximum character limit.');
                return;
            }
            
            alert('Your request for assistance has been received by Redeeming Time Today. Someone will reach out to you shortly. (This is a demo submission)');
            seekHelpForm.reset();
            initCharacterCounter('seekHelpMessage', 'seekHelpCharCount', 1000); // Reset counter display
        });
    }

    // Handle Newsletter Form Submission specifically for this page if ID is unique
    const newsletterFormInvolved = document.getElementById('newsletterFormInvolved');
    if (newsletterFormInvolved) {
        newsletterFormInvolved.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterFormInvolved.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '' && emailInput.checkValidity()) {
                alert('Thank you for subscribing to Redeeming Time Today! (This is a demo feature from get involved page)');
                newsletterFormInvolved.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Update year in get involved page footer if ID is unique
    const footerYearInvolved = document.getElementById('footerYearInvolved');
    if (footerYearInvolved) {
        footerYearInvolved.textContent = new Date().getFullYear().toString();
    }

    // Smooth scroll for "Follow Us" button in "Other Ways to Help"
    const contactScrollBtn = document.querySelector('.contact-scroll-btn');
    if(contactScrollBtn) {
        contactScrollBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href'); // Should be "#contact"
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});