document.addEventListener('DOMContentLoaded', () => {
    console.log("FAQ page JavaScript loaded.");

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        const answerPanel = item.querySelector('.faq-answer');
        const icon = questionButton.querySelector('.faq-icon');

        questionButton.addEventListener('click', () => {
            const isExpanded = questionButton.getAttribute('aria-expanded') === 'true';

            // Close all other open items for a classic accordion feel (optional)
            // faqItems.forEach(otherItem => {
            //     if (otherItem !== item) {
            //         otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            //         otherItem.querySelector('.faq-answer').style.maxHeight = null;
            //         otherItem.querySelector('.faq-answer').style.opacity = '0';
            //         otherItem.querySelector('.faq-answer').style.paddingBottom = '0';
            //         otherItem.querySelector('.faq-icon').classList.remove('fa-minus');
            //         otherItem.querySelector('.faq-icon').classList.add('fa-plus');
            //     }
            // });

            questionButton.setAttribute('aria-expanded', !isExpanded);
            answerPanel.hidden = isExpanded; // Toggle hidden state for accessibility

            if (!isExpanded) {
                // answerPanel.style.display = 'block'; // Ensure display is block before animating
                answerPanel.style.maxHeight = answerPanel.scrollHeight + "px";
                answerPanel.style.opacity = '1';
                // answerPanel.style.paddingBottom = '1.5rem'; // Set by CSS or here
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                answerPanel.style.maxHeight = null;
                answerPanel.style.opacity = '0';
                // answerPanel.style.paddingBottom = '0'; // Set by CSS or here
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
        });
    });


    // Handle Newsletter Form Submission specifically for this page if ID is unique
    const newsletterFormFAQ = document.getElementById('newsletterFormFAQ');
    if (newsletterFormFAQ) {
        newsletterFormFAQ.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterFormFAQ.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '' && emailInput.checkValidity()) {
                alert('Thank you for subscribing to Redeeming Time Today!');
                newsletterFormFAQ.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Update year in FAQ page footer if ID is unique
    const footerYearFAQ = document.getElementById('footerYearFAQ');
    if (footerYearFAQ) {
        footerYearFAQ.textContent = new Date().getFullYear().toString();
    }
});