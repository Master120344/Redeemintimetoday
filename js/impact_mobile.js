document.addEventListener('DOMContentLoaded', () => {
    console.log("Impact page JavaScript loaded.");

    // --- Animated Number Counters ---
    const statNumbers = document.querySelectorAll('.stat-item__number');

    function animateCounter(el, target) {
        let current = 0;
        const duration = 2000; // 2 seconds
        // Calculate increment for smooth animation (~60fps)
        const steps = duration / 16; // Number of steps based on 16ms per frame
        const increment = target / steps;

        function updateCount() {
            current += increment;
            if (current < target) {
                el.textContent = Math.ceil(current);
                requestAnimationFrame(updateCount);
            } else {
                el.textContent = target; // Ensure final target is exact
                el.classList.add('counted'); // Mark as counted
            }
        }
        requestAnimationFrame(updateCount);
    }

    if (statNumbers.length > 0) {
        const statObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const targetVal = parseInt(entry.target.dataset.target);
                    if (!isNaN(targetVal)) {
                        animateCounter(entry.target, targetVal);
                    }
                    // Unobserve after attempting to animate to prevent re-triggering
                    // obs.unobserve(entry.target); // Keep observing if you want re-animation on scroll away and back
                                                // For one-time animation, unobserve:
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% of the element is visible

        statNumbers.forEach(stat => statObserver.observe(stat));
    }


    // Handle Newsletter Form Submission specifically for this page if ID is unique
    const newsletterFormImpact = document.getElementById('newsletterFormImpact');
    if (newsletterFormImpact) {
        newsletterFormImpact.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterFormImpact.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '' && emailInput.checkValidity()) {
                alert('Thank you for subscribing to Redeeming Time Today! (This is a demo feature from impact page)');
                newsletterFormImpact.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Update year in impact page footer if ID is unique
    const footerYearImpact = document.getElementById('footerYearImpact');
    if (footerYearImpact) {
        footerYearImpact.textContent = new Date().getFullYear().toString();
    }

    // Parallax sections on this page (if any, like impact-hero) are handled by global index_mobile.js
    // Animations on scroll are also handled by global index_mobile.js
});