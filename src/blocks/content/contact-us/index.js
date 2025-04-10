import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

const styles = {
    section: {
        backgroundColor: '#221A4C', // Dark purple background from the image
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '1440px',
        margin: '0 auto',
        borderRadius: '20px',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        padding: '80px 60px',
        zIndex: '2'
    },
    heading: {
        color: '#2FCA02', // Green color for "CONTACT US"
        fontSize: '18px',
        fontWeight: '500',
        margin: '0px 0px 5px',
        textTransform: 'uppercase'
    },
    title: {
        color: '#FFFFFF', // White color for main text
        fontSize: '42px',
        fontWeight: '700',
        margin: '0px',
        lineHeight: '1.2'
    },
    button: {
        backgroundColor: '#2FCA02', // Green button
        color: '#1D1B3F', // Dark text
        padding: '16px 32px',
        fontSize: '18px',
        fontWeight: '600',
        borderRadius: '8px',
        textDecoration: 'none',
        display: 'inline-block',
        cursor: 'pointer',
        border: 'none',
        transition: 'background-color 0.3s ease'
    },
    backgroundDots: {
        position: 'absolute',
        right: '-20px',
        top: '0',
        height: '100%',
        width: '25%',
        opacity: '0.3',
        zIndex: '1',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    backgroundCircle: {
        position: 'absolute',
        left: '-2%',
        top: '60%',
        transform: 'translateY(-50%)',
        width: '300px',
        height: '300px',
        opacity: '0.3',
        zIndex: '1',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }
};

registerBlockType('bevision/contact-us', {
    title: 'Contact Us',
    icon: 'phone',
    category: 'bevision',
    attributes: {
        heading: {
            type: 'string',
            source: 'html',
            selector: '.contact-us-heading',
            default: 'CONTACT US'
        },
        title: {
            type: 'string',
            source: 'html',
            selector: '.contact-us-title',
            default: 'Request a call or send us a message'
        },
        buttonText: {
            type: 'string',
            source: 'html',
            selector: '.contact-us-button',
            default: 'Contact us'
        },
        buttonUrl: {
            type: 'string',
            default: '#'
        },
        backgroundDotsUrl: {
            type: 'string',
            default: ''
        },
        backgroundCircleUrl: {
            type: 'string',
            default: ''
        }
    },

    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        
        const dotsStyle = {
            ...styles.backgroundDots,
            backgroundImage: attributes.backgroundDotsUrl ? `url(${attributes.backgroundDotsUrl})` : 'radial-gradient(circle, #6653C6 2px, transparent 2px)',
            backgroundSize: attributes.backgroundDotsUrl ? 'cover' : '20px 20px'
        };

        const circleStyle = {
            ...styles.backgroundCircle,
            backgroundImage: attributes.backgroundCircleUrl ? `url(${attributes.backgroundCircleUrl})` : 'none',
            backgroundColor: attributes.backgroundCircleUrl ? 'transparent' : 'rgba(102, 83, 198, 0.3)',
            borderRadius: attributes.backgroundCircleUrl ? '0' : '50%'
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Button Settings">
                        <TextControl
                            label="Button URL"
                            value={attributes.buttonUrl}
                            onChange={(buttonUrl) => setAttributes({ buttonUrl })}
                            help="Enter the URL for the contact button"
                        />
                    </PanelBody>
                    <PanelBody title="Background Settings">
                        <div style={{ marginBottom: '1rem' }}>
                            <p><strong>Background Dots Image</strong></p>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) => setAttributes({ backgroundDotsUrl: media.url })}
                                    allowedTypes={['image']}
                                    value={attributes.backgroundDotsUrl}
                                    render={({ open }) => (
                                        <Button 
                                            onClick={open}
                                            variant="secondary"
                                            style={{ display: 'block', marginBottom: '8px' }}
                                        >
                                            {attributes.backgroundDotsUrl ? 'Change Dots Background' : 'Upload Dots Background'}
                                        </Button>
                                    )}
                                />
                            </MediaUploadCheck>
                            {attributes.backgroundDotsUrl && (
                                <Button 
                                    onClick={() => setAttributes({ backgroundDotsUrl: '' })}
                                    variant="link"
                                    isDestructive
                                >
                                    Remove Dots Background
                                </Button>
                            )}
                        </div>
                        <div>
                            <p><strong>Background Circle Image</strong></p>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) => setAttributes({ backgroundCircleUrl: media.url })}
                                    allowedTypes={['image']}
                                    value={attributes.backgroundCircleUrl}
                                    render={({ open }) => (
                                        <Button 
                                            onClick={open}
                                            variant="secondary"
                                            style={{ display: 'block', marginBottom: '8px' }}
                                        >
                                            {attributes.backgroundCircleUrl ? 'Change Circle Background' : 'Upload Circle Background'}
                                        </Button>
                                    )}
                                />
                            </MediaUploadCheck>
                            {attributes.backgroundCircleUrl && (
                                <Button 
                                    onClick={() => setAttributes({ backgroundCircleUrl: '' })}
                                    variant="link"
                                    isDestructive
                                >
                                    Remove Circle Background
                                </Button>
                            )}
                        </div>
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps} style={styles.section}>
                    <div style={dotsStyle}></div>
                    <div style={circleStyle}></div>
                    <div style={styles.container}>
                        <div>
                            <RichText
                                tagName="h3"
                                className="contact-us-heading"
                                style={styles.heading}
                                value={attributes.heading}
                                onChange={(heading) => setAttributes({ heading })}
                                placeholder="CONTACT US"
                            />
                            <RichText
                                tagName="h2"
                                className="contact-us-title"
                                style={styles.title}
                                value={attributes.title}
                                onChange={(title) => setAttributes({ title })}
                                placeholder="Request a call or send us a message"
                            />
                        </div>
                        <RichText
                            tagName="span"
                            className="contact-us-button"
                            style={styles.button}
                            value={attributes.buttonText}
                            onChange={(buttonText) => setAttributes({ buttonText })}
                            placeholder="Contact us"
                        />
                    </div>
                </div>
            </>
        );
    },

    save: ({ attributes }) => {
        const blockProps = useBlockProps.save();
        
        const dotsStyle = {
            ...styles.backgroundDots,
            backgroundImage: attributes.backgroundDotsUrl ? `url(${attributes.backgroundDotsUrl})` : 'radial-gradient(circle, #6653C6 2px, transparent 2px)',
            backgroundSize: attributes.backgroundDotsUrl ? 'cover' : '20px 20px'
        };

        const circleStyle = {
            ...styles.backgroundCircle,
            backgroundImage: attributes.backgroundCircleUrl ? `url(${attributes.backgroundCircleUrl})` : 'none',
            backgroundColor: attributes.backgroundCircleUrl ? 'transparent' : 'rgba(102, 83, 198, 0.3)',
            borderRadius: attributes.backgroundCircleUrl ? '0' : '50%'
        };

        return (
            <div {...blockProps} style={styles.section}>
                <div style={dotsStyle}></div>
                <div style={circleStyle}></div>
                <div style={styles.container}>
                    <div>
                        <RichText.Content
                            tagName="h3"
                            className="contact-us-heading"
                            style={styles.heading}
                            value={attributes.heading}
                        />
                        <RichText.Content
                            tagName="h2"
                            className="contact-us-title"
                            style={styles.title}
                            value={attributes.title}
                        />
                    </div>
                    <a 
                        href={attributes.buttonUrl}
                        style={styles.button}
                    >
                        <RichText.Content
                            tagName="span"
                            className="contact-us-button"
                            value={attributes.buttonText}
                        />
                    </a>
                </div>
            </div>
        );
    },
});