document.addEventListener('DOMContentLoaded', () => {
    console.log("Contact page JavaScript loaded.");

    // Character Counter Function (copied from get_involved.js for consistency)
    function initCharacterCounter(textareaId, charCountDisplayId, maxLength) {
        const textarea = document.getElementById(textareaId);
        const charCountDisplay = document.getElementById(charCountDisplayId);

        if (textarea && charCountDisplay) {
            charCountDisplay.textContent = `${textarea.value.length} / ${maxLength}`; // Initial count
            textarea.addEventListener('input', () => {
                const currentLength = textarea.value.length;
                charCountDisplay.textContent = `${currentLength} / ${maxLength}`;
                if (currentLength > maxLength) {
                    charCountDisplay.style.color = 'var(--color-accent-dark)';
                    textarea.style.borderColor = 'var(--color-accent-dark)';
                } else {
                    charCountDisplay.style.color = 'var(--color-text-light)';
                    textarea.style.borderColor = 'var(--color-border)';
                }
            });
        }
    }

    // Initialize counters for contact page forms
    initCharacterCounter('generalMessage', 'generalMessageCharCount', 1000);
    initCharacterCounter('partnershipMessage', 'partnershipMessageCharCount', 1500);

    // General Contact Form Submission
    const generalContactForm = document.getElementById('generalContactForm');
    if (generalContactForm) {
        generalContactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('generalName').value;
            const email = document.getElementById('generalEmail').value;
            const message = document.getElementById('generalMessage').value;

            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Please fill in your name, email, and message.');
                return;
            }
             if (message.length > 1000) {
                alert('Your message exceeds the maximum character limit.');
                return;
            }
            alert(`Thank you, ${name}! Your message has been sent to Redeeming Time Today. We will get back to you at ${email} soon.`);
            generalContactForm.reset();
            initCharacterCounter('generalMessage', 'generalMessageCharCount', 1000); // Reset counter
        });
    }

    // Partnership Form Submission
    const partnershipForm = document.getElementById('partnershipForm');
    if (partnershipForm) {
        partnershipForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const partnerName = document.getElementById('partnerName').value;
            const partnerEmail = document.getElementById('partnerEmail').value;
            const partnershipMessage = document.getElementById('partnershipMessage').value;
            
            if (partnerName.trim() === '' || partnerEmail.trim() === '' || partnershipMessage.trim() === '') {
                alert('Please fill in all required fields for the partnership inquiry.');
                return;
            }
             if (partnershipMessage.length > 1500) {
                alert('Your partnership message exceeds the maximum character limit.');
                return;
            }
            alert(`Thank you, ${partnerName}, for your interest in partnering with Redeeming Time Today! We have received your inquiry and will review it shortly.`);
            partnershipForm.reset();
            initCharacterCounter('partnershipMessage', 'partnershipMessageCharCount', 1500); // Reset counter
        });
    }

    // Handle Newsletter Form Submission specifically for this page if ID is unique
    const newsletterFormContact = document.getElementById('newsletterFormContact');
    if (newsletterFormContact) {
        newsletterFormContact.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterFormContact.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '' && emailInput.checkValidity()) {
                alert('Thank you for subscribing to Redeeming Time Today!');
                newsletterFormContact.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Update year in contact page footer if ID is unique
    const footerYearContact = document.getElementById('footerYearContact');
    if (footerYearContact) {
        footerYearContact.textContent = new Date().getFullYear().toString();
    }

});