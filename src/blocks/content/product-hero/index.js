import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

const blockStyle = `
    .product-hero-section {
        background-color: #f8f7ff;
        padding: 5rem 0;
        overflow: hidden;
    }

    .product-hero-section .container {
        max-width: 1440px;
        margin: 0 auto;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 4rem;
    }

    .product-hero-section__content {
        flex: 0 0 50%;
    }

    .product-hero-section__title {
        color: var(--Dark-Blue, #221A4C);
        font-size: 48px;
        font-weight: 700;
        line-height: 1.2;
        margin-bottom: 1.5rem;
    }

    .product-hero-section__description {
        color: var(--Grey, #8399AF);
        font-size: 18px;
        font-weight: 400;
        line-height: 1.5;
        margin-bottom: 2rem;
    }

    .product-hero-section__cta {
        display: inline-block;
        background-color: #6C5CE7;
        color: #fff;
        font-size: 16px;
        font-weight: 600;
        padding: 12px 24px;
        border-radius: 6px;
        text-decoration: none;
        transition: background-color 0.3s ease;
        border: none;
        cursor: pointer;
    }

    .product-hero-section__cta:hover {
        background-color: #5649c0;
    }

    .product-hero-section__image {
        flex: 0 0 45%;
        min-height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .product-hero-section__image img {
        max-width: 100%;
        height: auto;
    }

    .product-hero-section__image .components-button {
        height: 200px;
        width: 100%;
        border: 2px dashed #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        border-radius: 10px;
    }
    
    @media (max-width: 768px) {
        .product-hero-section .container {
            flex-direction: column;
        }
        
        .product-hero-section__content,
        .product-hero-section__image {
            width: 100%;
            flex: none;
        }
        
        .product-hero-section__image {
            order: -1;
        }
    }
`;

registerBlockType('bevision/product-hero-section', {
    title: 'Product Hero Section',
    icon: 'cover-image',
    category: 'bevision',
    attributes: {
        imageUrl: {
            type: 'string',
            default: ''
        },
        imageId: {
            type: 'number'
        },
        title: {
            type: 'string',
            default: 'Discover Our Products'
        },
        description: {
            type: 'string',
            default: 'Transform your business with our innovative solutions. Explore our product line designed to meet your needs.'
        },
        ctaText: {
            type: 'string',
            default: 'Learn More'
        },
        ctaUrl: {
            type: 'string',
            default: '#'
        }
    },
    edit: function Edit({ attributes, setAttributes }) {
        const blockProps = useBlockProps({
            className: 'product-hero-section'
        });

        const onSelectImage = (media) => {
            setAttributes({
                imageUrl: media.url,
                imageId: media.id
            });
        };

        return (
            <>
                <style>{blockStyle}</style>
                <div {...blockProps}>
                    <div className="container">
                        <div className="product-hero-section__content">
                            <RichText
                                tagName="h1"
                                className="product-hero-section__title"
                                value={attributes.title}
                                onChange={(title) => setAttributes({ title })}
                                placeholder="Enter title"
                            />
                            <RichText
                                tagName="div"
                                className="product-hero-section__description"
                                value={attributes.description}
                                onChange={(description) => setAttributes({ description })}
                                placeholder="Enter description"
                            />
                            <div className="product-hero-section__cta-wrapper">
                                <RichText
                                    tagName="div"
                                    className="product-hero-section__cta"
                                    value={attributes.ctaText}
                                    onChange={(ctaText) => setAttributes({ ctaText })}
                                    placeholder="Enter button text"
                                />
                                <div style={{ marginTop: '10px' }}>
                                    <label>Button URL: </label>
                                    <input
                                        type="text"
                                        value={attributes.ctaUrl}
                                        onChange={(e) => setAttributes({ ctaUrl: e.target.value })}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="product-hero-section__image">
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={onSelectImage}
                                    allowedTypes={['image']}
                                    value={attributes.imageId}
                                    render={({ open }) => (
                                        attributes.imageUrl ? (
                                            <img
                                                src={attributes.imageUrl}
                                                onClick={open}
                                                style={{ cursor: 'pointer' }}
                                                alt="Click to change image"
                                            />
                                        ) : (
                                            <Button
                                                onClick={open}
                                                variant="secondary"
                                            >
                                                Upload Image
                                            </Button>
                                        )
                                    )}
                                />
                            </MediaUploadCheck>
                        </div>
                    </div>
                </div>
            </>
        );
    },
    save: function Save({ attributes }) {
        const blockProps = useBlockProps.save({
            className: 'product-hero-section'
        });

        return (
            <>
                <style>{blockStyle}</style>
                <div {...blockProps}>
                    <div className="container">
                        <div className="product-hero-section__content">
                            <h1 className="product-hero-section__title">
                                {attributes.title}
                            </h1>
                            <div className="product-hero-section__description">
                                {attributes.description}
                            </div>
                            <a href={attributes.ctaUrl} className="product-hero-section__cta">
                                {attributes.ctaText}
                            </a>
                        </div>
                        <div className="product-hero-section__image">
                            {attributes.imageUrl && (
                                <img src={attributes.imageUrl} alt="" />
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
});