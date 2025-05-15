document.addEventListener('DOMContentLoaded', () => {
    console.log("Blog Post Detail page JavaScript loaded.");

    // This page might not need much specific JS initially,
    // but could be used for things like:
    // - Image lightboxes
    // - Comment section interactions (if added later)
    // - Dynamic loading of related posts

    // Handle Newsletter Form Submission specifically for this page if ID is unique
    const newsletterFormDetail = document.getElementById('newsletterFormDetail');
    if (newsletterFormDetail) {
        newsletterFormDetail.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterFormDetail.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '' && emailInput.checkValidity()) {
                alert('Thank you for subscribing to Redeeming Time Today updates!');
                newsletterFormDetail.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Update year in blog post detail page footer if ID is unique
    const footerYearDetail = document.getElementById('footerYearDetail');
    if (footerYearDetail) {
        footerYearDetail.textContent = new Date().getFullYear().toString();
    }

    // Social Share button functionality (simple window.open for this example)
    const socialShareButtons = document.querySelectorAll('.social-share-btn');
    socialShareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const service = this.getAttribute('aria-label').split('on ')[1]?.toLowerCase() || this.getAttribute('aria-label').split('via ')[1]?.toLowerCase();
            const urlToShare = window.location.href;
            const postTitle = document.querySelector('.blog-post-full__title')?.textContent || "Check out this story from Redeeming Time Today";
            let shareUrl = '';

            switch(service) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`;
                    break;
                case 'x': // For X (formerly Twitter)
                    shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(urlToShare)}&text=${encodeURIComponent(postTitle)}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(urlToShare)}&title=${encodeURIComponent(postTitle)}`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=${encodeURIComponent(postTitle)}&body=Check out this story from Redeeming Time Today: ${encodeURIComponent(urlToShare)}`;
                    window.location.href = shareUrl; // For mailto, directly set href
                    return; // Exit early for mailto
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
            }
        });
    });

});