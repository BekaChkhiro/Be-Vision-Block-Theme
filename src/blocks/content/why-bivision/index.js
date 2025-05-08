import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, RangeControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

const blockStyle = `
    .wp-block-bevision-why-bivision {
        display: block;
        margin-top: 60px;
    }

    .why-bivision {
        display: flex;
        flex-direction: column;
        padding: 4rem 0;
        background-color: #22194b;
        color: #fff;
        position: relative;
        overflow: hidden;
    }

    .why-bivision__background {
        position: absolute;
        top: 0;
        left: 0;
        width: var(--background-size, 10%);
        height: var(--background-size, 10%);
        opacity: 0.2;
        pointer-events: none;
    }

    .why-bivision__background2 {
        position: absolute;
        bottom: 0;
        right: 0;
        height: 150px;
        opacity: var(--background-opacity2, 0.2);
        pointer-events: none;
    }

    .why-bivision__background img,
    .why-bivision__background2 img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .why-bivision .container {
        max-width: 1440px;
        margin: 0 auto;
        padding: 0;
        width: 100%;
        display: flex;
        gap: 2rem;
        position: relative;
        z-index: 1;
    }

    .why-bivision__media-column {
        flex: 1;
    }

    .why-bivision__media-column img {
        width: 100%;
        height: auto;
        max-height: 440px; /* Reduced height of the photo */
        object-fit: cover;
        border-radius: 8px;
    }

    .why-bivision__media-column .image-button {
        width: 100%;
        padding: 0;
        border: none;
        background: none;
        cursor: pointer;
    }

    .why-bivision__media-column .image-button img {
        display: block;
    }

    .why-bivision__content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 40px;
        justify-content: space-between;
    }

    .why-bivision__text-content {
        background: #6653C6;
        border-radius: 20px;
        padding: 40px;
    }

    .why-bivision__text-content h2 {
        color: var(--White, #FFF);
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        margin: 0 0 1.5rem;
    }

    .why-bivision__about p {
        font-size: 1rem;
        line-height: 1.6;
        margin-bottom: 0;
        color: #fff;
        opacity: 0.9;
    }

    .why-bivision__stats {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        justify-content: space-between;
        flex-wrap: nowrap;
        width: 100%;
    }

    .why-bivision__stats .stat-item {
        background: #2a215f;
        padding: 16px;
        border-radius: 12px;
        text-align: left;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: end;
        gap: 8px;
        flex: 1;
        width: calc(33.333% - 0.667rem);
    }

    .why-bivision__stats .stat-item img {
        position: absolute;
        right: 20px;
        top: 20px;
        width: 24px;
        height: 24px;
        padding: 8px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        object-fit: contain;
    }

    .why-bivision__stats .stat-item .editor-post-featured-image__toggle {
        position: absolute;
        right: 20px;
        top: 20px;
        padding: 8px;
        margin: 0;
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
    }

    .why-bivision__stats .stat-item .editor-post-featured-image__toggle img {
        position: static;
        width: 24px;
        height: 24px;
        padding: 0;
        background: none;
    }

    .why-bivision__stats .stat-item h3 {
        color: var(--White, #FFF);
        font-size: 50px;
        font-style: normal;
        font-weight: 750;
        line-height: normal;
        margin: 0;
    }

    .why-bivision__stats .stat-item p {
        color: var(--Violet, #6653C6);
        font-family: "Helvetica Neue LT GEO";
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin: 0;
    }

    .why-bivision__titles {
        text-align: center;
        margin-bottom: 70px;
    }

    .why-bivision__subtitle {
        color: var(--Violet, #6653C6);
        text-align: center;
        font-size: 14px;
        font-style: normal;
        font-weight: 750;
        line-height: normal;
        margin-bottom: 5px;
    }

    .why-bivision__main-title {
        color: var(--White, #FFF);
        text-align: center;
        font-family: "Helvetica Neue LT GEO";
        font-size: 30px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        margin: 0;
    }

    @media (max-width: 768px) {
        .why-bivision {
            padding: 2rem 0;
            overflow: hidden;
            width: 100%;
            box-sizing: border-box;
        }
        
        .why-bivision .container {
            flex-direction: column;
            gap: 1.5rem;
            padding: 0 1rem;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
        }
        
        .why-bivision__titles {
            margin-bottom: 40px;
        }
        
        .why-bivision__media-column img {
            max-height: 300px;
        }
        
        .why-bivision__text-content {
            padding: 30px;
        }
        
        .why-bivision__content {
            width: 100%;
            box-sizing: border-box;
        }
        
        .why-bivision__stats-container {
            width: 100%;
            box-sizing: border-box;
        }
        
        .why-bivision__stats {
            flex-wrap: wrap;
            gap: 1rem;
            flex-direction: column;
            width: 100%;
            box-sizing: border-box;
            padding: 0;
            margin: 0;
        }
        
        .why-bivision__stats .stat-item {
            width: 100%;
            flex: 1 0 100%;
            box-sizing: border-box;
        }
        
        .why-bivision__stats .stat-item h3 {
            font-size: 36px;
        }
        
        .why-bivision__stats .stat-item p {
            font-size: 14px;
        }
    }
`;

registerBlockType('bevision/why-bivision', {
    title: __('Why BIVISION', 'bevision'),
    description: __('Why BIVISION section with image and statistics', 'bevision'),
    category: 'bevision',
    icon: 'groups',
    supports: {
        html: false
    },
    attributes: {
        subtitle: {
            type: 'string',
            default: 'Subtitle here'
        },
        mainTitle: {
            type: 'string',
            default: 'Main Title here'
        },
        mediaId: {
            type: 'number',
        },
        mediaUrl: {
            type: 'string',
        },
        backgroundMediaId: {
            type: 'number',
        },
        backgroundMediaUrl: {
            type: 'string',
        },
        backgroundOpacity: {
            type: 'number',
            default: 30
        },
        backgroundSize: {
            type: 'number',
            default: 10
        },
        backgroundMediaId2: {
            type: 'number',
        },
        backgroundMediaUrl2: {
            type: 'string',
        },
        backgroundOpacity2: {
            type: 'number',
            default: 20
        },
        backgroundSize2: {
            type: 'number',
            default: 10
        },
        title: {
            type: 'string',
            default: 'Why BIVISION?'
        },
        aboutContent: {
            type: 'string',
            default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
        },
        yearsOnMarket: {
            type: 'string',
            default: '10y'
        },
        yearsLabel: {
            type: 'string',
            default: 'On market'
        },
        clientsCount: {
            type: 'string',
            default: '50+'
        },
        clientsLabel: {
            type: 'string',
            default: 'Clients'
        },
        npsScore: {
            type: 'string',
            default: '8.9'
        },
        npsLabel: {
            type: 'string',
            default: 'Net Promoter score'
        },
        dashboardsCount: {
            type: 'string',
            default: '500+'
        },
        dashboardsLabel: {
            type: 'string',
            default: 'Analytical Dashboards'
        },
        yearsIconId: {
            type: 'number',
        },
        yearsIconUrl: {
            type: 'string',
        },
        clientsIconId: {
            type: 'number',
        },
        clientsIconUrl: {
            type: 'string',
        },
        npsIconId: {
            type: 'number',
        },
        npsIconUrl: {
            type: 'string',
        },
        dashboardsIconId: {
            type: 'number',
        },
        dashboardsIconUrl: {
            type: 'string',
        }
    },
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps({
            style: {
                '--background-size': `${attributes.backgroundSize}%`,
                '--background-size2': `${attributes.backgroundSize2}%`,
                '--background-opacity2': attributes.backgroundOpacity2 / 100
            }
        });

        const onSelectImage = (media) => {
            setAttributes({
                mediaId: media.id,
                mediaUrl: media.url
            });
        };

        const onSelectBackgroundImage = (media) => {
            setAttributes({
                backgroundMediaId: media.id,
                backgroundMediaUrl: media.url
            });
        };

        const onSelectBackgroundImage2 = (media) => {
            setAttributes({
                backgroundMediaId2: media.id,
                backgroundMediaUrl2: media.url
            });
        };

        const onSelectYearsIcon = (media) => {
            setAttributes({
                yearsIconId: media.id,
                yearsIconUrl: media.url
            });
        };

        const onSelectClientsIcon = (media) => {
            setAttributes({
                clientsIconId: media.id,
                clientsIconUrl: media.url
            });
        };

        const onSelectNpsIcon = (media) => {
            setAttributes({
                npsIconId: media.id,
                npsIconUrl: media.url
            });
        };



        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={__('Background Settings', 'bevision')}>
                        <div style={{ marginBottom: '2rem' }}>
                            <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>{__('Top Left Background', 'bevision')}</p>
                            <MediaUpload
                                onSelect={onSelectBackgroundImage}
                                allowedTypes={['image']}
                                value={attributes.backgroundMediaId}
                                render={({ open }) => (
                                    <Button
                                        onClick={open}
                                        className="editor-post-featured-image__toggle"
                                        style={{ width: '100%', marginBottom: '1rem' }}
                                    >
                                        {!attributes.backgroundMediaUrl ? 
                                            __('Upload Background Image', 'bevision') : 
                                            __('Replace Background Image', 'bevision')
                                        }
                                    </Button>
                                )}
                            />
                            {attributes.backgroundMediaUrl && (
                                <Button
                                    onClick={() => setAttributes({
                                        backgroundMediaId: undefined,
                                        backgroundMediaUrl: undefined
                                    })}
                                    isDestructive
                                    style={{ width: '100%', marginBottom: '1rem' }}
                                >
                                    {__('Remove Background Image', 'bevision')}
                                </Button>
                            )}
                            <RangeControl
                                label={__('Background Size', 'bevision')}
                                value={attributes.backgroundSize}
                                onChange={(value) => setAttributes({ backgroundSize: value })}
                                min={20}
                                max={100}
                                step={5}
                            />
                        </div>

                        <div>
                            <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>{__('Bottom Right Background', 'bevision')}</p>
                            <MediaUpload
                                onSelect={onSelectBackgroundImage2}
                                allowedTypes={['image']}
                                value={attributes.backgroundMediaId2}
                                render={({ open }) => (
                                    <Button
                                        onClick={open}
                                        className="editor-post-featured-image__toggle"
                                        style={{ width: '100%', marginBottom: '1rem' }}
                                    >
                                        {!attributes.backgroundMediaUrl2 ? 
                                            __('Upload Bottom Right Image', 'bevision') : 
                                            __('Replace Bottom Right Image', 'bevision')
                                        }
                                    </Button>
                                )}
                            />
                            {attributes.backgroundMediaUrl2 && (
                                <Button
                                    onClick={() => setAttributes({
                                        backgroundMediaId2: undefined,
                                        backgroundMediaUrl2: undefined
                                    })}
                                    isDestructive
                                    style={{ width: '100%', marginBottom: '1rem' }}
                                >
                                    {__('Remove Bottom Right Image', 'bevision')}
                                </Button>
                            )}
                            <RangeControl
                                label={__('Background Size', 'bevision')}
                                value={attributes.backgroundSize2}
                                onChange={(value) => setAttributes({ backgroundSize2: value })}
                                min={20}
                                max={100}
                                step={5}
                            />
                            <RangeControl
                                label={__('Background Opacity', 'bevision')}
                                value={attributes.backgroundOpacity2}
                                onChange={(value) => setAttributes({ backgroundOpacity2: value })}
                                min={0}
                                max={100}
                                step={5}
                            />
                        </div>
                    </PanelBody>
                </InspectorControls>
                <style>{blockStyle}</style>
                <div {...blockProps}>
                    <div className="why-bivision">
                        {attributes.backgroundMediaUrl && (
                            <div className="why-bivision__background">
                                <img src={attributes.backgroundMediaUrl} alt={__('Background Image', 'bevision')} />
                            </div>
                        )}
                        {attributes.backgroundMediaUrl2 && (
                            <div className="why-bivision__background2">
                                <img src={attributes.backgroundMediaUrl2} alt={__('Bottom Right Background', 'bevision')} />
                            </div>
                        )}
                        <div className="why-bivision__titles">
                            <RichText
                                tagName="div"
                                className="why-bivision__subtitle"
                                value={attributes.subtitle}
                                onChange={(subtitle) => setAttributes({ subtitle })}
                                placeholder={__('Enter subtitle...', 'bevision')}
                            />
                            <RichText
                                tagName="h2"
                                className="why-bivision__main-title"
                                value={attributes.mainTitle}
                                onChange={(mainTitle) => setAttributes({ mainTitle })}
                                placeholder={__('Enter main title...', 'bevision')}
                            />
                        </div>
                        <div className="container">
                            <div className="why-bivision__media-column">
                                <MediaUpload
                                    onSelect={onSelectImage}
                                    allowedTypes={['image']}
                                    value={attributes.mediaId}
                                    render={({ open }) => (
                                        <Button
                                            onClick={open}
                                            className={attributes.mediaUrl ? 'image-button' : 'button button-large'}
                                        >
                                            {!attributes.mediaUrl ? __('Upload Image', 'bevision') : (
                                                <img src={attributes.mediaUrl} alt={__('Team Image', 'bevision')} />
                                            )}
                                        </Button>
                                    )}
                                />
                            </div>
                            <div className="why-bivision__content">
                                <div className="why-bivision__text-content">
                                    <RichText
                                        tagName="h2"
                                        value={attributes.title}
                                        onChange={(title) => setAttributes({ title })}
                                        placeholder={__('Why BIVISION?', 'bevision')}
                                    />
                                    <div className="why-bivision__about">
                                        <RichText
                                            tagName="p"
                                            value={attributes.aboutContent}
                                            onChange={(content) => setAttributes({ aboutContent: content })}
                                            placeholder={__('About content...', 'bevision')}
                                        />
                                    </div>
                                </div>
                                <div className="why-bivision__stats-container">
                                    <div className="why-bivision__stats">
                                        <div className="stat-item">
                                            <MediaUpload
                                                onSelect={onSelectYearsIcon}
                                                allowedTypes={['image']}
                                                value={attributes.yearsIconId}
                                                render={({ open }) => (
                                                    <Button
                                                        onClick={open}
                                                        className="editor-post-featured-image__toggle"
                                                        style={{ marginBottom: '1rem' }}
                                                    >
                                                        {attributes.yearsIconUrl ? 
                                                            <img src={attributes.yearsIconUrl} alt="" style={{ maxWidth: '40px' }} /> :
                                                            __('Upload Icon', 'bevision')
                                                        }
                                                    </Button>
                                                )}
                                            />
                                            <RichText
                                                tagName="h3"
                                                value={attributes.yearsOnMarket}
                                                onChange={(yearsOnMarket) => setAttributes({ yearsOnMarket })}
                                                placeholder={__('Years on market', 'bevision')}
                                            />
                                            <RichText
                                                tagName="p"
                                                value={attributes.yearsLabel}
                                                onChange={(yearsLabel) => setAttributes({ yearsLabel })}
                                                placeholder={__('Label', 'bevision')}
                                            />
                                        </div>
                                        <div className="stat-item">
                                            <MediaUpload
                                                onSelect={onSelectClientsIcon}
                                                allowedTypes={['image']}
                                                value={attributes.clientsIconId}
                                                render={({ open }) => (
                                                    <Button
                                                        onClick={open}
                                                        className="editor-post-featured-image__toggle"
                                                        style={{ marginBottom: '1rem' }}
                                                    >
                                                        {attributes.clientsIconUrl ? 
                                                            <img src={attributes.clientsIconUrl} alt="" style={{ maxWidth: '40px' }} /> :
                                                            __('Upload Icon', 'bevision')
                                                        }
                                                    </Button>
                                                )}
                                            />
                                            <RichText
                                                tagName="h3"
                                                value={attributes.clientsCount}
                                                onChange={(clientsCount) => setAttributes({ clientsCount })}
                                                placeholder={__('Clients count', 'bevision')}
                                            />
                                            <RichText
                                                tagName="p"
                                                value={attributes.clientsLabel}
                                                onChange={(clientsLabel) => setAttributes({ clientsLabel })}
                                                placeholder={__('Label', 'bevision')}
                                            />
                                        </div>
                                        <div className="stat-item">
                                            <MediaUpload
                                                onSelect={onSelectNpsIcon}
                                                allowedTypes={['image']}
                                                value={attributes.npsIconId}
                                                render={({ open }) => (
                                                    <Button
                                                        onClick={open}
                                                        className="editor-post-featured-image__toggle"
                                                        style={{ marginBottom: '1rem' }}
                                                    >
                                                        {attributes.npsIconUrl ? 
                                                            <img src={attributes.npsIconUrl} alt="" style={{ maxWidth: '40px' }} /> :
                                                            __('Upload Icon', 'bevision')
                                                        }
                                                    </Button>
                                                )}
                                            />
                                            <RichText
                                                tagName="h3"
                                                value={attributes.npsScore}
                                                onChange={(npsScore) => setAttributes({ npsScore })}
                                                placeholder={__('NPS score', 'bevision')}
                                            />
                                            <RichText
                                                tagName="p"
                                                value={attributes.npsLabel}
                                                onChange={(npsLabel) => setAttributes({ npsLabel })}
                                                placeholder={__('Label', 'bevision')}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    },
    save: ({ attributes }) => {
        const blockProps = useBlockProps.save({
            style: {
                '--background-size': `${attributes.backgroundSize}%`,
                '--background-size2': `${attributes.backgroundSize2}%`,
                '--background-opacity2': attributes.backgroundOpacity2 / 100
            }
        });
        
        return (
            <Fragment>
                <style>{blockStyle}</style>
                <div {...blockProps}>
                    <div className="why-bivision">
                        {attributes.backgroundMediaUrl && (
                            <div className="why-bivision__background">
                                <img src={attributes.backgroundMediaUrl} alt={__('Background Image', 'bevision')} />
                            </div>
                        )}
                        {attributes.backgroundMediaUrl2 && (
                            <div className="why-bivision__background2">
                                <img src={attributes.backgroundMediaUrl2} alt={__('Bottom Right Background', 'bevision')} />
                            </div>
                        )}
                        <div className="why-bivision__titles">
                            <div className="why-bivision__subtitle">
                                <RichText.Content value={attributes.subtitle} />
                            </div>
                            <h2 className="why-bivision__main-title">
                                <RichText.Content value={attributes.mainTitle} />
                            </h2>
                        </div>
                        <div className="container">
                            <div className="why-bivision__media-column">
                                {attributes.mediaUrl && (
                                    <img src={attributes.mediaUrl} alt={__('Team Image', 'bevision')} />
                                )}
                            </div>
                            <div className="why-bivision__content">
                                <div className="why-bivision__text-content">
                                    <RichText.Content
                                        tagName="h2"
                                        value={attributes.title}
                                    />
                                    <div className="why-bivision__about">
                                        <RichText.Content
                                            tagName="p"
                                            value={attributes.aboutContent}
                                        />
                                    </div>
                                </div>
                                <div className="why-bivision__stats-container">
                                    <div className="why-bivision__stats">
                                        <div className="stat-item">
                                            {attributes.yearsIconUrl && (
                                                <img src={attributes.yearsIconUrl} alt="" />
                                            )}
                                            <RichText.Content
                                                tagName="h3"
                                                value={attributes.yearsOnMarket}
                                            />
                                            <RichText.Content
                                                tagName="p"
                                                value={attributes.yearsLabel}
                                            />
                                        </div>
                                        <div className="stat-item">
                                            {attributes.clientsIconUrl && (
                                                <img src={attributes.clientsIconUrl} alt="" />
                                            )}
                                            <RichText.Content
                                                tagName="h3"
                                                value={attributes.clientsCount}
                                            />
                                            <RichText.Content
                                                tagName="p"
                                                value={attributes.clientsLabel}
                                            />
                                        </div>
                                        <div className="stat-item">
                                            {attributes.npsIconUrl && (
                                                <img src={attributes.npsIconUrl} alt="" />
                                            )}
                                            <RichText.Content
                                                tagName="h3"
                                                value={attributes.npsScore}
                                            />
                                            <RichText.Content
                                                tagName="p"
                                                value={attributes.npsLabel}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
});
