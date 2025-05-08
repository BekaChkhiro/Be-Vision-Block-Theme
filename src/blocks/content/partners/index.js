import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, MediaUpload, MediaUploadCheck, InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl } from '@wordpress/components';

const styles = {
    section: {
        padding: '60px 0'
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 15px'
    },
    titleContainer: {
        textAlign: 'center',
        marginBottom: '40px',
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        flexWrap: 'wrap' // Allow wrapping on mobile
    },
    titlePart1: {
        color: 'var(--Violet, #6653C6)',
        fontSize: '18px',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 'normal',
        display: 'inline',
        textDecoration: 'none'
    },
    titlePart2: {
        color: 'var(--Grey, #8399AF)',
        fontSize: '18px',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 'normal',
        display: 'inline'
    },
    subtitle: {
        color: 'var(--Grey, #8399AF)',
        textAlign: 'center',
        fontSize: '18px',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 'normal',
        marginBottom: '40px'
    },
    grid: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '40px',
        flexWrap: 'wrap'
    },
    logo: {
        maxHeight: '40px',
        width: 'auto',
        filter: 'brightness(0.8)',
        transition: 'filter 0.3s ease'
    },
    addButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100px',
        height: '40px',
        border: '2px dashed #ccc',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    // Mobile-specific styles
    mobileSection: {
        padding: '40px 0'
    },
    mobileTitleContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px',
        marginBottom: '30px'
    },
    mobileTitle: {
        fontSize: '16px',
        textAlign: 'center',
        display: 'block'
    },
    mobileSubtitle: {
        fontSize: '16px',
        marginBottom: '30px'
    },
    mobileGrid: {
        gap: '30px',
        justifyContent: 'space-around'
    }
};

registerBlockType('bevision/partners', {
    title: 'Partners',
    icon: 'groups',
    category: 'bevision',
    attributes: {
        titlePart1: {
            type: 'string',
            source: 'html',
            selector: '.partners-title-part1',
            default: '100+ companies'
        },
        titlePart1Link: {
            type: 'string',
            source: 'attribute',
            selector: '.partners-title-link',
            attribute: 'href',
            default: '#'
        },
        titlePart2: {
            type: 'string',
            source: 'html',
            selector: '.partners-title-part2',
            default: ' trust us with their data'
        },
        subtitle: {
            type: 'string',
            source: 'html',
            selector: '.partners-subtitle',
            default: 'ჩვენი პარტნიორები'
        },
        logos: {
            type: 'array',
            default: []
        }
    },

    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();

        const onSelectImage = (image) => {
            setAttributes({
                logos: [...attributes.logos, {
                    id: image.id,
                    url: image.url,
                    alt: image.alt || ''
                }]
            });
        };

        const removeImage = (index) => {
            const newLogos = [...attributes.logos];
            newLogos.splice(index, 1);
            setAttributes({ logos: newLogos });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Link Settings">
                        <TextControl
                            label="Link URL"
                            value={attributes.titlePart1Link}
                            onChange={(titlePart1Link) => setAttributes({ titlePart1Link })}
                            help="Enter the URL for the violet text link"
                        />
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps} style={styles.section}>
                    <div style={styles.container}>
                        <div style={styles.titleContainer}>
                            <a 
                                href={attributes.titlePart1Link}
                                className="partners-title-link"
                                style={styles.titlePart1}
                            >
                                <RichText
                                    tagName="span"
                                    className="partners-title-part1"
                                    style={styles.titlePart1}
                                    value={attributes.titlePart1}
                                    onChange={(titlePart1) => setAttributes({ titlePart1 })}
                                    placeholder="100+ companies"
                                />
                            </a>
                            <RichText
                                tagName="span"
                                className="partners-title-part2"
                                style={styles.titlePart2}
                                value={attributes.titlePart2}
                                onChange={(titlePart2) => setAttributes({ titlePart2 })}
                                placeholder=" trust us with their data"
                            />
                        </div>
                        <RichText
                            tagName="p"
                            className="partners-subtitle"
                            style={styles.subtitle}
                            value={attributes.subtitle}
                            onChange={(subtitle) => setAttributes({ subtitle })}
                            placeholder="Enter subtitle"
                        />
                        <div style={styles.grid}>
                            {attributes.logos.map((logo, index) => (
                                <div key={index}>
                                    <img 
                                        style={styles.logo} 
                                        src={logo.url} 
                                        alt={logo.alt}
                                        onMouseOver={(e) => e.target.style.filter = 'brightness(1)'}
                                        onMouseOut={(e) => e.target.style.filter = 'brightness(0.8)'}
                                    />
                                    <Button 
                                        isSmall
                                        isDestructive
                                        onClick={() => removeImage(index)}
                                        style={{ display: 'block', margin: '5px auto' }}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={onSelectImage}
                                    allowedTypes={['image']}
                                    render={({ open }) => (
                                        <Button 
                                            onClick={open}
                                            style={styles.addButton}
                                        >
                                            Add Logo
                                        </Button>
                                    )}
                                />
                            </MediaUploadCheck>
                        </div>
                    </div>
                </div>
            </>
        );
    },

    save: ({ attributes }) => {
        return (
            <div className="partners-section partners-block" style={styles.section}>
                <div className="partners-container" style={styles.container}>
                    <div className="partners-title-container" style={styles.titleContainer}>
                        <a 
                            href={attributes.titlePart1Link}
                            className="partners-title-link"
                            style={styles.titlePart1}
                        >
                            <RichText.Content
                                tagName="span"
                                className="partners-title-part1"
                                style={styles.titlePart1}
                                value={attributes.titlePart1}
                            />
                        </a>
                        <RichText.Content
                            tagName="span"
                            className="partners-title-part2"
                            style={styles.titlePart2}
                            value={attributes.titlePart2}
                        />
                    </div>
                    <RichText.Content
                        tagName="p"
                        className="partners-subtitle"
                        style={styles.subtitle}
                        value={attributes.subtitle}
                    />
                    <div className="partners-grid" style={styles.grid}>
                        {attributes.logos.map((logo, index) => (
                            <div key={index} className="partner-logo-container">
                                <img 
                                    className="partner-logo"
                                    style={styles.logo} 
                                    src={logo.url} 
                                    alt={logo.alt}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    },
});
