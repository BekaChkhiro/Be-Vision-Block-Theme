import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

const blockStyle = `
    .dashboard-features {
        padding: 5rem 0;
    }

    .dashboard-features .container {
        max-width: 1440px;
        margin: 0 auto;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 4rem;
    }

    .dashboard-features__content {
        flex: 0 0 50%;
    }
    
    .dashboard-features__icon {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .dashboard-features__icon img {
        height: 40px;
        width: auto;
        margin-right: 15px;
    }

    .dashboard-features__title {
        color: var(--Dark-Blue, #221A4C);
        font-size: 42px;
        font-weight: 700;
        line-height: 1.2;
        margin-bottom: 1.5rem;
    }

    .dashboard-features__description {
        color: var(--Grey, #8399AF);
        font-size: 18px;
        font-weight: 400;
        line-height: 1.5;
        margin-bottom: 2rem;
    }

    .dashboard-features__list {
        list-style-type: disc;
        padding-left: 1.5rem;
        margin-bottom: 2rem;
    }

    .dashboard-features__list-item {
        color: var(--Grey, #8399AF);
        font-size: 18px;
        font-weight: 400;
        line-height: 1.8;
    }

    .dashboard-features__image {
        flex: 0 0 45%;
        min-height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .dashboard-features__image img {
        max-width: 100%;
        height: auto;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
    }

    .dashboard-features__image .components-button {
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
        .dashboard-features .container {
            flex-direction: column;
        }
        
        .dashboard-features__content,
        .dashboard-features__image {
            width: 100%;
            flex: none;
        }
    }
`;

registerBlockType('bevision/dashboard-features', {
    title: 'Dashboard Features',
    icon: 'chart-line',
    category: 'bevision',
    attributes: {
        imageUrl: {
            type: 'string',
            default: ''
        },
        imageId: {
            type: 'number'
        },
        iconUrl: {
            type: 'string',
            default: ''
        },
        iconId: {
            type: 'number'
        },
        title: {
            type: 'string',
            default: 'Live Dashboard'
        },
        description: {
            type: 'string',
            default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        listItems: {
            type: 'array',
            default: [
                'Option 1',
                'Option 2',
                'Option 3'
            ]
        }
    },
    edit: function Edit({ attributes, setAttributes }) {
        const blockProps = useBlockProps({
            className: 'dashboard-features'
        });

        const onSelectImage = (media) => {
            setAttributes({
                imageUrl: media.url,
                imageId: media.id
            });
        };

        const onSelectIcon = (media) => {
            setAttributes({
                iconUrl: media.url,
                iconId: media.id
            });
        };

        const updateListItem = (text, index) => {
            const newItems = [...attributes.listItems];
            newItems[index] = text;
            setAttributes({ listItems: newItems });
        };

        const addListItem = () => {
            const newItems = [...attributes.listItems, 'New option'];
            setAttributes({ listItems: newItems });
        };

        const removeListItem = (index) => {
            const newItems = [...attributes.listItems];
            newItems.splice(index, 1);
            setAttributes({ listItems: newItems });
        };

        return (
            <>
                <style>{blockStyle}</style>
                <div {...blockProps}>
                    <div className="container">
                        <div className="dashboard-features__content">
                            <div className="dashboard-features__icon">
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={onSelectIcon}
                                        allowedTypes={['image']}
                                        value={attributes.iconId}
                                        render={({ open }) => (
                                            attributes.iconUrl ? (
                                                <img
                                                    src={attributes.iconUrl}
                                                    onClick={open}
                                                    style={{ cursor: 'pointer' }}
                                                    alt="Icon"
                                                />
                                            ) : (
                                                <Button
                                                    onClick={open}
                                                    variant="secondary"
                                                    style={{ marginRight: '15px' }}
                                                >
                                                    Upload Icon
                                                </Button>
                                            )
                                        )}
                                    />
                                </MediaUploadCheck>
                                <RichText
                                    tagName="h2"
                                    className="dashboard-features__title"
                                    value={attributes.title}
                                    onChange={(title) => setAttributes({ title })}
                                    placeholder="Enter title"
                                />
                            </div>
                            <RichText
                                tagName="div"
                                className="dashboard-features__description"
                                value={attributes.description}
                                onChange={(description) => setAttributes({ description })}
                                placeholder="Enter description"
                            />
                            <ul className="dashboard-features__list">
                                {attributes.listItems.map((item, index) => (
                                    <li key={index} className="dashboard-features__list-item">
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <RichText
                                                value={item}
                                                onChange={(text) => updateListItem(text, index)}
                                                placeholder="List item"
                                            />
                                            <Button
                                                isDestructive
                                                onClick={() => removeListItem(index)}
                                                style={{ marginLeft: '10px' }}
                                            >
                                                ✕
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <Button
                                isPrimary
                                onClick={addListItem}
                                style={{ marginBottom: '20px' }}
                            >
                                Add List Item
                            </Button>
                        </div>
                        <div className="dashboard-features__image">
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
                                                alt="Dashboard preview"
                                            />
                                        ) : (
                                            <Button
                                                onClick={open}
                                                variant="secondary"
                                            >
                                                Upload Dashboard Image
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
            className: 'dashboard-features'
        });

        return (
            <>
                <style>{blockStyle}</style>
                <div {...blockProps}>
                    <div className="container">
                        <div className="dashboard-features__content">
                            <div className="dashboard-features__icon">
                                {attributes.iconUrl && (
                                    <img src={attributes.iconUrl} alt="" />
                                )}
                                <h2 className="dashboard-features__title">
                                    {attributes.title}
                                </h2>
                            </div>
                            <div className="dashboard-features__description">
                                {attributes.description}
                            </div>
                            <ul className="dashboard-features__list">
                                {attributes.listItems.map((item, index) => (
                                    <li key={index} className="dashboard-features__list-item">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="dashboard-features__image">
                            {attributes.imageUrl && (
                                <img src={attributes.imageUrl} alt="Dashboard preview" />
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
});