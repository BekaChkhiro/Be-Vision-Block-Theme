import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPalette, RangeControl } from '@wordpress/components';

const blockStyle = `
    .about-section {
        background-color: var(--bg-color);
        padding: 80px 0;
        color: var(--text-color);
        position: relative;
        overflow: hidden;
    }

    .about-section .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    }

    .about-section .section-title {
        font-size: var(--title-size);
        font-weight: bold;
        margin-bottom: 40px;
        text-align: left;
    }

    .about-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 60px;
    }

    .about-text {
        flex: 1;
    }

    .description {
        font-size: var(--description-size);
        line-height: 1.6;
        margin-bottom: 40px;
        opacity: 0.9;
    }

    .features {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .feature-title {
        font-size: var(--feature-title-size);
        font-weight: bold;
        margin: 0;
    }

    .stats-image {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .stats-image img {
        max-width: 100%;
        height: auto;
        filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
    }

    @media (max-width: 768px) {
        .about-content {
            flex-direction: column;
        }
        
        .stats-image {
            order: -1;
        }
    }
`;

registerBlockType('bevision/about', {
    title: 'About Section',
    icon: 'align-center',
    category: 'bevision',
    attributes: {
        description: {
            type: 'string',
            source: 'html',
            selector: '.description',
            default: 'Our business intelligence consulting team delves into operational processes, data workflows, and organization structures to identify the BI system\'s goals and use cases.'
        },
        featureTitle1: {
            type: 'string',
            source: 'html',
            selector: '.feature-title-1',
            default: 'Better decisions for your business'
        },
        featureTitle2: {
            type: 'string',
            source: 'html',
            selector: '.feature-title-2',
            default: 'Fast and smooth deployment'
        },
        backgroundColor: {
            type: 'string',
            default: '#00C853'
        },
        textColor: {
            type: 'string',
            default: '#ffffff'
        },
        titleFontSize: {
            type: 'number',
            default: 48
        },
        descriptionFontSize: {
            type: 'number',
            default: 18
        },
        featureTitleFontSize: {
            type: 'number',
            default: 36
        }
    },

    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        const { 
            description, featureTitle1, featureTitle2,
            backgroundColor, textColor,
            titleFontSize, descriptionFontSize, featureTitleFontSize
        } = attributes;

        const style = {
            '--bg-color': backgroundColor,
            '--text-color': textColor,
            '--title-size': `${titleFontSize}px`,
            '--description-size': `${descriptionFontSize}px`,
            '--feature-title-size': `${featureTitleFontSize}px`
        };

        return (
            <>
                <style>{blockStyle}</style>
                <InspectorControls>
                    <PanelBody title="Colors">
                        <div className="components-base-control">
                            <label className="components-base-control__label">Background Color</label>
                            <ColorPalette
                                value={backgroundColor}
                                onChange={(color) => setAttributes({ backgroundColor: color })}
                            />
                        </div>
                        <div className="components-base-control">
                            <label className="components-base-control__label">Text Color</label>
                            <ColorPalette
                                value={textColor}
                                onChange={(color) => setAttributes({ textColor: color })}
                            />
                        </div>
                    </PanelBody>
                    <PanelBody title="Typography">
                        <RangeControl
                            label="Title Font Size"
                            value={titleFontSize}
                            onChange={(size) => setAttributes({ titleFontSize: size })}
                            min={32}
                            max={72}
                        />
                        <RangeControl
                            label="Description Font Size"
                            value={descriptionFontSize}
                            onChange={(size) => setAttributes({ descriptionFontSize: size })}
                            min={14}
                            max={24}
                        />
                        <RangeControl
                            label="Feature Title Font Size"
                            value={featureTitleFontSize}
                            onChange={(size) => setAttributes({ featureTitleFontSize: size })}
                            min={24}
                            max={48}
                        />
                    </PanelBody>
                </InspectorControls>
                
                <div {...blockProps} className="about-section" style={style}>
                    <div className="container">
                        <h2 className="section-title">Why is it so important?</h2>
                        <div className="about-content">
                            <div className="about-text">
                                <RichText
                                    tagName="p"
                                    className="description"
                                    value={description}
                                    onChange={(description) => setAttributes({ description })}
                                    placeholder="Enter description here..."
                                />
                                <div className="features">
                                    <RichText
                                        tagName="h3"
                                        className="feature-title feature-title-1"
                                        value={featureTitle1}
                                        onChange={(featureTitle1) => setAttributes({ featureTitle1 })}
                                        placeholder="Enter first feature title..."
                                    />
                                    <RichText
                                        tagName="h3"
                                        className="feature-title feature-title-2"
                                        value={featureTitle2}
                                        onChange={(featureTitle2) => setAttributes({ featureTitle2 })}
                                        placeholder="Enter second feature title..."
                                    />
                                </div>
                            </div>
                            <div className="stats-image">
                                <img src="/wp-content/themes/BeVision/src/images/stats-graph.png" alt="Statistics Graph" />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    },

    save: ({ attributes }) => {
        const blockProps = useBlockProps.save();
        const { 
            description, featureTitle1, featureTitle2,
            backgroundColor, textColor,
            titleFontSize, descriptionFontSize, featureTitleFontSize
        } = attributes;

        const style = {
            '--bg-color': backgroundColor,
            '--text-color': textColor,
            '--title-size': `${titleFontSize}px`,
            '--description-size': `${descriptionFontSize}px`,
            '--feature-title-size': `${featureTitleFontSize}px`
        };

        return (
            <>
                <style>{blockStyle}</style>
                <div {...blockProps} className="about-section" style={style}>
                    <div className="container">
                        <h2 className="section-title">Why is it so important?</h2>
                        <div className="about-content">
                            <div className="about-text">
                                <RichText.Content
                                    tagName="p"
                                    className="description"
                                    value={description}
                                />
                                <div className="features">
                                    <RichText.Content
                                        tagName="h3"
                                        className="feature-title feature-title-1"
                                        value={featureTitle1}
                                    />
                                    <RichText.Content
                                        tagName="h3"
                                        className="feature-title feature-title-2"
                                        value={featureTitle2}
                                    />
                                </div>
                            </div>
                            <div className="stats-image">
                                <img src="/wp-content/themes/BeVision/src/images/stats-graph.png" alt="Statistics Graph" />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
});
