document.addEventListener('DOMContentLoaded', () => {
    console.log("Resources page JavaScript loaded.");

    const resourceSearchForm = document.getElementById('resourceSearchForm');
    const zipCodeInput = document.getElementById('zipCodeInput');
    const resourceResultsContainer = document.getElementById('resourceResults');
    const resultsTitle = document.getElementById('resultsTitle');
    const noResultsMessage = document.getElementById('noResultsMessage');

    // Simulated placeholder data for resources
    // In a real application, this would come from a database/API
    const localResourcesData = {
        "78701": [ // Austin, TX (Example)
            { 
                name: "Downtown Austin Community Kitchen", 
                type: "Food Assistance", 
                address: "123 Congress Ave, Austin, TX 78701", 
                phone: "512-555-0100", 
                schedule: "Mon-Fri: 11 AM - 1 PM (Lunch)", 
                description: "Provides free hot meals to anyone in need. Redeeming Time Today often volunteers here." 
            },
            { 
                name: "Austin Shelter for Hope", 
                type: "Emergency Shelter", 
                address: "456 E 7th St, Austin, TX 78701", 
                phone: "512-555-0102", 
                schedule: "Intake: 4 PM - 6 PM daily", 
                description: "Overnight emergency shelter. Case management services available." 
            },
            {
                name: "Capital Area Job Link",
                type: "Employment Services",
                address: "789 Brazos St, Austin, TX 78701",
                phone: "512-555-0105",
                schedule: "Mon-Fri: 9 AM - 4 PM (Workshops weekly)",
                description: "Offers job search assistance, resume building, and skills workshops. Partnered with Redeeming Time Today."
            }
        ],
        "78704": [ // Another Austin Zip
            { 
                name: "South Austin Family Support", 
                type: "Family Services", 
                address: "101 S Lamar Blvd, Austin, TX 78704", 
                phone: "512-555-0110", 
                schedule: "Tue & Thu: 10 AM - 3 PM", 
                description: "Support for families including parenting classes and resource navigation." 
            },
            { 
                name: "Zilker Area Food Pantry", 
                type: "Food Assistance", 
                address: "202 Barton Springs Rd, Austin, TX 78704", 
                phone: "512-555-0112", 
                schedule: "Sat: 9 AM - 12 PM", 
                description: "Weekly food distribution for residents in the 78704 area." 
            }
        ],
        "90210": [ // Example for a different area
            { 
                name: "Beverly Hills Outreach", 
                type: "Counseling", 
                address: "789 Rodeo Dr, Beverly Hills, CA 90210", 
                phone: "310-555-0120", 
                schedule: "By appointment only", 
                description: "Free counseling services for individuals and families." 
            }
        ]
    };

    function displayResources(resources) {
        resourceResultsContainer.innerHTML = ''; // Clear previous results
        noResultsMessage.style.display = 'none';
        resultsTitle.style.display = 'block';

        if (!resources || resources.length === 0) {
            noResultsMessage.style.display = 'block';
            resultsTitle.style.display = 'none';
            return;
        }

        resources.forEach(resource => {
            const card = document.createElement('article');
            card.className = 'resource-card animate-on-scroll'; // Add animation class
            card.dataset.animation = 'fade-in-up'; // Specify animation type

            card.innerHTML = `
                <h3 class="resource-card__name">${resource.name}</h3>
                <p class="resource-card__type">${resource.type}</p>
                <p class="resource-card__info"><strong><i class="fas fa-map-marker-alt"></i> Address:</strong> ${resource.address || 'N/A'}</p>
                <p class="resource-card__info"><strong><i class="fas fa-phone"></i> Phone:</strong> ${resource.phone || 'N/A'}</p>
                <p class="resource-card__info"><strong><i class="fas fa-calendar-alt"></i> Schedule:</strong> ${resource.schedule || 'Call for details'}</p>
                ${resource.description ? `<p class="resource-card__description">${resource.description}</p>` : ''}
            `;
            resourceResultsContainer.appendChild(card);
        });
        
        // Re-initialize IntersectionObserver for newly added animated elements
        const newAnimatedElements = resourceResultsContainer.querySelectorAll('.animate-on-scroll');
        if (newAnimatedElements.length > 0 && typeof IntersectionObserver !== 'undefined') {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: "0px 0px -20px 0px" });
            newAnimatedElements.forEach(el => observer.observe(el));
        }
    }

    if (resourceSearchForm) {
        resourceSearchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const zip = zipCodeInput.value.trim();
            
            if (zip.length === 5 && /^\d+$/.test(zip)) { // Basic 5-digit zip validation
                const foundResources = localResourcesData[zip];
                displayResources(foundResources);
            } else {
                alert("Please enter a valid 5-digit zip code.");
                resourceResultsContainer.innerHTML = ''; // Clear results on invalid input
                resultsTitle.style.display = 'none';
                noResultsMessage.style.display = 'none';
            }
        });
    }

    // Handle Newsletter Form Submission specifically for this page
    const newsletterFormResources = document.getElementById('newsletterFormResources');
    if (newsletterFormResources) {
        newsletterFormResources.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterFormResources.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '' && emailInput.checkValidity()) {
                alert('Thank you for subscribing to Redeeming Time Today resource updates!');
                newsletterFormResources.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Update year in resources page footer
    const footerYearResources = document.getElementById('footerYearResources');
    if (footerYearResources) {
        footerYearResources.textContent = new Date().getFullYear().toString();
    }
});