import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

const blockStyle = `

    .category-analysis .container {
        max-width: 1440px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 4rem;
    }

    .category-analysis__image {
        diosplay: flex;
        align-items: center;
        justify-content: start;
    }

    }

    .category-analysis__image img {
        max-width: 100%;
        height: auto;
        border-radius: 10px;
    }

    .category-analysis__image .components-button {
        height: 200px;
        width: 100%;
        border: 2px dashed #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        border-radius: 10px;
    }

    .category-analysis__content {
        flex: 0 0 50%;
    }

    .category-analysis__icon {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        color: #6C5CE7;
    }
    
    .category-analysis__icon svg {
        width: 30px;
        height: 30px;
        margin-right: 15px;
    }

    .category-analysis__title {
        color: var(--Dark-Blue, #221A4C);
        font-size: 24px;
        font-weight: 700;
        line-height: 1.2;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
    }

    .category-analysis__paragraph {
        color: var(--Grey, #8399AF);
        font-size: 18px;
        font-weight: 400;
        line-height: 1.5;
        margin-bottom: 1.5rem;
    }
    
    @media (max-width: 768px) {
        .category-analysis .container {
            flex-direction: column;
        }
        
        .category-analysis__content,
        .category-analysis__image {
            width: 100%;
            flex: none;
        }
        
        .category-analysis__image {
            margin-bottom: 2rem;
        }
    }
`;

registerBlockType('bevision/category-analysis', {
    title: 'Category/Brand Analysis',
    icon: 'chart-bar',
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
            default: 'Category/Brand analysis'
        },
        paragraph1: {
            type: 'string',
            default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        paragraph2: {
            type: 'string',
            default: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }
    },
    edit: function Edit({ attributes, setAttributes }) {
        const blockProps = useBlockProps({
            className: 'category-analysis'
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
                        <div className="category-analysis__image">
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
                                                    alt="Analysis chart"
                                                />
                                            ) : (
                                                <Button
                                                    onClick={open}
                                                    variant="secondary"
                                                >
                                                    Upload Chart Image
                                                </Button>
                                            )
                                        )}
                                    />
                                </MediaUploadCheck>
                            
                        </div>
                        <div className="category-analysis__content">
                            <div className="category-analysis__title">
                                <div className="category-analysis__icon">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 1L15.5 8L23 9.5L17.5 14.5L19 22L12 18.5L5 22L6.5 14.5L1 9.5L8.5 8L12 1Z" fill="currentColor"/>
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
                                className="category-analysis__paragraph"
                                value={attributes.paragraph1}
                                onChange={(paragraph1) => setAttributes({ paragraph1 })}
                                placeholder="Enter first paragraph"
                            />
                            <RichText
                                tagName="div"
                                className="category-analysis__paragraph"
                                value={attributes.paragraph2}
                                onChange={(paragraph2) => setAttributes({ paragraph2 })}
                                placeholder="Enter second paragraph"
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    },
    save: function Save({ attributes }) {
        const blockProps = useBlockProps.save({
            className: 'category-analysis'
        });

        return (
            <>
                <style>{blockStyle}</style>
                <div {...blockProps}>
                    <div className="container">
                        <div className="category-analysis__image">
                            <div className="category-analysis__image-wrapper">
                                {attributes.imageUrl && (
                                    <img src={attributes.imageUrl} alt="Analysis chart" />
                                )}
                            </div>
                        </div>
                        <div className="category-analysis__content">
                            <div className="category-analysis__title">
                                <div className="category-analysis__icon">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 1L15.5 8L23 9.5L17.5 14.5L19 22L12 18.5L5 22L6.5 14.5L1 9.5L8.5 8L12 1Z" fill="currentColor"/>
                                    </svg>
                                </div>
                                <h2>{attributes.title}</h2>
                            </div>
                            <div className="category-analysis__paragraph">
                                {attributes.paragraph1}
                            </div>
                            <div className="category-analysis__paragraph">
                                {attributes.paragraph2}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
});