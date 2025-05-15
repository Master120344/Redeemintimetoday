document.addEventListener('DOMContentLoaded', () => {
    console.log("News & Blog page JavaScript loaded.");

    // Handle Newsletter Form Submission
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
    
    // Update year in footer
    const footerYearNewsBlog = document.getElementById('footerYearNewsBlog');
    if (footerYearNewsBlog) {
        footerYearNewsBlog.textContent = new Date().getFullYear().toString();
    }

    // Search form functionality
    const blogSearchForm = document.getElementById('blogSearchForm');
    if (blogSearchForm) {
        blogSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = document.getElementById('blogSearchInput');
            const searchTerm = searchInput ? searchInput.value.trim() : '';
            if (searchTerm) {
                alert(`Searching for articles containing: "${searchTerm}"`);
                // In a real application, you would typically redirect to a search results page:
                // window.location.href = `search_results_mobile.html?query=${encodeURIComponent(searchTerm)}`;
                // Or fetch results via AJAX and display them on this page.
            } else {
                alert("Please enter a search term.");
            }
        });
    }

    // Pagination functionality (simulated)
    const paginationLinks = document.querySelectorAll('.pagination .page-numbers');
    if (paginationLinks.length > 0) {
        paginationLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const pageClicked = this.dataset.page;
                let message = '';
                if (pageClicked === 'next') {
                    message = "Navigating to the next page of articles.";
                } else if (pageClicked === 'prev') { // Assuming you might add a prev button
                    message = "Navigating to the previous page of articles.";
                } else {
                    message = `Navigating to page ${pageClicked}.`;
                }
                alert(message);
                // In a real application, this would load new content.
                // For now, just update active class visually:
                paginationLinks.forEach(pl => pl.classList.remove('current'));
                if(this.textContent !== '«' && this.textContent !== '»' && !this.querySelector('i')) { // Don't mark prev/next as current
                   this.classList.add('current');
                }
            });
        });
    }

});