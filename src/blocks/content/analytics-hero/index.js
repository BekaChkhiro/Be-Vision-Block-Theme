import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { RichText, MediaUpload, InnerBlocks } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

const blockStyle = `
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

    .analytics-hero__button .wp-element-button {
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

    @media (max-width: 768px) {
        .analytics-hero {
            padding: 40px 0;
        }

        .analytics-hero__container {
            flex-direction: column;
            text-align: center;
        }

        .analytics-hero__content {
            flex: 0 0 100%;
        }

        .analytics-hero__image {
            flex: 0 0 100%;
            padding: 0 20px;
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
        }
    },
    edit: ({ attributes, setAttributes }) => {
        const { subtitle, title, description, imageUrl } = attributes;

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
                                        {__('Upload Image', 'bevision')}
                                    </Button>
                                )
                            )}
                        />
                    </div>
                </div>
            </div>
        );
    },
    save: ({ attributes }) => {
        const { subtitle, title, description, imageUrl } = attributes;

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
                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt={__('Hero image', 'bevision')}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
});
