/* --- Donate Page Specific Styles --- */

/* Donate Hero Section */
.donate-hero {
    color: var(--color-text-on-dark-bg); /* Ensure all text starts light */
    text-align: center;
    padding-top: calc(var(--header-height-mobile) + var(--section-padding-y) / 1.5); 
    padding-bottom: calc(var(--section-padding-y) / 1.5);
    min-height: 60vh; 
    display: flex; 
    align-items: center;
    position: relative; /* For parallax and overlay */
    background-attachment: fixed;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
}

.donate-hero__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(26, 37, 47, 0.7); /* Adjusted opacity for good contrast */
    z-index: 0;
}
.donate-hero__container {
    position: relative;
    z-index: 1;
}

.donate-hero .section__title--light { 
    margin-bottom: 0.5em;
    color: var(--color-text-on-dark-bg); /* Explicit white for title */
}

.donate-hero__intro {
    font-size: clamp(1rem, 2.5vw, 1.15rem);
    color: var(--color-text-on-dark-bg-muted); /* Lighter for better visibility */
    max-width: 700px;
    margin: 0 auto 1.5rem;
}
.donate-hero .hero__cta { 
    opacity: 1; 
    transform: none;
}

/* Donation Form Section */
.donation-form-section {
    background-color: var(--color-surface-solid); /* Light background for form section */
}
.donation-form-section .section__header .section__title {
    color: var(--color-primary-dark); /* Dark title on light background */
}
.donation-form-section .section__header .section__kicker {
    color: var(--color-accent-dark); /* Accent kicker on light background */
}

.donation-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem 1.5rem; /* Adjusted padding for mobile */
    background-color: #fff; 
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
}

.donation-amounts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); /* More responsive */
    gap: 0.8rem;
    margin-bottom: 1.5rem;
}

.amount-btn {
    padding: 0.8em 0.5em; 
    font-size: 1rem;
    border-width: 2px;
    border-radius: var(--border-radius-sm); /* Consistent radius */
}
.amount-btn.selected { /* Explicitly style selected state */
    background-color: var(--color-primary);
    color: var(--color-text-on-dark-bg);
    border-color: var(--color-primary);
}
.btn--outline-primary { 
    border: 2px solid var(--color-primary-light);
    color: var(--color-primary);
    background-color: transparent;
}
.btn--outline-primary:hover, .btn--outline-primary:focus { /* Hover distinct from selected */
    background-color: var(--color-primary-light);
    color: var(--color-text-on-dark-bg);
    border-color: var(--color-primary-light);
}

/* Custom Amount Input - Using global form styles from index_mobile.css for consistency */
/* Ensure .form-group and input styles from global CSS are applied */
.custom-amount-group input[type="number"] {
    text-align: left; /* Standard alignment */
    font-size: 1rem; /* Standard font size */
    font-weight: 400;
    padding: 0.8em 1em; /* Standard padding */
    border: 1px solid var(--color-border); /* Standard border */
    border-radius: var(--border-radius-sm);
}
.custom-amount-group label { /* Using placeholder for custom amount label */
    /* Standard label styles from global or specific overrides */
}

.form-group-checkbox {
    display: flex;
    align-items: center;
    gap: 0.75rem; /* Increased gap */
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
}
.form-group-checkbox input[type="checkbox"] {
    height: 1.3em;
    width: 1.3em;
    accent-color: var(--color-accent);
    cursor: pointer;
    margin-top: -2px; /* Fine-tune alignment */
}
.form-group-checkbox label {
    color: var(--color-text-light);
    margin-bottom: 0; 
    cursor: pointer;
}

/* Payment Message (for Stripe errors) */
.payment-message {
    color: var(--color-text-on-dark-bg);
    background-color: #dc3545; /* Bootstrap danger color for errors */
    border: 1px solid #c82333;
    padding: 0.75rem 1.25rem;
    margin-bottom: 1rem;
    border-radius: var(--border-radius-sm);
    font-size: 0.9rem;
    text-align: center;
    display: none; /* Hidden by default */
}
.payment-message.success {
    background-color: #28a745; /* Bootstrap success color */
    border-color: #1e7e34;
}

.btn--full-width {
    width: 100%;
}
.donation-submit-btn {
    padding: 1em 1.5em;
    font-size: 1.1rem;
    font-weight: 700;
    margin-top: 1rem; /* Space above button */
}
.donation-submit-btn:disabled {
    background-color: var(--color-primary-light);
    cursor: not-allowed;
    opacity: 0.7;
}
.donation-submit-btn .spinner {
    display: inline-block;
    width: 1em;
    height: 1em;
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 50%;
    border-top-color: var(--color-text-on-dark-bg);
    animation: spin 1s ease-in-out infinite;
    margin-left: 0.5em;
    vertical-align: middle;
}
@keyframes spin {
    to { transform: rotate(360deg); }
}

#selectedAmountDisplay {
    font-weight: 700;
}

.payment-methods-accepted {
    text-align: center;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
}
.payment-methods-accepted p {
    font-size: 0.85rem;
    color: var(--color-text-light);
    margin-bottom: 0.5rem;
}
.payment-icons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
}
.payment-icons img {
    height: 24px;
    opacity: 0.7;
    transition: opacity var(--transition-fast);
}
.payment-icons img:hover {
    opacity: 1;
}

.powered-by-stripe {
    text-align: center;
    margin-top: 1rem;
}
.powered-by-stripe img {
    height: 30px; /* Adjust as needed */
    opacity: 0.8;
}
.powered-by-stripe img:hover {
    opacity: 1;
}

/* Donation Success Message */
.donation-success-message {
    background-color: var(--color-surface-solid);
    text-align: center;
    padding: var(--section-padding-y) var(--container-padding);
}
.success-content {
    max-width: 600px;
    margin: 0 auto;
}
.success-icon {
    font-size: 4rem;
    color: var(--color-accent); /* Using accent for success icon */
    margin-bottom: 1rem;
}
.donation-success-message h2 {
    color: var(--color-primary-dark);
    font-size: clamp(1.8rem, 5vw, 2.5rem);
    margin-bottom: 0.75rem;
}
.donation-success-message p {
    color: var(--color-text-light);
    font-size: 1.05rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
}
.donation-success-message .btn {
    margin: 0.5rem;
}


/* Impact Visualization Section */
.impact-visualization-section {
    background-color: var(--color-background); 
}
.impact-visualization-section .section__header .section__title--light {
    color: var(--color-text-on-dark-bg);
}
.impact-visualization-section .section__header .section__kicker--on-dark {
    color: var(--color-accent-light);
}

.impact-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
}

.impact-chart-container, .impact-stats-container {
    background-color: var(--color-surface-solid); /* Light cards on dark bg */
    padding: 1.5rem;
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-md);
}

.impact-subsection-title {
    font-family: var(--font-body);
    font-weight: 600;
    color: var(--color-secondary); 
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 1.3rem; /* Adjusted size */
}

#fundAllocationChart {
    max-height: 300px; /* Adjusted max height */
    width: 100% !important; 
}
.chart-disclaimer {
    font-size: 0.8rem;
    text-align: center;
    color: var(--color-text-light);
    margin-top: 1rem;
}

.total-raised-container {
    text-align: center;
    margin-bottom: 2rem;
}
.total-raised-container h4 {
    font-size: 1.05rem; /* Adjusted size */
    color: var(--color-text-dark);
    margin-bottom: 0.5rem;
}
.total-raised-amount {
    font-family: var(--font-heading);
    font-size: clamp(2.2rem, 6vw, 3.2rem); /* Adjusted size */
    font-weight: 700;
    color: var(--color-accent-dark);
    line-height: 1;
    margin-bottom: 0.75rem;
}
.progress-bar-container {
    width: 100%;
    height: 12px; /* Slimmer bar */
    background-color: var(--color-border); /* Lighter track */
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 0.5rem;
}
.progress-bar {
    height: 100%;
    width: 0%; 
    background-color: var(--color-accent);
    border-radius: 10px;
    transition: width 1s ease-out;
}
.goal-text {
    font-size: 0.9rem;
    color: var(--color-text-light);
}
.goal-text span {
    font-weight: 600;
    color: var(--color-text-dark);
}

.impact-examples h4 {
    font-size: 1.05rem; /* Adjusted size */
    color: var(--color-text-dark);
    margin-bottom: 1rem;
    text-align: left; 
}
.impact-examples ul {
    list-style: none;
    padding-left: 0;
}
.impact-examples ul li {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 0.8rem;
    font-size: 0.9rem; /* Adjusted size */
    color: var(--color-text-light);
}
.impact-examples ul li i {
    color: var(--color-accent);
    font-size: 1.05rem; /* Adjusted size */
    margin-top: 0.1em; 
    width: 20px; 
    text-align: center;
}

/* Transparency Section */
.transparency-section {
    background-color: var(--color-primary-light); 
    color: var(--color-text-on-dark-bg);
    text-align: center;
}
.transparency-section .section__title.section__title--light { /* Ensure title is light */
    color: var(--color-text-on-dark-bg);
}
.transparency-section .section__kicker.section__kicker--on-light { /* Ensure kicker is visible */
    color: var(--color-accent-light); 
}
.transparency__icon {
    font-size: 2.8rem; /* Adjusted size */
    color: var(--color-accent-light);
    margin-bottom: 0.75em;
    display: block;
}
.transparency-content p {
    font-size: 1rem; /* Adjusted size */
    line-height: 1.7;
    max-width: 750px;
    margin: 0 auto 1.5rem;
    color: var(--color-text-on-dark-bg-muted);
}
/* .btn--light-on-dark defined in about_mobile.css or index_mobile.css, ensure it works here */
/* .transparency-content .btn--secondary { ... } Removed, using .btn--light-on-dark */


/* Responsive adjustments */
@media (min-width: 600px) {
    .donation-form {
        padding: 2rem; /* More padding on larger screens */
    }
}

@media (min-width: 768px) {
    .impact-grid {
        grid-template-columns: 1fr 1fr; 
        align-items: flex-start; 
    }
}

@media (min-width: 992px) {
    .donation-form {
        padding: 2.5rem 3rem;
    }
}