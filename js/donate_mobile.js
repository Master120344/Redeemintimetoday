document.addEventListener('DOMContentLoaded', () => {
    console.log("Donate page JavaScript loaded.");

    // Donation Form Logic
    const donationForm = document.getElementById('donationForm');
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('customAmount');
    const selectedAmountDisplay = document.getElementById('selectedAmountDisplay');
    let currentSelectedAmount = 100; // Default

    function updateSelectedAmountDisplay(amount) {
        if (selectedAmountDisplay) {
            selectedAmountDisplay.textContent = `$${amount}`;
        }
    }

    amountButtons.forEach(button => {
        button.addEventListener('click', () => {
            amountButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            currentSelectedAmount = parseInt(button.dataset.amount);
            if (customAmountInput) customAmountInput.value = ''; // Clear custom input
            updateSelectedAmountDisplay(currentSelectedAmount);
        });
    });

    if (customAmountInput) {
        customAmountInput.addEventListener('input', () => {
            const customVal = parseInt(customAmountInput.value);
            if (customVal && customVal >= 5) { // Minimum custom amount
                amountButtons.forEach(btn => btn.classList.remove('selected'));
                currentSelectedAmount = customVal;
            } else if (customAmountInput.value === '') {
                // If custom is cleared, re-select the default or last button
                const defaultButton = document.querySelector('.amount-btn[data-amount="100"]') || amountButtons[0];
                if (defaultButton) {
                    defaultButton.classList.add('selected');
                    currentSelectedAmount = parseInt(defaultButton.dataset.amount);
                }
            } else {
                 // Handle invalid input, perhaps show small error or revert
            }
            updateSelectedAmountDisplay(currentSelectedAmount);
        });
        // Ensure a button is selected on load if custom is empty
        if(customAmountInput.value === '') {
            const selectedButton = document.querySelector('.amount-btn.selected');
            if(selectedButton) {
                currentSelectedAmount = parseInt(selectedButton.dataset.amount);
                updateSelectedAmountDisplay(currentSelectedAmount);
            }
        }
    }
     // Initial display update
    updateSelectedAmountDisplay(currentSelectedAmount);


    if (donationForm) {
        donationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const isRecurring = document.getElementById('recurringDonation')?.checked;
            alert(`Thank you for your ${isRecurring ? 'recurring ' : ''}donation of $${currentSelectedAmount}! (Payment processing simulation)`);
            // Here you would integrate with a payment gateway.
            // donationForm.reset(); // Optionally reset form
            // amountButtons.forEach(btn => btn.classList.remove('selected'));
            // document.querySelector('.amount-btn[data-amount="100"]')?.classList.add('selected');
            // currentSelectedAmount = 100;
            // updateSelectedAmountDisplay(currentSelectedAmount);
        });
    }

    // Fund Allocation Chart
    const ctx = document.getElementById('fundAllocationChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'doughnut', // or 'pie'
            data: {
                labels: ['Community Reintegration', 'Youth Mentorship', 'Recovery & Support', 'Holistic Development', 'Operational Costs'],
                datasets: [{
                    label: 'Fund Allocation',
                    data: [35, 25, 20, 15, 5], // Example percentages
                    backgroundColor: [
                        'rgba(243, 156, 18, 0.8)', // Accent
                        'rgba(52, 152, 219, 0.8)', // Secondary
                        'rgba(44, 62, 80, 0.8)',  // Primary
                        'rgba(241, 196, 15, 0.8)', // Accent Light
                        'rgba(149, 165, 166, 0.8)' // Grey
                    ],
                    borderColor: [
                        'rgba(243, 156, 18, 1)',
                        'rgba(52, 152, 219, 1)',
                        'rgba(44, 62, 80, 1)',
                        'rgba(241, 196, 15, 1)',
                        'rgba(149, 165, 166, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    label += context.parsed + '%';
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    // Total Raised Simulation & Progress Bar
    const totalRaisedAmountEl = document.getElementById('totalRaisedAmount');
    const donationProgressBarEl = document.getElementById('donationProgressBar');
    const yearlyGoalEl = document.getElementById('yearlyGoal');

    if (totalRaisedAmountEl && donationProgressBarEl && yearlyGoalEl) {
        // Simulate fetching these values
        const currentRaised = 115750; // Example: Fetched from server
        const goalAmount = 250000;    // Example: Fetched from server

        yearlyGoalEl.textContent = `$${goalAmount.toLocaleString()}`;

        // Animate the "total raised" counter
        let startVal = 0;
        const duration = 2000; // 2 seconds
        const increment = currentRaised / (duration / 16); // ~60fps update

        function updateCounter() {
            startVal += increment;
            if (startVal < currentRaised) {
                totalRaisedAmountEl.textContent = `$${Math.ceil(startVal).toLocaleString()}`;
                requestAnimationFrame(updateCounter);
            } else {
                totalRaisedAmountEl.textContent = `$${currentRaised.toLocaleString()}`;
            }
        }
        requestAnimationFrame(updateCounter);
        
        // Update progress bar
        const progressPercentage = (currentRaised / goalAmount) * 100;
        // Timeout to allow counter to animate first, then bar (or sync them)
        setTimeout(() => {
             donationProgressBarEl.style.width = `${Math.min(progressPercentage, 100)}%`;
        }, 500); // Delay slightly for visual effect
    }


    // Handle Newsletter Form Submission specifically for this page if ID is unique
    const newsletterFormDonate = document.getElementById('newsletterFormDonate');
    if (newsletterFormDonate) {
        newsletterFormDonate.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterFormDonate.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '' && emailInput.checkValidity()) {
                alert('Thank you for subscribing to Redeeming Time Today! (This is a demo feature from donate page)');
                newsletterFormDonate.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Update year in donate page footer if ID is unique
    const footerYearDonate = document.getElementById('footerYearDonate');
    if (footerYearDonate) {
        footerYearDonate.textContent = new Date().getFullYear().toString();
    }

    // Smooth scroll for hero button to donation form
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
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

});