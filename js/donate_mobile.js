document.addEventListener('DOMContentLoaded', () => {
    // console.log("Donate page JavaScript loaded."); // Keep for debugging if needed

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
            if (customAmountInput) customAmountInput.value = ''; 
            updateSelectedAmountDisplay(currentSelectedAmount);
        });
    });

    if (customAmountInput) {
        customAmountInput.addEventListener('input', () => {
            const customVal = parseInt(customAmountInput.value);
            if (customVal && customVal >= 5) { 
                amountButtons.forEach(btn => btn.classList.remove('selected'));
                currentSelectedAmount = customVal;
            } else if (customAmountInput.value === '') {
                const defaultButton = document.querySelector('.amount-btn[data-amount="100"]') || amountButtons[0];
                if (defaultButton) {
                    defaultButton.classList.add('selected');
                    currentSelectedAmount = parseInt(defaultButton.dataset.amount);
                }
            }
            updateSelectedAmountDisplay(currentSelectedAmount);
        });
        if(customAmountInput.value === '') {
            const selectedButton = document.querySelector('.amount-btn.selected');
            if(selectedButton) {
                currentSelectedAmount = parseInt(selectedButton.dataset.amount);
            }
        }
    }
    updateSelectedAmountDisplay(currentSelectedAmount);


    if (donationForm) {
        donationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const isRecurring = document.getElementById('recurringDonation')?.checked;
            // In a real application, this is where you would trigger your payment processing.
            // For now, we just show a success message.
            alert(`Thank you for your ${isRecurring ? 'recurring ' : ''}donation of $${currentSelectedAmount}! Your contribution is being processed.`);
            
            // Optionally reset form fields after submission
            // donationForm.reset(); 
            // amountButtons.forEach(btn => btn.classList.remove('selected'));
            // const defaultButton = document.querySelector('.amount-btn[data-amount="100"]');
            // if (defaultButton) defaultButton.classList.add('selected');
            // currentSelectedAmount = 100;
            // updateSelectedAmountDisplay(currentSelectedAmount);
        });
    }

    // Fund Allocation Chart
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
                        'rgba(243, 156, 18, 0.8)', 
                        'rgba(52, 152, 219, 0.8)', 
                        'rgba(44, 62, 80, 0.8)',  
                        'rgba(241, 196, 15, 0.8)', 
                        'rgba(149, 165, 166, 0.8)' 
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
        const currentRaised = 115750; 
        const goalAmount = 250000;    

        yearlyGoalEl.textContent = `$${goalAmount.toLocaleString()}`;

        let startVal = 0;
        const duration = 2000; 
        const increment = currentRaised / (duration / 16); 

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
        
        const progressPercentage = (currentRaised / goalAmount) * 100;
        setTimeout(() => {
             donationProgressBarEl.style.width = `${Math.min(progressPercentage, 100)}%`;
        }, 500); 
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
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
});