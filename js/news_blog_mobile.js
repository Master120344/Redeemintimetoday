document.addEventListener('DOMContentLoaded', () => {
    console.log("News & Blog page JavaScript loaded.");

    // Placeholder for blog-specific JavaScript, e.g.:
    // - Dynamic loading of posts
    // - Filtering posts by category (if filter buttons are implemented)
    // - Search functionality

    // Handle Newsletter Form Submission specifically for this page if ID is unique
    const newsletterFormNewsBlog = document.getElementById('newsletterFormNewsBlog');
    if (newsletterFormNewsBlog) {
        newsletterFormNewsBlog.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterFormNewsBlog.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '' && emailInput.checkValidity()) {
                alert('Thank you for subscribing to Redeeming Time Today news and updates!');
                newsletterFormNewsBlog.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Update year in news/blog page footer if ID is unique
    const footerYearNewsBlog = document.getElementById('footerYearNewsBlog');
    if (footerYearNewsBlog) {
        footerYearNewsBlog.textContent = new Date().getFullYear().toString();
    }

    // Search form (basic alert for now)
    const searchForms = document.querySelectorAll('.search-form');
    searchForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = this.querySelector('input[type="search"]').value;
            if (searchTerm.trim()) {
                alert(`Searching for: ${searchTerm}`);
                // In a real app, you'd redirect to a search results page or fetch results via AJAX.
            }
        });
    });

});