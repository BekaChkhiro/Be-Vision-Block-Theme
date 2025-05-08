document.addEventListener('DOMContentLoaded', function() {
    /**
     * Enhanced mobile carousel for client testimonials
     * Fixed container overflow issues
     */
    
    // Configuration
    const MOBILE_BREAKPOINT = 767;
    const ACTIVE_DOT_COLOR = '#6653C6';
    const INACTIVE_DOT_COLOR = '#E0E0E0';
    
    // Mobile detection - check both server variable and screen width
    function isMobile() {
        // Use the server variable if available
        if (typeof isMobileDevice !== 'undefined') {
            return isMobileDevice;
        }
        return window.innerWidth <= MOBILE_BREAKPOINT;
    }
    
    // Setup mobile dots if they don't exist yet
    function setupMobileDots() {
        const testimonialBlocks = document.querySelectorAll('.wp-block-bevision-client-testimonials');
        
        testimonialBlocks.forEach(block => {
            // Check if dots already exist
            let dotsContainer = block.querySelector('.mobile-carousel-dots');
            if (!dotsContainer) {
                // Create dots container
                dotsContainer = document.createElement('div');
                dotsContainer.className = 'mobile-carousel-dots';
                
                // Get all cards
                const grid = block.querySelector('.testimonial-grid');
                if (!grid) return;
                
                const cards = grid.querySelectorAll('.testimonial-card');
                if (!cards.length) return;
                
                // Create a dot for each card
                cards.forEach((_, index) => {
                    const dot = document.createElement('button');
                    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
                    dot.style.width = '10px';
                    dot.style.height = '10px';
                    dot.style.borderRadius = '50%';
                    dot.style.border = 'none';
                    dot.style.padding = '0';
                    dot.style.cursor = 'pointer';
                    dot.style.backgroundColor = index === 0 ? ACTIVE_DOT_COLOR : INACTIVE_DOT_COLOR;
                    
                    dotsContainer.appendChild(dot);
                });
                
                // Add dots after the grid
                block.appendChild(dotsContainer);
            }
        });
    }
    
    // Initialize all testimonial blocks
    function initTestimonialCarousels() {
        // First ensure all blocks have dots for mobile
        setupMobileDots();
        
        const testimonialBlocks = document.querySelectorAll('.wp-block-bevision-client-testimonials');
        
        testimonialBlocks.forEach(block => {
            const grid = block.querySelector('.testimonial-grid');
            const dotsContainer = block.querySelector('.mobile-carousel-dots');
            
            if (!grid || !dotsContainer) return;
            
            const dots = dotsContainer.querySelectorAll('button');
            if (!dots.length) return;
            
            // Current slide tracking
            let currentSlide = 0;
            const cards = grid.querySelectorAll('.testimonial-card');
            
            // Ensure proper scrolling on mobile
            if (isMobile()) {
                // Make sure the grid is set up as a row
                grid.style.display = 'flex';
                grid.style.overflowX = 'auto';
                grid.style.scrollSnapType = 'x mandatory';
                grid.style.webkitOverflowScrolling = 'touch';
                grid.style.scrollbarWidth = 'none';
                grid.style.msOverflowStyle = 'none';
                
                // Make sure each card takes appropriate width
                cards.forEach(card => {
                    card.style.flex = '0 0 100%';
                    card.style.minWidth = '100%';
                    card.style.maxWidth = '100%';
                    card.style.scrollSnapAlign = 'center';
                    card.style.boxSizing = 'border-box';
                    card.style.marginRight = '15px';
                    card.style.width = '100%';
                });
                
                // Make sure dots are visible
                dotsContainer.style.display = 'flex';
            }
            
            // Handle dot clicks
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    goToSlide(index, cards, dots, grid);
                });
            });
            
            // Handle scrolling
            grid.addEventListener('scroll', function() {
                if (!isMobile()) return;
                
                // Debounce the scroll event
                clearTimeout(grid.scrollTimeout);
                grid.scrollTimeout = setTimeout(() => {
                    const scrollPos = grid.scrollLeft;
                    const cardWidth = cards[0].offsetWidth + 20; // Include margin
                    const index = Math.round(scrollPos / cardWidth);
                    
                    if (index !== currentSlide && index >= 0 && index < cards.length) {
                        currentSlide = index;
                        updateDots(dots, index);
                    }
                }, 50);
            });
            
            // Handle swipe on mobile
            let touchStartX = 0;
            
            grid.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            grid.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].screenX;
                handleSwipe(touchStartX, touchEndX, currentSlide, cards, dots, grid);
            }, { passive: true });
        });
    }
    
    // Navigate to a specific slide
    function goToSlide(index, cards, dots, grid) {
        if (index < 0 || index >= cards.length) return;
        
        // Calculate the exact position including margins
        const cardWidth = cards[0].offsetWidth + 20; // Include right margin
        
        // Use smoother scrolling
        grid.scrollTo({
            left: index * cardWidth,
            behavior: 'smooth'
        });
        
        updateDots(dots, index);
    }
    
    // Update the active dot
    function updateDots(dots, activeIndex) {
        dots.forEach((dot, index) => {
            dot.style.backgroundColor = (index === activeIndex) ? ACTIVE_DOT_COLOR : INACTIVE_DOT_COLOR;
        });
    }
    
    // Handle swipe gesture
    function handleSwipe(startX, endX, currentSlide, cards, dots, grid) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) < swipeThreshold) return;
        
        if (diff > 0 && currentSlide < cards.length - 1) {
            // Swipe left (next)
            goToSlide(currentSlide + 1, cards, dots, grid);
        } else if (diff < 0 && currentSlide > 0) {
            // Swipe right (previous)
            goToSlide(currentSlide - 1, cards, dots, grid);
        }
    }
    
    // Function to handle resize
    function handleResize() {
        if (isMobile()) {
            // Re-initialize on resize to mobile
            initTestimonialCarousels();
        } else {
            // Reset mobile-specific styles when returning to desktop
            document.querySelectorAll('.testimonial-grid').forEach(grid => {
                grid.style.display = '';
                grid.style.overflowX = '';
                grid.style.scrollSnapType = '';
                grid.style.webkitOverflowScrolling = '';
                grid.style.scrollbarWidth = '';
                grid.style.msOverflowStyle = '';
                
                const cards = grid.querySelectorAll('.testimonial-card');
                cards.forEach(card => {
                    card.style.flex = '';
                    card.style.minWidth = '';
                    card.style.scrollSnapAlign = '';
                    card.style.marginRight = '';
                });
            });
            
            // Hide mobile dots on desktop
            document.querySelectorAll('.mobile-carousel-dots').forEach(dots => {
                dots.style.display = 'none';
            });
        }
    }
    
    // Initialize on page load
    initTestimonialCarousels();
    
    // Handle window resize with debounce
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 100);
    });
    
    // Initial setup based on current device
    handleResize();
});
