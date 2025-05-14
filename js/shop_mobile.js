document.addEventListener('DOMContentLoaded', () => {
    // This file is for shop-specific JavaScript.
    // For now, most global functionalities (preloader, header, nav, animations)
    // are handled by js/index_mobile.js, which should also be linked in shop_mobile.html.

    console.log("Shop page JavaScript loaded.");

    // Example: Smooth scroll to products if there's an intro button
    const scrollToProductsBtn = document.getElementById('scrollToProductsBtn'); // If you add such a button
    if (scrollToProductsBtn) {
        scrollToProductsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const productsSection = document.getElementById('products');
            if (productsSection) {
                const headerOffset = document.getElementById('siteHeader') ? document.getElementById('siteHeader').offsetHeight : 0;
                const elementPosition = productsSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Handle Newsletter Form Submission specifically for this page if ID is unique
    const newsletterFormShop = document.getElementById('newsletterFormShop');
    if (newsletterFormShop) {
        newsletterFormShop.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterFormShop.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '' && emailInput.checkValidity()) {
                alert('Thank you for subscribing to Redeeming Time Today! (This is a demo feature from shop page)');
                newsletterFormShop.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Update year in shop page footer if ID is unique
    const footerYearShop = document.getElementById('footerYearShop');
    if (footerYearShop) {
        footerYearShop.textContent = new Date().getFullYear().toString();
    }

    // Add any shop-specific interactions here, e.g.:
    // - Product filtering
    // - "Add to Cart" functionality (when you implement a cart)
    // - Image gallery lightboxes for product details (if on this page)
});