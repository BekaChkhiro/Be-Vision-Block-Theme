import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, ColorPalette, Button, TabPanel, TextControl, RangeControl } from '@wordpress/components';
import { styles } from './styles';

registerBlockType('bevision/hero-section', {
    title: 'Hero Section',
    icon: 'cover-image',
    category: 'design',
    attributes: {
        title: {
            type: 'string',
            source: 'html',
            selector: 'h1',
            default: 'Start analyzing your data today'
        },
        subtitle: {
            type: 'string',
            source: 'html',
            selector: '.subtitle',
            default: 'Lead with Data'
        },
        description: {
            type: 'string',
            source: 'html',
            selector: 'p',
            default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        buttonText: {
            type: 'string',
            default: 'Request a demo'
        },
        backgroundColor: {
            type: 'string',
            default: '#6B46C1'
        },
        accentColor: {
            type: 'string',
            default: '#4ADE80'
        },
        textColor: {
            type: 'string',
            default: '#ffffff'
        },
        subtitleColor: {
            type: 'string',
            default: '#2FCA02'
        },
        titleColor: {
            type: 'string',
            default: '#221A4C'
        },
        descriptionColor: {
            type: 'string',
            default: '#8399AF'
        },
        buttonBgColor: {
            type: 'string',
            default: '#4ADE80'
        },
        buttonTextColor: {
            type: 'string',
            default: '#1A1A1A'
        },
        subtitleFontSize: {
            type: 'number',
            default: 24
        },
        titleFontSize: {
            type: 'number',
            default: 50
        },
        descriptionFontSize: {
            type: 'number',
            default: 18
        },
        buttonFontSize: {
            type: 'number',
            default: 18
        },
        backgroundImage: {
            type: 'object',
            default: null
        }
    },
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        const { 
            title, subtitle, description, buttonText,
            backgroundColor, accentColor, textColor,
            subtitleColor, titleColor, descriptionColor,
            buttonBgColor, buttonTextColor,
            subtitleFontSize, titleFontSize, descriptionFontSize,
            buttonFontSize, backgroundImage
        } = attributes;

        return (
            <>
                <InspectorControls>
                    <TabPanel
                        className="bevision-tab-panel"
                        activeClass="is-active"
                        tabs={[
                            {
                                name: 'content',
                                title: 'კონტენტი',
                                className: 'tab-content'
                            },
                            {
                                name: 'style',
                                title: 'სტილი',
                                className: 'tab-style'
                            }
                        ]}
                    >
                        {(tab) => {
                            if (tab.name === 'content') {
                                return (
                                    <PanelBody>
                                        <TextControl
                                            label="Subtitle"
                                            value={subtitle}
                                            onChange={(value) => setAttributes({ subtitle: value })}
                                        />
                                        <TextControl
                                            label="Title"
                                            value={title}
                                            onChange={(value) => setAttributes({ title: value })}
                                        />
                                        <TextControl
                                            label="Description"
                                            value={description}
                                            onChange={(value) => setAttributes({ description: value })}
                                        />
                                        <TextControl
                                            label="Button Text"
                                            value={buttonText}
                                            onChange={(value) => setAttributes({ buttonText: value })}
                                        />
                                        <MediaUploadCheck>
                                            <MediaUpload
                                                onSelect={(media) => setAttributes({ backgroundImage: media })}
                                                allowedTypes={['image']}
                                                value={backgroundImage ? backgroundImage.id : ''}
                                                render={({ open }) => (
                                                    <Button
                                                        onClick={open}
                                                        variant="secondary"
                                                        style={{ marginBottom: '10px', width: '100%' }}
                                                    >
                                                        {backgroundImage ? 'Change Background Image' : 'Add Background Image'}
                                                    </Button>
                                                )}
                                            />
                                        </MediaUploadCheck>
                                        {backgroundImage && (
                                            <Button
                                                onClick={() => setAttributes({ backgroundImage: null })}
                                                variant="link"
                                                isDestructive
                                            >
                                                Remove Background Image
                                            </Button>
                                        )}
                                    </PanelBody>
                                );
                            }
                            return (
                                <>
                                    <PanelBody title="Colors">
                                        <div>
                                            <p>Subtitle Color</p>
                                            <ColorPalette
                                                value={subtitleColor}
                                                onChange={(color) => setAttributes({ subtitleColor: color })}
                                            />
                                        </div>
                                        <div>
                                            <p>Title Color</p>
                                            <ColorPalette
                                                value={titleColor}
                                                onChange={(color) => setAttributes({ titleColor: color })}
                                            />
                                        </div>
                                        <div>
                                            <p>Description Color</p>
                                            <ColorPalette
                                                value={descriptionColor}
                                                onChange={(color) => setAttributes({ descriptionColor: color })}
                                            />
                                        </div>
                                        <div>
                                            <p>Button Background Color</p>
                                            <ColorPalette
                                                value={buttonBgColor}
                                                onChange={(color) => setAttributes({ buttonBgColor: color })}
                                            />
                                        </div>
                                        <div>
                                            <p>Button Text Color</p>
                                            <ColorPalette
                                                value={buttonTextColor}
                                                onChange={(color) => setAttributes({ buttonTextColor: color })}
                                            />
                                        </div>
                                    </PanelBody>
                                    <PanelBody title="Typography" initialOpen={false}>
                                        <RangeControl
                                            label="Subtitle Font Size"
                                            value={subtitleFontSize}
                                            onChange={(value) => setAttributes({ subtitleFontSize: value })}
                                            min={12}
                                            max={50}
                                        />
                                        <RangeControl
                                            label="Title Font Size"
                                            value={titleFontSize}
                                            onChange={(value) => setAttributes({ titleFontSize: value })}
                                            min={20}
                                            max={100}
                                        />
                                        <RangeControl
                                            label="Description Font Size"
                                            value={descriptionFontSize}
                                            onChange={(value) => setAttributes({ descriptionFontSize: value })}
                                            min={12}
                                            max={30}
                                        />
                                        <RangeControl
                                            label="Button Font Size"
                                            value={buttonFontSize}
                                            onChange={(value) => setAttributes({ buttonFontSize: value })}
                                            min={12}
                                            max={30}
                                        />
                                    </PanelBody>
                                </>
                            );
                        }}
                    </TabPanel>
                </InspectorControls>
                <div {...blockProps} style={styles.container()}>
                    <div className="hero-content" style={styles.heroContent()}>
                        {backgroundImage && (
                            <div style={{
                                ...styles.backgroundImage(),
                                backgroundImage: `url(${backgroundImage.url})`
                            }} />
                        )}
                        <div className="hero-text" style={styles.heroText()}>
                            <RichText
                                tagName="span"
                                className="subtitle"
                                value={subtitle}
                                onChange={(content) => setAttributes({ subtitle: content })}
                                placeholder="Lead with Data"
                                style={styles.subtitle(subtitleColor, subtitleFontSize)}
                            />
                            <RichText
                                tagName="h1"
                                value={title}
                                onChange={(content) => setAttributes({ title: content })}
                                placeholder="Start analyzing your data today"
                                style={styles.title(titleColor, titleFontSize)}
                            />
                            <RichText
                                tagName="p"
                                value={description}
                                onChange={(content) => setAttributes({ description: content })}
                                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                                style={styles.description(descriptionColor, descriptionFontSize)}
                            />
                            <RichText
                                tagName="button"
                                value={buttonText}
                                onChange={(content) => setAttributes({ buttonText: content })}
                                style={styles.button(buttonBgColor, buttonTextColor, buttonFontSize)}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    },
    save: ({ attributes }) => {
        const { 
            title, subtitle, description, buttonText,
            backgroundColor, accentColor, textColor,
            subtitleColor, titleColor, descriptionColor,
            buttonBgColor, buttonTextColor,
            subtitleFontSize, titleFontSize, descriptionFontSize,
            buttonFontSize, backgroundImage
        } = attributes;
        
        return (
            <div style={styles.container()}>
                <div className="hero-content" style={styles.heroContent()}>
                    {backgroundImage && (
                        <div style={{
                            ...styles.backgroundImage(),
                            backgroundImage: `url(${backgroundImage.url})`
                        }} />
                    )}
                    <div className="hero-text" style={styles.heroText()}>
                        <span className="subtitle" style={styles.subtitle(subtitleColor, subtitleFontSize)}>
                            {subtitle}
                        </span>
                        <h1 style={styles.title(titleColor, titleFontSize)}>
                            {title}
                        </h1>
                        <p style={styles.description(descriptionColor, descriptionFontSize)}>
                            {description}
                        </p>
                        <button style={styles.button(buttonBgColor, buttonTextColor, buttonFontSize)}>
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
});
