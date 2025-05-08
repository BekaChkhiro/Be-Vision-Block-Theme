import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

const blockStyle = `
    .cross-sell-basket {
        padding: 4rem 0;
    }

    .cross-sell-basket .container {
        max-width: 1440px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 4rem;
    }

    .cross-sell-basket__header {
        text-align: center;
        margin: 40px 0px 0px;
    }

    .cross-sell-basket__subtitle {
        color: #2FCA02;
        text-align: center;
        font-size: 14px;
        font-style: normal;
        font-weight: 750;
        line-height: normal;
        margin: 0px 0px 5px;
    }

    .cross-sell-basket__main-title {
        color: #221A4C;
        text-align: center;
        font-size: 30px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        margin: 0px;
    }

    .cross-sell-basket__content {
        flex: 0 0 50%;
    }

    .cross-sell-basket__icon {
        display: flex;
        align-items: center;
        color: #24b47e;
    }
    
    .cross-sell-basket__icon svg {
        width: 30px;
        height: 30px;
        margin-right: 15px;
    }

    .cross-sell-basket__title {
        font-size: 30px;
        font-weight: 700;
        margin: 0px 0px 19px;
        display: flex;
        align-items: center;
    }

    .cross-sell-basket__title h2 {
        color: #221A4C;
        margin: 0px 0px -4px;
        font-size: 30px;
        font-weight: 700;
        line-height: 1.2;   
     }        

    .cross-sell-basket__paragraph {
        color: var(--Grey, #8399AF);
        font-size: 18px;
        font-weight: 400;
        line-height: 1.5;
        margin-bottom: 1.5rem;
    }

    .cross-sell-basket__image {
        display: flex;
        align-items: center;
        justify-content: end;
        flex: 0 0 50%;
    }

    .cross-sell-basket__image img {
        max-width: 100%;
        height: auto;
        border-radius: 10px;
    }

    .cross-sell-basket__image .components-button {
        height: 300px;
        width: 100%;
        border: 2px dashed #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        border-radius: 10px;
    }
    
    @media (max-width: 768px) {
        .cross-sell-basket {
            padding: 2rem 1rem;
        }
        
        .cross-sell-basket .container {
            flex-direction: column;
            gap: 2rem;
            padding: 0 1rem;
        }
        
        .cross-sell-basket__content,
        .cross-sell-basket__image {
            width: 100%;
            flex: none;
        }
        
        .cross-sell-basket__header {
            margin: 20px 0px 0px;
        }
        
        .cross-sell-basket__main-title {
            font-size: 24px;
        }
        
        .cross-sell-basket__title {
            font-size: 24px;
            margin-bottom: 15px;
        }
        
        .cross-sell-basket__title h2 {
            font-size: 24px;
        }
        
        .cross-sell-basket__paragraph {
            font-size: 16px;
            margin-bottom: 1rem;
        }
        
        .cross-sell-basket__icon svg {
            width: 24px;
            height: 24px;
            margin-right: 10px;
        }
    }
`;

registerBlockType('bevision/cross-sell-basket', {
    title: 'Cross-sell Basket',
    icon: 'cart',
    category: 'bevision',
    attributes: {
        subtitle: {
            type: 'string',
            default: 'HOW IT WORKS'
        },
        mainTitle: {
            type: 'string',
            default: 'Why BiRetail?'
        },
        imageUrl: {
            type: 'string',
            default: ''
        },
        imageId: {
            type: 'number'
        },
        title: {
            type: 'string',
            default: 'Cross-sell basket'
        },
        paragraph1: {
            type: 'string',
            default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        paragraph2: {
            type: 'string',
            default: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'
        }
    },
    edit: function Edit({ attributes, setAttributes }) {
        const blockProps = useBlockProps({
            className: 'cross-sell-basket'
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
                    <div className="cross-sell-basket__header">
                        <RichText
                            tagName="div"
                            className="cross-sell-basket__subtitle"
                            value={attributes.subtitle}
                            onChange={(subtitle) => setAttributes({ subtitle })}
                            placeholder="Enter subtitle"
                        />
                        <RichText
                            tagName="h2"
                            className="cross-sell-basket__main-title"
                            value={attributes.mainTitle}
                            onChange={(mainTitle) => setAttributes({ mainTitle })}
                            placeholder="Enter main title"
                        />
                    </div>
                    <div className="container">
                        <div className="cross-sell-basket__content">
                            <div className="cross-sell-basket__title">
                                <div className="cross-sell-basket__icon">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 1L1 5V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H21C21.5304 21 22.0391 20.7893 22.4142 20.4142C22.7893 20.0391 23 19.5304 23 19V5L20 1H4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M1 5H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M16 9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13C10.9391 13 9.92172 12.5786 9.17157 11.8284C8.42143 11.0783 8 10.0609 8 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <RichText
                                    tagName="h2"
                                    value={attributes.title}
                                    onChange={(title) => setAttributes({ title })}
                                    placeholder="Enter title"
                                />
                            </div>
                            <RichText
                                tagName="div"
                                className="cross-sell-basket__paragraph"
                                value={attributes.paragraph1}
                                onChange={(paragraph1) => setAttributes({ paragraph1 })}
                                placeholder="Enter first paragraph"
                            />
                            <RichText
                                tagName="div"
                                className="cross-sell-basket__paragraph"
                                value={attributes.paragraph2}
                                onChange={(paragraph2) => setAttributes({ paragraph2 })}
                                placeholder="Enter second paragraph"
                            />
                        </div>
                        <div className="cross-sell-basket__image">
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
                                                alt="Analytics dashboard"
                                            />
                                        ) : (
                                            <Button
                                                onClick={open}
                                                variant="secondary"
                                            >
                                                Upload Analytics Image
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
            className: 'cross-sell-basket'
        });

        return (
            <>
                <style>{blockStyle}</style>
                <div {...blockProps}>
                    <div className="cross-sell-basket__header">
                        <div className="cross-sell-basket__subtitle">
                            {attributes.subtitle}
                        </div>
                        <h2 className="cross-sell-basket__main-title">
                            {attributes.mainTitle}
                        </h2>
                    </div>
                    <div className="container">
                        <div className="cross-sell-basket__content">
                            <div className="cross-sell-basket__title">
                                <div className="cross-sell-basket__icon">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 1L1 5V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H21C21.5304 21 22.0391 20.7893 22.4142 20.4142C22.7893 20.0391 23 19.5304 23 19V5L20 1H4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M1 5H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M16 9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13C10.9391 13 9.92172 12.5786 9.17157 11.8284C8.42143 11.0783 8 10.0609 8 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <h2>{attributes.title}</h2>
                            </div>
                            <div className="cross-sell-basket__paragraph">
                                {attributes.paragraph1}
                            </div>
                            <div className="cross-sell-basket__paragraph">
                                {attributes.paragraph2}
                            </div>
                        </div>
                        <div className="cross-sell-basket__image">
                            {attributes.imageUrl && (
                                <img src={attributes.imageUrl} alt="Analytics dashboard" />
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
});