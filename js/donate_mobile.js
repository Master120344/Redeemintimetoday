document.addEventListener('DOMContentLoaded', () => {
    // --- Stripe Integration ---
    // IMPORTANT: Replace with your actual Stripe Publishable Key.
    // For client-side JavaScript that's directly served (not part of a complex build process),
    // the publishable key is typically embedded here.
    // If you use a build system (e.g., Vite, Webpack, Next.js), you could use environment
    // variables injected at build time (e.g., import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY).
    // For a simple static site, direct embedding is common.
    // DO NOT PUT YOUR STRIPE SECRET KEY HERE. IT IS FOR SERVER-SIDE USE ONLY.
    const stripePublishableKey = 'pk_test_YOUR_STRIPE_PUBLISHABLE_KEY_HERE'; // <<< REPLACE THIS!

    let stripe;
    const donationForm = document.getElementById('donationForm');
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('customAmount');
    const selectedAmountDisplay = document.getElementById('selectedAmountDisplay');
    const submitButton = document.getElementById('submitDonation');
    const recurringCheckbox = document.getElementById('recurringDonation');
    const paymentMessageDiv = document.getElementById('payment-message');
    const submitButtonIconWrapper = submitButton ? submitButton.querySelector('.btn__icon-wrapper') : null;
    const submitButtonSpinnerWrapper = submitButton ? submitButton.querySelector('.btn__spinner-wrapper') : null;

    let currentSelectedAmount = 100; // Default in USD (cents will be calculated later)

    function initializeStripe() {
        if (!stripePublishableKey || stripePublishableKey === 'pk_test_YOUR_STRIPE_PUBLISHABLE_KEY_HERE') {
            console.warn('Stripe Publishable Key is not set. Please replace the placeholder in js/donate_mobile.js.');
            showPaymentMessage('Donation system is currently unavailable (Configuration issue).');
            if (submitButton) submitButton.disabled = true;
            return false;
        }
        try {
            stripe = Stripe(stripePublishableKey);
            return true;
        } catch (error) {
            console.error('Error initializing Stripe:', error);
            showPaymentMessage('Could not initialize donation system. Please try again later.');
            if (submitButton) submitButton.disabled = true;
            return false;
        }
    }
    
    function updateSelectedAmountDisplay(amount) {
        if (selectedAmountDisplay) {
            selectedAmountDisplay.textContent = `$${amount}`;
        }
    }

    function setLoadingState(isLoading) {
        if (!submitButton) return;
        if (isLoading) {
            submitButton.disabled = true;
            if (submitButtonIconWrapper) submitButtonIconWrapper.style.display = 'none';
            if (submitButtonSpinnerWrapper) submitButtonSpinnerWrapper.style.display = 'inline-block';
        } else {
            submitButton.disabled = false;
            if (submitButtonIconWrapper) submitButtonIconWrapper.style.display = 'inline-block';
            if (submitButtonSpinnerWrapper) submitButtonSpinnerWrapper.style.display = 'none';
            // Restore original button text (amount display updated separately)
            if (selectedAmountDisplay) updateSelectedAmountDisplay(currentSelectedAmount);
        }
    }
    
    function showPaymentMessage(message, isSuccess = false) {
        if (paymentMessageDiv) {
            paymentMessageDiv.textContent = message;
            paymentMessageDiv.className = 'payment-message';
            if (isSuccess) paymentMessageDiv.classList.add('success');
            paymentMessageDiv.style.display = 'block';
            paymentMessageDiv.focus(); // For accessibility
        }
    }

    function hidePaymentMessage() {
        if (paymentMessageDiv) paymentMessageDiv.style.display = 'none';
    }

    amountButtons.forEach(button => {
        button.addEventListener('click', () => {
            amountButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            currentSelectedAmount = parseInt(button.dataset.amount);
            if (customAmountInput) customAmountInput.value = '';
            updateSelectedAmountDisplay(currentSelectedAmount);
            hidePaymentMessage();
        });
    });

    if (customAmountInput) {
        customAmountInput.addEventListener('input', () => {
            amountButtons.forEach(btn => btn.classList.remove('selected'));
            let customVal = parseInt(customAmountInput.value);
            
            if (customAmountInput.value === '') { // If input is cleared
                const defaultButton = document.querySelector('.amount-btn[data-amount="100"]') || amountButtons[2] || amountButtons[0];
                 if (defaultButton) {
                    defaultButton.classList.add('selected');
                    currentSelectedAmount = parseInt(defaultButton.dataset.amount);
                }
            } else if (isNaN(customVal) || customVal < 5) {
                currentSelectedAmount = 5; // Enforce minimum for display if invalid or too low, actual validation on submit
            } else {
                currentSelectedAmount = customVal;
            }
            updateSelectedAmountDisplay(currentSelectedAmount);
            hidePaymentMessage();
        });
        if(customAmountInput.value === '') {
            const selectedButton = document.querySelector('.amount-btn.selected');
            if(selectedButton) currentSelectedAmount = parseInt(selectedButton.dataset.amount);
        }
    }
    if (submitButton) updateSelectedAmountDisplay(currentSelectedAmount); // Initial display

    if (donationForm && initializeStripe()) { // Initialize Stripe here
        donationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            setLoadingState(true);
            hidePaymentMessage();

            // Validate amount (Stripe minimum is $0.50, but $5 is a good app minimum)
            const finalAmount = customAmountInput.value ? parseInt(customAmountInput.value) : currentSelectedAmount;
            if (isNaN(finalAmount) || finalAmount < 5) {
                showPaymentMessage('Minimum donation amount is $5.');
                customAmountInput.focus();
                setLoadingState(false);
                return;
            }
            currentSelectedAmount = finalAmount; // Ensure currentSelectedAmount is up-to-date
            updateSelectedAmountDisplay(currentSelectedAmount);


            const isRecurring = recurringCheckbox.checked;
            const lineItemName = isRecurring ? 
                `Monthly Donation to Redeeming Time Today` : 
                `One-Time Donation to Redeeming Time Today`;

            let lineItems = [{
                price_data: {
                    currency: 'usd',
                    product_data: { name: lineItemName },
                    unit_amount: currentSelectedAmount * 100, // Amount in cents
                },
                quantity: 1,
            }];
            
            if (isRecurring) {
                lineItems[0].price_data.recurring = { interval: 'month' };
            }
            
            const successUrl = `${window.location.origin}${window.location.pathname.replace(/\/[^/]*$/, '')}/?session_id={CHECKOUT_SESSION_ID}&donation=success#donation-success-message`;
            const cancelUrl = `${window.location.origin}${window.location.pathname.replace(/\/[^/]*$/, '')}/?donation=cancelled#donation-form-section`;

            try {
                const { error } = await stripe.redirectToCheckout({
                    lineItems: lineItems,
                    mode: isRecurring ? 'subscription' : 'payment',
                    successUrl: successUrl,
                    cancelUrl: cancelUrl,
                    // submitType: 'donate', // Makes button say "Donate" in Stripe UI
                    // billingAddressCollection: 'auto', // Or 'required'
                    // locale: 'auto' // Stripe detects browser locale
                });

                if (error) {
                    console.error('Stripe Checkout error:', error);
                    showPaymentMessage(error.message || 'An error occurred during checkout.');
                    setLoadingState(false);
                }
            } catch (err) {
                console.error('Error during Stripe Checkout process:', err);
                showPaymentMessage('An unexpected error occurred. Please try again.');
                setLoadingState(false);
            }
        });
    }

    // Handle redirect back from Stripe
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    const donationStatus = urlParams.get('donation');

    if (sessionId && donationStatus === 'success') {
        const formSection = document.getElementById('donation-form-section');
        const successSection = document.getElementById('donation-success-message');
        if (formSection) formSection.style.display = 'none'; // Hide form
        if (successSection) {
            successSection.style.display = 'block'; // Show success message
            // Scroll to success message if hash is present
            if (window.location.hash === '#donation-success-message') {
                 successSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        console.log('Donation successful! Session ID:', sessionId);
    } else if (donationStatus === 'cancelled') {
        showPaymentMessage('Your donation process was cancelled. You can try again anytime.');
        if (window.location.hash === '#donation-form-section') {
            const formSection = document.getElementById('donation-form-section');
            if (formSection) formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }


    // --- Chart.js and Other Page Logic ---
    const ctx = document.getElementById('fundAllocationChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Community Reintegration', 'Youth Mentorship', 'Recovery & Support', 'Holistic Development', 'Operational Costs'],
                datasets: [{
                    label: 'Fund Allocation (%)',
                    data: [35, 25, 20, 15, 5],
                    backgroundColor: [
                        'rgba(243, 156, 18, 0.85)', 
                        'rgba(52, 152, 219, 0.85)', 
                        'rgba(44, 62, 80, 0.85)',  
                        'rgba(230, 126, 34, 0.85)', // Different orange
                        'rgba(127, 140, 141, 0.85)'  // Grey
                    ],
                    borderColor: 'var(--color-primary-dark)', // Use card background for border
                    borderWidth: 2,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'var(--color-text-on-dark-bg-muted)',
                            font: { size: 11, family: 'var(--font-body)' },
                            padding: 15
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        titleFont: { family: 'var(--font-body)', weight: 'bold' },
                        bodyFont: { family: 'var(--font-body)' },
                        padding: 10,
                        cornerRadius: 4,
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) { label += ': '; }
                                if (context.parsed !== null) { label += context.parsed + '%'; }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Smooth scroll for hero CTA
    const heroCtaButton = document.querySelector('.donate-hero .scroll-link');
    if (heroCtaButton) {
        heroCtaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.getElementById('siteHeader') ? document.getElementById('siteHeader').offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset - 20; // Extra 20px offset
                
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    }

    // Shared form submission logic (e.g., newsletter) - could be refactored into global if identical
    const newsletterFormDonate = document.getElementById('newsletterFormDonate');
    if (newsletterFormDonate) {
        newsletterFormDonate.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterFormDonate.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '' && emailInput.checkValidity()) {
                alert('Thank you for subscribing!'); // Keep it simple
                newsletterFormDonate.reset();
            } else {
                alert('Please enter a valid email address.');
                if(emailInput) emailInput.focus();
            }
        });
    }
    
    const footerYearDonate = document.getElementById('footerYearDonate');
    if (footerYearDonate) {
        footerYearDonate.textContent = new Date().getFullYear().toString();
    }
});