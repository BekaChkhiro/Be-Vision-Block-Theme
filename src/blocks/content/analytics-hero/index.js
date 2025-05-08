import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { RichText, MediaUpload, InnerBlocks } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

const blockStyle = `
    /* Mobile start exploring button */
    .mobile-start-exploring {
        display: block;
        width: 100%;
        padding: 15px 0;
        background-color: #2FCA02;
        color: white;
        border-radius: 10px;
        text-decoration: none;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        margin-top: 30px;
        box-shadow: 0 4px 8px rgba(47, 202, 2, 0.15);
        transition: background-color 0.3s;
    }
    
    /* Hide on desktop, show on mobile */
    .mobile-button-container {
        display: none;
        margin-top: 20px;
        padding: 0 20px;
    }
    
    @media (max-width: 768px) {
        .mobile-button-container {
            display: block;
            margin-top: 30px;
            width: 100%;
        }
    }

    .analytics-hero__container {
        max-width: 1320px;
        margin: 60px auto 70px;
        padding: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 60px;
        border-radius: 20px;
        background: linear-gradient(97deg, rgba(47, 202, 2, 0.10) 3.08%, rgba(102, 83, 198, 0.10) 96.79%);
    }

    .analytics-hero__content {
        flex: 0 0 50%;
    }

    .analytics-hero__subtitle {
        color: var(--Malina, #2FCA02);
        font-size: 24px;
        font-style: normal;
        font-weight: 750;
        line-height: normal;
        margin: 0 0 10px;
    }

    .analytics-hero__title {
        color: var(--Dark-Blue, #221A4C);
        font-family: "Helvetica Neue LT GEO";
        font-size: 40px;
        font-style: normal;
        font-weight: 750;
        line-height: normal;
        margin: 0 0 20px;
    }

    .analytics-hero__description {
        color: var(--Grey, #8399AF);
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin: 0 0 57px;
    }

    /* Desktop CTA button */
    .analytics-hero__content .wp-block-button,
    .analytics-hero__cta .wp-block-button {
        margin-bottom: 0;
        display: inline-block;
    }
    
    .analytics-hero__button .wp-element-button,
    .analytics-hero__content .wp-element-button {
        padding: 15px 40px !important;
        justify-content: center !important;
        align-items: center !important;
        gap: 10px !important;
        border-radius: 10px !important;
        background: var(--Malina, #2FCA02) !important;
        color: white !important;
        text-decoration: none !important;
        border: none !important;
        transition: transform 0.2s ease !important;
        font-size: 16px !important;
        cursor: pointer !important;
    }
    
    /* Hide mobile CTA on desktop */
    .analytics-hero__cta-mobile {
        display: none;
    }
    
    /* Mobile button styles */
    .analytics-hero__mobile-button {
        display: none;
        width: 100%;
        padding: 15px 40px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border-radius: 10px;
        background: var(--Malina, #2FCA02);
        color: white;
        text-decoration: none;
        border: none;
        font-size: 16px;
        cursor: pointer;
        text-align: center;
        margin-top: 20px;
    }
    
    /* Make sure inner blocks content is visible */
    .analytics-hero__cta-mobile .wp-block-button {
        display: block;
        width: 100%;
    }

    .analytics-hero__button.wp-element-button:hover {
        transform: translateY(-2px);
        background: #29b502 !important;
        color: white !important;
    }

    .analytics-hero__image {
        flex: 0 0 40%;
    }

    .analytics-hero__image img {
        width: 100%;
        height: auto;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    }

    .analytics-hero__image-button {
        width: 100%;
        height: 300px;
        background: rgba(255, 255, 255, 0.1);
        border: 2px dashed rgba(255, 255, 255, 0.3);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .analytics-hero__image-button:hover {
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.4);
    }
    
    /* Dashboard admin UI styles */
    .analytics-hero__mobile-dashboards {
        margin-top: 30px;
        border-top: 1px solid #e0e0e0;
        padding-top: 20px;
    }
    
    .analytics-hero__dashboard-title {
        margin-bottom: 15px;
        font-size: 16px;
        color: #333;
    }
    
    .analytics-hero__dashboard-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
    }
    
    .analytics-hero__dashboard-item {
        position: relative;
        border: 1px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
    }
    
    .analytics-hero__dashboard-item img {
        width: 100%;
        height: auto;
        display: block;
    }
    
    .analytics-hero__dashboard-remove {
        position: absolute;
        top: 5px;
        right: 5px;
        background: rgba(255, 0, 0, 0.7) !important;
        color: white !important;
        border: none !important;
        border-radius: 3px !important;
        padding: 2px 8px !important;
        font-size: 11px !important;
    }
    
    .analytics-hero__dashboard-add {
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f8f8f8 !important;
        border: 1px dashed #ccc !important;
        color: #555 !important;
        font-size: 14px !important;
    }
    
    /* Frontend mobile dashboard grid */
    .analytics-hero__mobile-dashboard-grid {
        display: none;
    }
    
    /* Hide the desktop CTA in mobile view */
    .analytics-hero__cta {
        display: block;
    }

    @media (max-width: 768px) {
        .analytics-hero {
            padding: 0;
        }

        .analytics-hero__container {
            flex-direction: column;
            text-align: left;
            padding: 30px 20px 80px; /* Added extra padding at bottom */
            margin: 0;
            border-radius: 0;
            gap: 30px;
            background: linear-gradient(97deg, rgba(47, 202, 2, 0.10) 3.08%, rgba(102, 83, 198, 0.10) 96.79%);
            position: relative; /* For absolute positioning of mobile CTA */
        }

        .analytics-hero__content {
            flex: 0 0 100%;
            padding: 0 20px;
        }

        .analytics-hero__subtitle {
            font-size: 18px;
            margin-bottom: 8px;
            display: block;
        }

        .analytics-hero__title {
            font-size: 30px;
            line-height: 1.2;
            margin-bottom: 16px;
            color: #221A4C;
            font-weight: 750;
        }

        .analytics-hero__description {
            font-size: 16px;
            line-height: 1.4;
            margin-bottom: 30px;
            color: #8399AF;
            font-weight: 400;
        }

        /* Style the image container for mobile */
        .analytics-hero__image {
            flex: 0 0 100%;
            padding: 0 20px;
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        /* Style the image display for mobile */
        .analytics-hero__desktop-img {
            width: 100%;
            height: auto;
            margin: 0 0 20px;
            border-radius: 10px;
            display: block;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        
        /* Hide the mobile dashboard grid since we're using main image */
        .analytics-hero__mobile-dashboard-grid {
            display: none;
        }
        
        /* Hide the desktop CTA in mobile view */
        .analytics-hero__cta {
            display: none;
        }


        
        .analytics-hero__cta-mobile .wp-block-button {
            width: 100%;
        }
        
        .analytics-hero__cta-mobile .wp-element-button {
            width: 100%;
            display: block;
            padding: 16px 20px !important;
            text-align: center;
            border-radius: 10px !important;
            background: #2FCA02 !important;
            color: white !important;
            font-size: 16px !important;
            font-weight: 500 !important;
            text-transform: none !important;
            box-shadow: 0 4px 10px rgba(47, 202, 2, 0.2) !important;
        }
    }
`;

registerBlockType('bevision/analytics-hero', {
    title: __('Analytics Hero', 'bevision'),
    description: __('Analytics Hero section with dashboard mockups', 'bevision'),
    category: 'bevision',
    icon: 'chart-line',
    attributes: {
        subtitle: {
            type: 'string',
            default: 'Bihub.ge'
        },
        title: {
            type: 'string',
            default: 'The first open platform for public data analytics'
        },
        description: {
            type: 'string',
            default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
        },
        imageUrl: {
            type: 'string',
            default: ''
        },
        imageId: {
            type: 'number'
        },
        dashboardImages: {
            type: 'array',
            default: []
        }
    },
    edit: ({ attributes, setAttributes }) => {
        const { subtitle, title, description, imageUrl, dashboardImages } = attributes;

        return (
            <div className="analytics-hero">
                <style>{blockStyle}</style>
                <div className="analytics-hero__container">
                    <div className="analytics-hero__content">
                        <RichText
                            tagName="h3"
                            className="analytics-hero__subtitle"
                            value={subtitle}
                            onChange={(subtitle) => setAttributes({ subtitle })}
                            placeholder={__('Enter subtitle...', 'bevision')}
                        />
                        <RichText
                            tagName="h1"
                            className="analytics-hero__title"
                            value={title}
                            onChange={(title) => setAttributes({ title })}
                            placeholder={__('Enter title...', 'bevision')}
                        />
                        <RichText
                            tagName="p"
                            className="analytics-hero__description"
                            value={description}
                            onChange={(description) => setAttributes({ description })}
                            placeholder={__('Enter description...', 'bevision')}
                        />
                        <div className="analytics-hero__cta">
                            <InnerBlocks
                                template={[
                                    ['core/button', { 
                                        text: 'Start exploring',
                                        className: 'analytics-hero__button wp-element-button',
                                        backgroundColor: 'transparent',
                                        style: {
                                            spacing: {
                                                padding: {
                                                    top: "10px",
                                                    bottom: "10px",
                                                    left: "40px",
                                                    right: "40px"
                                                }
                                            }
                                        }
                                    }]
                                ]}
                                templateLock="all"
                            />
                        </div>
                    </div>
                    <div className="analytics-hero__image">
                        {/* Desktop image */}
                        <div className="analytics-hero__desktop-image">
                            <MediaUpload
                                onSelect={(media) => {
                                    setAttributes({
                                        imageUrl: media.url,
                                        imageId: media.id
                                    });
                                }}
                                type="image"
                                value={attributes.imageId}
                                render={({ open }) => (
                                    imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            onClick={open}
                                            style={{ cursor: 'pointer' }}
                                            alt={__('Hero image', 'bevision')}
                                        />
                                    ) : (
                                        <Button
                                            className="analytics-hero__image-button"
                                            onClick={open}
                                        >
                                            {__('Upload Desktop Image', 'bevision')}
                                        </Button>
                                    )
                                )}
                            />
                        </div>
                        
                        {/* Mobile dashboard images */}
                        <div className="analytics-hero__mobile-dashboards">
                            <h4 className="analytics-hero__dashboard-title">{__('Mobile Dashboard Images (up to 6)', 'bevision')}</h4>
                            <div className="analytics-hero__dashboard-grid">
                                {dashboardImages.map((image, index) => (
                                    <div key={index} className="analytics-hero__dashboard-item">
                                        <img 
                                            src={image.url} 
                                            alt={__('Dashboard', 'bevision')} 
                                        />
                                        <Button 
                                            isSmall 
                                            className="analytics-hero__dashboard-remove" 
                                            onClick={() => {
                                                const newImages = [...dashboardImages];
                                                newImages.splice(index, 1);
                                                setAttributes({ dashboardImages: newImages });
                                            }}
                                        >
                                            {__('Remove', 'bevision')}
                                        </Button>
                                    </div>
                                ))}
                                
                                {dashboardImages.length < 6 && (
                                    <MediaUpload
                                        onSelect={(media) => {
                                            const newImage = {
                                                id: media.id,
                                                url: media.url
                                            };
                                            setAttributes({
                                                dashboardImages: [...dashboardImages, newImage]
                                            });
                                        }}
                                        type="image"
                                        render={({ open }) => (
                                            <Button 
                                                className="analytics-hero__dashboard-add" 
                                                onClick={open}
                                            >
                                                {__('+ Add Dashboard Image', 'bevision')}
                                            </Button>
                                        )}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    save: ({ attributes }) => {
        const { subtitle, title, description, imageUrl, dashboardImages } = attributes;

        return (
            <div className="analytics-hero">
                <style>{blockStyle}</style>
                <div className="analytics-hero__container">
                    <div className="analytics-hero__content">
                        <RichText.Content
                            tagName="h3"
                            className="analytics-hero__subtitle"
                            value={subtitle}
                        />
                        <RichText.Content
                            tagName="h1"
                            className="analytics-hero__title"
                            value={title}
                        />
                        <RichText.Content
                            tagName="p"
                            className="analytics-hero__description"
                            value={description}
                        />
                        <div className="analytics-hero__cta">
                            <InnerBlocks.Content />
                        </div>
                    </div>
                    <div className="analytics-hero__image">
                        {/* Desktop image */}
                        {imageUrl && (
                            <img
                                className="analytics-hero__desktop-img"
                                src={imageUrl}
                                alt={__('Hero image', 'bevision')}
                            />
                        )}
                        
                        {/* Mobile dashboard images */}
                        {dashboardImages && dashboardImages.length > 0 && (
                            <div className="analytics-hero__mobile-dashboard-grid">
                                {dashboardImages.map((image, index) => (
                                    <div key={index} className="analytics-hero__dashboard-item">
                                        <img 
                                            src={image.url} 
                                            alt={__('Dashboard', 'bevision')} 
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Mobile-only button for smaller screens */}
                    <div className="mobile-button-container">
                        <a href="#" className="mobile-start-exploring">
                            {__('Start exploring', 'bevision')}
                        </a>
                    </div>
                </div>
            </div>
        );
    }
});
