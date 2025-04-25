import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, ColorPicker, RangeControl } from '@wordpress/components';
import { styles } from './styles';
import './frontend.css';

registerBlockType('bevision/blog-inner-content', {
    title: 'Blog Inner Content',
    icon: 'text-page',
    category: 'design',
    attributes: {
        title: {
            type: 'string',
            default: 'Introduction text, describing problem, Full width'
        },
        content: {
            type: 'array',
            default: [
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            ]
        },
        titleColor: {
            type: 'string',
            default: '#323377'
        },
        textColor: {
            type: 'string',
            default: '#333333'
        },
        titleFontSize: {
            type: 'number',
            default: 36
        },
        contentFontSize: {
            type: 'number',
            default: 16
        }
    },
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        const {
            title, content, titleColor, textColor, 
            titleFontSize, contentFontSize
        } = attributes;

        // Helper to update content paragraphs
        const updateContent = (value, idx) => {
            const updated = [...content];
            updated[idx] = value;
            setAttributes({ content: updated });
        };

        // Helper to add a new paragraph
        const addParagraph = () => {
            setAttributes({ content: [...content, ''] });
        };

        // Helper to remove a paragraph
        const removeParagraph = (idx) => {
            const updated = [...content];
            updated.splice(idx, 1);
            setAttributes({ content: updated });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Style Settings" initialOpen={true}>
                        <p><strong>Title Color</strong></p>
                        <ColorPicker
                            color={titleColor}
                            onChangeComplete={(color) => setAttributes({ titleColor: color.hex })}
                            disableAlpha
                        />
                        

                        
                        <p><strong>Text Color</strong></p>
                        <ColorPicker
                            color={textColor}
                            onChangeComplete={(color) => setAttributes({ textColor: color.hex })}
                            disableAlpha
                        />

                        <RangeControl
                            label="Title Font Size"
                            value={titleFontSize}
                            onChange={(value) => setAttributes({ titleFontSize: value })}
                            min={18}
                            max={60}
                        />
                        


                        <RangeControl
                            label="Content Font Size"
                            value={contentFontSize}
                            onChange={(value) => setAttributes({ contentFontSize: value })}
                            min={12}
                            max={24}
                        />
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps} style={styles.container()}>
                    <RichText
                        tagName="h2"
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                        placeholder="Enter title..."
                        style={{
                            ...styles.title(),
                            color: titleColor,
                            fontSize: `${titleFontSize}px`
                        }}
                    />
                    

                    
                    <div style={styles.content()}>
                        {content.map((paragraph, index) => (
                            <div key={index} style={{ position: 'relative', marginBottom: '20px' }}>
                                <RichText
                                    tagName="p"
                                    value={paragraph}
                                    onChange={(value) => updateContent(value, index)}
                                    placeholder="Enter content paragraph..."
                                    style={{
                                        ...styles.paragraph(),
                                        color: textColor,
                                        fontSize: `${contentFontSize}px`
                                    }}
                                />
                                <Button
                                    isDestructive
                                    isSmall
                                    onClick={() => removeParagraph(index)}
                                    style={{ position: 'absolute', top: '0', right: '0' }}
                                >
                                    ✕
                                </Button>
                            </div>
                        ))}
                        
                        <Button
                            isPrimary
                            onClick={addParagraph}
                            style={{ marginBottom: '20px' }}
                        >
                            Add Paragraph
                        </Button>
                    </div>
                </div>
            </>
        );
    },
    save: ({ attributes }) => {
        const {
            title, content, titleColor, textColor, 
            titleFontSize, contentFontSize
        } = attributes;

        return (
            <div className="wp-block-bevision-blog-inner-content">
                <h2 
                    className="blog-title"
                    style={{
                        color: titleColor,
                        fontSize: `${titleFontSize}px`
                    }}
                >
                    {title}
                </h2>
                


                <div className="blog-content">
                    {content.map((paragraph, index) => (
                        <p 
                            key={index}
                            className="blog-paragraph"
                            style={{
                                color: textColor,
                                fontSize: `${contentFontSize}px`
                            }}
                            dangerouslySetInnerHTML={{ __html: paragraph }}
                        ></p>
                    ))}
                </div>
            </div>
        );
    }
});
