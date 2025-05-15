document.addEventListener('DOMContentLoaded', () => {
    // --- Stripe Integration ---
    // IMPORTANT: Replace with your actual Stripe Publishable Key.
    // In a real production app, you might load this from an environment variable
    // during your build process, but for a static site, it's common to have it here.
    // Example: const stripePublishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_YOUR_STRIPE_PUBLISHABLE_KEY';
    const stripePublishableKey = 'pk_test_YOUR_STRIPE_PUBLISHABLE_KEY_HERE'; // REPLACE THIS!
    
    // Check if the key is still the placeholder
    if (stripePublishableKey === 'pk_test_YOUR_STRIPE_PUBLISHABLE_KEY_HERE') {
        console.warn('Stripe Publishable Key is not set. Please replace the placeholder in js/donate_mobile.js.');
        const paymentMessage = document.getElementById('payment-message');
        if (paymentMessage) {
            paymentMessage.textContent = 'Donation system is currently unavailable. Stripe key not configured.';
            paymentMessage.style.display = 'block';
        }
        // Disable the submit button if Stripe isn't configured
        const submitButton = document.getElementById('submitDonation');
        if (submitButton) {
            submitButton.disabled = true;
        }
    }

    let stripe;
    try {
        stripe = Stripe(stripePublishableKey);
    } catch (error) {
        console.error('Error initializing Stripe:', error);
        const paymentMessage = document.getElementById('payment-message');
        if (paymentMessage) {
            paymentMessage.textContent = 'Could not initialize donation system. Please try again later.';
            paymentMessage.style.display = 'block';
        }
        const submitButton = document.getElementById('submitDonation');
        if (submitButton) {
            submitButton.disabled = true;
        }
    }

    const donationForm = document.getElementById('donationForm');
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('customAmount');
    const selectedAmountDisplay = document.getElementById('selectedAmountDisplay');
    const submitButton = document.getElementById('submitDonation');
    const recurringCheckbox = document.getElementById('recurringDonation');
    const paymentMessageDiv = document.getElementById('payment-message');

    let currentSelectedAmount = 100; // Default in USD

    function updateSelectedAmountDisplay(amount) {
        if (selectedAmountDisplay) {
            selectedAmountDisplay.textContent = `$${amount}`;
        }
    }

    function setLoadingState(isLoading) {
        if (isLoading) {
            submitButton.disabled = true;
            // Add spinner to button text
            const originalText = submitButton.innerHTML.split(' <span class="spinner">')[0]; // Get text before spinner
            submitButton.innerHTML = `${originalText} <span class="spinner"></span>`;
        } else {
            submitButton.disabled = false;
            // Restore original button text (remove spinner)
            const baseText = submitButton.innerHTML.split(' <span class="spinner">')[0];
            const iconHTML = submitButton.querySelector('.btn__icon') ? submitButton.querySelector('.btn__icon').outerHTML : '<i class="fas fa-lock btn__icon"></i>';
            submitButton.innerHTML = `Donate <span id="selectedAmountDisplay">$${currentSelectedAmount}</span> ${iconHTML}`;
        }
    }
    
    function showPaymentMessage(message, isSuccess = false) {
        if (paymentMessageDiv) {
            paymentMessageDiv.textContent = message;
            paymentMessageDiv.className = 'payment-message'; // Reset classes
            if (isSuccess) {
                paymentMessageDiv.classList.add('success');
            }
            paymentMessageDiv.style.display = 'block';
        }
    }


    amountButtons.forEach(button => {
        button.addEventListener('click', () => {
            amountButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            currentSelectedAmount = parseInt(button.dataset.amount);
            if (customAmountInput) customAmountInput.value = '';
            updateSelectedAmountDisplay(currentSelectedAmount);
            paymentMessageDiv.style.display = 'none'; // Hide message on amount change
        });
    });

    if (customAmountInput) {
        customAmountInput.addEventListener('input', () => {
            amountButtons.forEach(btn => btn.classList.remove('selected'));
            let customVal = parseInt(customAmountInput.value);
            if (isNaN(customVal) || customVal < 5) { // Minimum donation $5
                if (customAmountInput.value !== '' && customVal < 5) {
                     currentSelectedAmount = 5; // Default to min if typed less
                } else {
                    // If empty or invalid, revert to a default or last selected preset
                    const defaultButton = document.querySelector('.amount-btn[data-amount="100"]') || amountButtons[0];
                     if (defaultButton) {
                        defaultButton.classList.add('selected');
                        currentSelectedAmount = parseInt(defaultButton.dataset.amount);
                    }
                }
            } else {
                currentSelectedAmount = customVal;
            }
            updateSelectedAmountDisplay(currentSelectedAmount);
            paymentMessageDiv.style.display = 'none'; // Hide message
        });
         // Initialize on load if custom amount is empty
        if(customAmountInput.value === '') {
            const selectedButton = document.querySelector('.amount-btn.selected');
            if(selectedButton) {
                currentSelectedAmount = parseInt(selectedButton.dataset.amount);
            }
        }
    }
    updateSelectedAmountDisplay(currentSelectedAmount); // Initial display

    if (donationForm && stripe) {
        donationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            setLoadingState(true);
            paymentMessageDiv.style.display = 'none'; // Clear previous messages

            if (currentSelectedAmount < 5) { // Stripe minimums might be $0.50 or $1, but $5 is a reasonable app min.
                showPaymentMessage('Minimum donation amount is $5.');
                setLoadingState(false);
                return;
            }

            const isRecurring = recurringCheckbox.checked;
            const lineItemName = isRecurring ? 
                `Monthly Donation to Redeeming Time Today` : 
                `One-Time Donation to Redeeming Time Today`;

            let lineItems = [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: lineItemName,
                        // You can add description or images here if desired
                        // description: 'Your generous contribution.',
                        // images: ['https://example.com/your-org-logo.png'],
                    },
                    unit_amount: currentSelectedAmount * 100, // Amount in cents
                },
                quantity: 1,
            }];
            
            if (isRecurring) {
                lineItems[0].price_data.recurring = { interval: 'month' };
            }
            
            // Replace with your actual domain and paths
            const successUrl = `${window.location.origin}${window.location.pathname}?session_id={CHECKOUT_SESSION_ID}&donation=success`;
            const cancelUrl = `${window.location.origin}${window.location.pathname}?donation=cancelled`;

            try {
                const { error } = await stripe.redirectToCheckout({
                    lineItems: lineItems,
                    mode: isRecurring ? 'subscription' : 'payment',
                    successUrl: successUrl,
                    cancelUrl: cancelUrl,
                    // Optional: Collect billing address if needed for your records or tax receipts
                    // billingAddressCollection: 'required', 
                    // Optional: Submit type can be 'donate'
                    // submitType: 'donate',
                });

                if (error) {
                    console.error('Stripe Checkout error:', error);
                    showPaymentMessage(error.message);
                    setLoadingState(false);
                }
                // If redirectToCheckout is successful, the user is redirected
                // so setLoadingState(false) might not be hit here unless there's an immediate error.
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
        // Hide the form, show success message
        const formSection = document.getElementById('donation-form-section');
        const successSection = document.getElementById('donation-success-message');
        if (formSection) formSection.style.display = 'none';
        if (successSection) successSection.style.display = 'block';
        
        // Scroll to success message for better UX
        successSection.scrollIntoView({ behavior: 'smooth' });

        // Optional: You could fetch the session details from your server here
        // to confirm the payment and get customer details if needed.
        // For client-only, displaying a generic success message is typical.
        console.log('Donation successful! Session ID:', sessionId);
    } else if (donationStatus === 'cancelled') {
        showPaymentMessage('Your donation process was cancelled. You can try again anytime.');
    }


    // --- Chart.js and Other Page Logic (Existing) ---
    const ctx = document.getElementById('fundAllocationChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Community Reintegration', 'Youth Mentorship', 'Recovery & Support', 'Holistic Development', 'Operational Costs'],
                datasets: [{
                    label: 'Fund Allocation',
                    data: [35, 25, 20, 15, 5],
                    backgroundColor: [
                        'rgba(243, 156, 18, 0.9)', 
                        'rgba(52, 152, 219, 0.9)', 
                        'rgba(44, 62, 80, 0.9)',  
                        'rgba(241, 196, 15, 0.9)', 
                        'rgba(149, 165, 166, 0.9)' 
                    ],
                    borderColor: var(--color-surface-solid), // Use surface color for borders for a cleaner look
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: var(--color-text-light), // Match text color
                            font: { size: 10 }
                        }
                    },
                    tooltip: {
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

    const totalRaisedAmountEl = document.getElementById('totalRaisedAmount');
    const donationProgressBarEl = document.getElementById('donationProgressBar');
    const yearlyGoalEl = document.getElementById('yearlyGoal');

    if (totalRaisedAmountEl && donationProgressBarEl && yearlyGoalEl) {
        const currentRaised = 115750;
        const goalAmountText = yearlyGoalEl.textContent.replace(/[^0-9]/g, ''); // Extract number from goal text
        const goalAmount = parseInt(goalAmountText) || 250000;

        yearlyGoalEl.textContent = `$${goalAmount.toLocaleString()}`;

        let startVal = 0;
        const duration = 1500;
        const frameDuration = 1000 / 60; // 60 FPS
        const totalFrames = Math.round(duration / frameDuration);
        const increment = currentRaised / totalFrames;

        function updateCounter() {
            startVal += increment;
            if (startVal < currentRaised) {
                totalRaisedAmountEl.textContent = `$${Math.ceil(startVal).toLocaleString()}`;
                requestAnimationFrame(updateCounter);
            } else {
                totalRaisedAmountEl.textContent = `$${currentRaised.toLocaleString()}`;
            }
        }
        if (currentRaised > 0) {
            requestAnimationFrame(updateCounter);
        } else {
            totalRaisedAmountEl.textContent = `$0`;
        }
        
        const progressPercentage = (currentRaised / goalAmount) * 100;
        setTimeout(() => {
             donationProgressBarEl.style.width = `${Math.min(progressPercentage, 100)}%`;
        }, 300);
    }

    const newsletterFormDonate = document.getElementById('newsletterFormDonate');
    if (newsletterFormDonate) {
        newsletterFormDonate.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterFormDonate.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '' && emailInput.checkValidity()) {
                alert('Thank you for subscribing to Redeeming Time Today!');
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

    const heroDonateButton = document.querySelector('.donate-hero .hero__cta');
    if (heroDonateButton) {
        heroDonateButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.getElementById('siteHeader') ? document.getElementById('siteHeader').offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    }
});