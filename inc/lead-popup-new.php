<?php
/**
 * New Lead Popup Implementation
 * Direct inline implementation to bypass all caching
 */

// Function to output the popup HTML
function bevision_render_new_lead_popup() {
    // Don't show popup in admin or login page
    if (is_admin() || $GLOBALS['pagenow'] === 'wp-login.php') {
        return;
    }
    
    // Create nonce for the form
    $nonce = wp_create_nonce('bevision_lead_form');
    
    // Popup HTML with inline styles
    ?>
    <style>
    /* Inline styles for the popup - will bypass caching */
    #bevision-new-popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        padding: 15px;
        border-radius: 12px;
        box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);
        z-index: 2001;
        max-width: 460px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
    }
    
    /* Container for the form and success message */
    .popup-content-container {
        position: relative;
    }

    #new-popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 2000;
    }

    .new-popup-header {
        position: relative;
        padding: 25px 25px 0px;
    }

    .new-popup-content {
        padding: 0 25px 25px;
    }

    .new-popup-close {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 30px;
        background: none;
        border: none;
        cursor: pointer;
        color: #888;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        transition: all 0.3s ease;
    }

    .new-popup-close:hover {
        color: #333;
    }

    .new-popup-title {
        margin-top: 0;
        margin-bottom: 0;
        color: var(--Dark-Blue, #221A4C);
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

    .new-popup-subtitle {
        margin: 25px 0px 15px;
        color: var(--Grey, #8399AF);
        font-family: "Helvetica Neue LT GEO";
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    .new-popup-form .new-form-group {
        margin-bottom: 20px;
    }

    .new-popup-form input {
        width: 100%;
        padding: 15px 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 16px;
        color: #333;
        box-sizing: border-box;
    }

    .new-popup-form input:focus {
        outline: none;
        border-color: #6c62fd;
        box-shadow: 0 0 0 2px rgba(108, 98, 253, 0.1);
    }

    .new-popup-form input::placeholder {
        color: #aab7c4;
    }

    .new-form-buttons {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        margin-top: 25px;
    }

    .new-submit-button, 
    .new-cancel-button {
        flex: 1;
        border-radius: 10px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: center;
    }

    .new-submit-button {
        background-color: #6c62fd;
        color: #fff;
        border: none;
        padding: 10px 40px;
        height: 50px;
    }

    .new-submit-button:hover {
        background-color: #5a52d5;
    }

    .new-cancel-button {
        color: #6e7c90;
        border: none;
        padding: 15px 20px;
        height: 50px;
    }

    .new-cancel-button:hover {
        background-color: #e8eaed;
    }

    .new-success-message {
        padding: 25px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .new-success-icon {
        margin-bottom: 20px;
    }

    .new-success-title {
        font-size: 24px;
        font-weight: 600;
        color: #333356;
        margin: 0 0 10px 0;
    }

    .new-success-subtitle {
        font-size: 16px;
        color: #6e7c90;
        margin: 0 0 30px 0;
    }

    .new-close-button {
        background-color: transparent;
        border: none;
        color: #6e7c90;
        font-size: 16px;
        padding: 10px 20px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .new-close-button:hover {
        color: #333356;
    }

    /* Responsive adjustments */
    @media (max-width: 576px) {
        #bevision-new-popup {
            width: 95%;
        }
        
        .new-popup-title {
            font-size: 18px;
        }
        
        .new-popup-header {
            padding: 15px 15px 0px;
        }
        
        .new-popup-content {
            padding: 0 15px 15px;
        }
    }
    </style>
    
    <div id="bevision-new-popup" style="display: none;">
        <div class="new-popup-header">
            <h2 class="new-popup-title">მოითხოვე დემო</h2>
            <button class="new-popup-close">&times;</button>
        </div>
        <div class="new-popup-content">
            <p class="new-popup-subtitle">გთხოვთ, შეიყვანოთ თქვენი სახელი და ნომერი, ჩვენ მალე დაგიკავშირდებით</p>
            
            <div id="demo-form-wrapper">
                <!-- Form (Initially Visible) -->
                <div id="form-part" style="display: block;" class="new-popup-form">
                    <div class="new-form-group">
                        <input type="text" name="name" id="lead-name" placeholder="შენი სახელი" required class="new-form-input validate-field" />
                    </div>
                    <div class="new-form-group">
                        <input type="text" name="company" id="lead-company" placeholder="კომპანია" required class="new-form-input validate-field" />
                    </div>
                    <div class="new-form-group">
                        <input type="tel" name="phone" id="lead-phone" placeholder="ტელეფონის ნომერი" required class="new-form-input validate-field" />
                    </div>
                    <div class="new-form-group">
                        <input type="email" name="email" id="lead-email" placeholder="ელ-ფოსტა" required class="new-form-input validate-field" />
                    </div>
                    <div class="new-form-buttons">
                        <button type="button" id="lead-submit-button" class="new-submit-button" onclick="validateAndSubmit();" disabled style="opacity: 0.6; cursor: not-allowed;">მოთხოვნა</button>
                        <button type="button" class="new-cancel-button" onclick="document.getElementById('bevision-new-popup').style.display='none'; document.getElementById('new-popup-overlay').style.display='none';">გაუქმება</button>
                    </div>
                </div>
                
                <!-- Success (Initially Hidden) -->
                <div id="success-part" style="display: none; padding: 25px; text-align: center;">
                    <div style="margin-bottom: 30px;">
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M71.5833 8.33331L40 40M71.5833 8.33331L54.5833 71.6666L40 40M71.5833 8.33331L8.33331 25.4166L40 40" stroke="#6653C6" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <h3 style="font-size: 28px; font-weight: 600; color: #22215B; margin: 0 0 15px 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">თქვენი მოთხოვნა გაგზავნილია</h3>
                    <p style="font-size: 18px; color: #6e7c90; margin: 0 0 30px 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">მალე დაგიკავშირდებით</p>
                    <button type="button" style="background-color: transparent; border: none; color: #6e7c90; font-size: 16px; padding: 10px 30px; cursor: pointer; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;" onclick="document.getElementById('bevision-new-popup').style.display='none'; document.getElementById('new-popup-overlay').style.display='none';">დახურვა</button>
                </div>
            </div>
            
            <script>
            function hideThisShowThat(hideId, showId) {
                // Extra logging to debug
                console.log('Function called with:', hideId, showId);
                console.log('Elements:', document.getElementById(hideId), document.getElementById(showId));
                
                // Hide first element
                var hideElement = document.getElementById(hideId);
                if (hideElement) {
                    hideElement.style.display = 'none';
                    console.log('Hidden:', hideId);
                }
                
                // Show second element
                var showElement = document.getElementById(showId);
                if (showElement) {
                    showElement.style.display = 'block';
                    console.log('Showing:', showId);
                }
            }
            
            // Form validation function
            function validateAndSubmit() {
                // Get all form fields
                var nameField = document.getElementById('lead-name');
                var companyField = document.getElementById('lead-company');
                var phoneField = document.getElementById('lead-phone');
                var emailField = document.getElementById('lead-email');
                
                // Basic validation
                if (nameField.value.trim() === '' || 
                    companyField.value.trim() === '' || 
                    phoneField.value.trim() === '' || 
                    emailField.value.trim() === '') {
                    
                    // Show error if any field is empty
                    alert('Please fill in all fields');
                    return false;
                }
                
                // Additional email validation
                var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value.trim())) {
                    alert('Please enter a valid email address');
                    return false;
                }
                
                // If all validation passes, show success message
                hideThisShowThat('form-part', 'success-part');
                return true;
            }
            
            // Function to check if all fields are filled and enable/disable submit button
            function checkFormValidity() {
                var nameField = document.getElementById('lead-name');
                var companyField = document.getElementById('lead-company');
                var phoneField = document.getElementById('lead-phone');
                var emailField = document.getElementById('lead-email');
                var submitButton = document.getElementById('lead-submit-button');
                
                if (nameField.value.trim() !== '' && 
                    companyField.value.trim() !== '' && 
                    phoneField.value.trim() !== '' && 
                    emailField.value.trim() !== '') {
                    
                    // Enable button if all fields have values
                    submitButton.disabled = false;
                    submitButton.style.opacity = '1';
                    submitButton.style.cursor = 'pointer';
                } else {
                    // Disable button if any field is empty
                    submitButton.disabled = true;
                    submitButton.style.opacity = '0.6';
                    submitButton.style.cursor = 'not-allowed';
                }
            }
            
            // Add input event listeners to all form fields
            document.addEventListener('DOMContentLoaded', function() {
                var validateFields = document.querySelectorAll('.validate-field');
                validateFields.forEach(function(field) {
                    field.addEventListener('input', checkFormValidity);
                });
            });
            </script>
        </div>
    </div>
    <div id="new-popup-overlay" style="display: none;"></div>
    
    <script>
    // Define ajaxurl for front-end
    var ajaxurl = '<?php echo esc_url(admin_url('admin-ajax.php')); ?>';
    
    // Global function to open the popup - can be called from any block or element
    function openPopup(popupId) {
        // If popup ID is provided, use that, otherwise use the default
        const popupElement = popupId ? document.getElementById(popupId) : document.getElementById('bevision-new-popup');
        const overlayElement = document.getElementById('new-popup-overlay');
        
        if (popupElement && overlayElement) {
            popupElement.style.display = 'block';
            overlayElement.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    }
    
    // Inline JavaScript for the popup - will bypass caching
    document.addEventListener('DOMContentLoaded', function() {
        // Add event to show demo popup
        const addDemoEvents = function() {
            // Get elements
            const popup = document.getElementById('bevision-new-popup');
            const overlay = document.getElementById('new-popup-overlay');
            const closeButton = document.querySelector('.new-popup-close');
            const cancelButtons = document.querySelectorAll('.new-cancel-button'); // Get all cancel buttons
            const formPart = document.getElementById('form-part');
            const successPart = document.getElementById('success-part');
            
            // Local reference to global openPopup function
            const openLocalPopup = function() {
                openPopup('bevision-new-popup');
            }
            
            // Function to close popup
            function closePopup() {
                if (popup && overlay) {
                    popup.style.display = 'none';
                    overlay.style.display = 'none';
                    document.body.style.overflow = ''; // Enable scrolling
                }
            }
            
            // Close popup when X button is clicked
            if (closeButton) {
                closeButton.addEventListener('click', closePopup);
            }
            
            // Close popup when overlay is clicked
            if (overlay) {
                overlay.addEventListener('click', closePopup);
            }
            
            // Close popup when cancel buttons are clicked
            if (cancelButtons && cancelButtons.length > 0) {
                cancelButtons.forEach(function(button) {
                    button.addEventListener('click', closePopup);
                });
            }
            
            // Add event listeners to all close buttons in the popup
            document.querySelectorAll('#bevision-new-popup button').forEach(function(button) {
                // Check if button has onclick that contains 'style.display='none'' - these are our close buttons
                if (button.getAttribute('onclick') && 
                    button.getAttribute('onclick').includes('bevision-new-popup') && 
                    button.getAttribute('onclick').includes('style.display=\'none\'')) {
                    
                    // Remove the inline onclick
                    const onclickValue = button.getAttribute('onclick');
                    button.removeAttribute('onclick');
                    
                    // Add proper event listener
                    button.addEventListener('click', function() {
                        closePopup();
                        
                        // Reset the form if we're coming from success screen
                        if (successPart && formPart) {
                            setTimeout(function() {
                                successPart.style.display = 'none';
                                formPart.style.display = 'block';
                            }, 300);
                        }
                    });
                }
            });
            
            // Add event to all buttons with specific classes we know about
            const allDemoButtons = document.querySelectorAll('.demo-button, a[href*="#demo"], a[href*="contact"], #header-demo-button, [class*="demo"], [id*="demo"], .open-lead-popup');
            
            // Specifically for the Book a Call buttons in products block
            document.querySelectorAll('.open-lead-popup').forEach(function(button) {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    openLocalPopup();
                    console.log('Opening popup from Book a Call button');
                });
            });
            
            // Find all elements that might be demo buttons based on text content
            document.querySelectorAll('a, button').forEach(function(el) {
                // Check if the element text contains demo or request
                if (el.textContent.toLowerCase().includes('demo') || 
                    el.textContent.toLowerCase().includes('request') || 
                    el.classList.toString().toLowerCase().includes('demo') || 
                    (el.id && el.id.toLowerCase().includes('demo')) ||
                    (el.href && el.href.toLowerCase().includes('demo'))) {
                    
                    el.addEventListener('click', function(e) {
                        e.preventDefault();
                        openLocalPopup();
                        console.log('Opening popup from text match:', el.textContent);
                    });
                }
            });
            
            // Also add events to the specific class-based demo buttons
            allDemoButtons.forEach(function(button) {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    openLocalPopup();
                    console.log('Opening popup from class selector:', button.className || button.id);
                });
            });
            
            // Uncomment this in development if needed for testing
            /*
            // Create a visible button to open the popup
            const demoButton = document.createElement('button');
            demoButton.innerHTML = 'Open Demo Popup';
            demoButton.style.position = 'fixed';
            demoButton.style.top = '20px';
            demoButton.style.right = '20px';
            demoButton.style.padding = '10px 20px';
            demoButton.style.backgroundColor = '#6c62fd';
            demoButton.style.color = 'white';
            demoButton.style.border = 'none';
            demoButton.style.borderRadius = '5px';
            demoButton.style.cursor = 'pointer';
            demoButton.style.zIndex = '9999';
            demoButton.style.fontWeight = 'bold';
            
            demoButton.addEventListener('click', function() {
                openLocalPopup();
            });
            
            document.body.appendChild(demoButton);
            */
            
            // Direct approach - just show success message on button click
            const manualSubmitButton = document.getElementById('manual-submit');
            const formContainer = document.getElementById('form-container');
            const successMessage = document.getElementById('new-success-message');
            
            if (manualSubmitButton) {
                manualSubmitButton.addEventListener('click', function() {
                    console.log('Manual submit button clicked');
                    
                    // Hide form container
                    if (formContainer) {
                        formContainer.style.display = 'none';
                    }
                    
                    // Show success message
                    if (successMessage) {
                        successMessage.style.display = 'flex';
                    }
                });
            }
        };
        
        // Run this code on page load
        addDemoEvents();
        
        // Also run it after a short delay to ensure it works even if page loads slowly
        setTimeout(addDemoEvents, 1000);
    });
    </script>
    <?php
}

// Hook to add the new popup to the footer
function bevision_add_new_lead_popup_to_footer() {
    bevision_render_new_lead_popup();
}
add_action('wp_footer', 'bevision_add_new_lead_popup_to_footer', 999);
