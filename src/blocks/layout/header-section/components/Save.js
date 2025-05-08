import React from 'react';
import { useBlockProps } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
    const blockProps = useBlockProps.save({
        style: {
            backgroundColor: attributes.backgroundColor,
            position: 'sticky',
            top: 0,
            zIndex: 1000,
        }
    });

    // Add mobile styles with a style tag
    const mobileStyles = `
        @media (max-width: 768px) {
            .header-container {
                flex-direction: column !important;
                padding: 15px 20px !important;
            }
            .main-navigation {
                display: none !important;
            }
            .mobile-menu-toggle {
                display: block !important;
                order: 3;
            }
            .right-section {
                display: none !important;
            }
            .language-selector-mobile {
                display: flex !important;
                align-items: center !important;
                gap: 0.5rem !important;
                margin-right: 15px !important;
            }
            .mobile-nav-container {
                display: flex !important;
                width: 100% !important;
                justify-content: space-between !important;
                align-items: center !important;
            }
            /* Mobile menu styles */
            .mobile-menu-close:hover {
                color: #6c5ce7;
            }
            .mobile-menu a:hover {
                color: #6c5ce7 !important;
            }
        }
    `;

    return (
        <>
            <style>{mobileStyles}</style>
            <header {...blockProps}>
                <div className="header-container" style={{
                    maxWidth: '1440px',
                    margin: '0 auto',
                    padding: '25px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div className="mobile-nav-container">
                        <div className="logo-section">
                            <a href="/">
                                <img 
                                    src={attributes.logo} 
                                    alt="Logo" 
                                    style={{
                                        height: `${attributes.logoHeight}px`,
                                        width: attributes.logoWidth === 'auto' ? 'auto' : `${attributes.logoWidth}px`,
                                        objectFit: 'contain'
                                    }} 
                                />
                            </a>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {/* Mobile Language Selector */}
                            <div className="language-selector-mobile" style={{
                                display: 'none',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <img 
                                    src={attributes.languageFlag} 
                                    alt="Language Flag" 
                                    style={{
                                        width: `${attributes.languageFlagSize}px`,
                                        height: `${attributes.languageFlagSize}px`
                                    }} 
                                />
                                <span>{attributes.languageText}</span>
                            </div>
                            
                            {/* Mobile Menu Toggle */}
                            <button 
                                className="mobile-menu-toggle" 
                                style={{
                                    display: 'none',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '5px'
                                }}
                                aria-label="Toggle menu"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 12H21" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M3 6H21" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M3 18H21" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                   <div style={{
                        display: 'flex',
                        gap: '15px',
                        alignItems: 'center',
                    }}>
                        {/* Navigation Menu */}
                        <nav className="main-navigation" style={{
                            display: 'flex',
                            gap: '2rem'
                        }}>
                            {attributes.menuItems.map((item, index) => (
                                attributes.submenuEnabled ? (
                                    <div key={index} className="menu-item-with-description" style={{
                                        background: '#fff',
                                        padding: '20px',
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                                        transition: 'all 0.3s ease',
                                        width: '220px'
                                    }}>
                                        <a 
                                            href={item.url} 
                                            className="menu-item-title"
                                            style={{ 
                                                fontSize: '18px',
                                                fontWeight: 'bold',
                                                color: '#333',
                                                marginBottom: '8px',
                                                display: 'block'
                                            }}
                                        >
                                            {item.text}
                                        </a>
                                        <span className="menu-item-description" style={{
                                            color: '#777',
                                            fontSize: '14px',
                                            lineHeight: '1.4'
                                        }}>
                                            {item.description}
                                        </span>
                                    </div>
                                ) : (
                                    <a 
                                        key={index} 
                                        href={item.url} 
                                        style={{ color: '#333', textDecoration: 'none' }}
                                    >
                                        {item.text}
                                    </a>
                                )
                            ))}
                        </nav>

                        {/* Right Section */}
                        <div className="right-section" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            {/* Language Selector */}
                            <div className="language-selector" style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <img 
                                    src={attributes.languageFlag} 
                                    alt="Language Flag" 
                                    style={{
                                        width: `${attributes.languageFlagSize}px`,
                                        height: `${attributes.languageFlagSize}px`
                                    }} 
                                />
                                <span>{attributes.languageText}</span>
                            </div>

                            {/* Demo Button */}
                            <button 
                                id="header-demo-button"
                                className="demo-button" 
                                style={{
                                    backgroundColor: attributes.buttonColor,
                                    color: attributes.buttonTextColor,
                                    padding: `${attributes.buttonPaddingV}px ${attributes.buttonPaddingH}px`,
                                    borderRadius: `${attributes.buttonBorderRadius}px`,
                                    textDecoration: 'none',
                                    fontWeight: attributes.buttonFontWeight,
                                    fontSize: `${attributes.buttonFontSize}px`,
                                    display: 'inline-block',
                                    transition: 'all 0.3s ease',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                {attributes.buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            
            {/* Lead Popup */}
            <div id="bevision-lead-popup" className="bevision-lead-popup" style={{ display: 'none' }}>
                <button className="popup-close">&times;</button>
                <div className="popup-content">
                    <h2 className="popup-title">Request a demo</h2>
                    <p className="popup-subtitle">Please enter your name and number, we will contact you shortly</p>
                    
                    <form id="lead-form" className="popup-form">
                        <input type="hidden" id="lead_form_nonce" name="lead_form_nonce" value="" />
                        <div className="form-group">
                            <input type="text" id="name" name="name" placeholder="Your name" required />
                        </div>
                        <div className="form-group">
                            <input type="text" id="company" name="company" placeholder="Company" required />
                        </div>
                        <div className="form-group">
                            <input type="tel" id="phone" name="phone" placeholder="Phone number" required />
                        </div>
                        <div className="form-group">
                            <input type="email" id="email" name="email" placeholder="Email" required />
                        </div>
                        <div className="form-buttons">
                            <button 
                                type="submit"
                                className="submit-button"
                                style={{
                                    backgroundColor: '#6c5ce7',
                                    color: '#ffffff'
                                }}
                            >
                                Request
                            </button>
                            <button 
                                type="button"
                                className="cancel-button"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                    <div id="success-message" className="success-message" style={{ display: 'none' }}>
                        Thank you for your submission! We will contact you shortly.
                    </div>
                </div>
            </div>
            <div id="popup-overlay" className="popup-overlay" style={{ display: 'none' }}></div>
            
            {/* Mobile Menu JavaScript */}
            <script src="/wp-content/themes/BeVision/assets/js/mobile-menu.js"></script>
        </>
    );
};

export default Save;
