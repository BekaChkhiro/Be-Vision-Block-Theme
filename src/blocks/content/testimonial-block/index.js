import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, ColorPalette, TabPanel, TextControl, RangeControl, Button } from '@wordpress/components';
import { styles } from './styles';

registerBlockType('bevision/testimonial-block', {
    title: 'Testimonial Block',
    icon: 'format-quote',
    category: 'design',
    attributes: {
        // Problem section
        problemTitle: {
            type: 'string',
            default: 'Introduction text, describing problem'
        },
        problemText1: {
            type: 'string',
            default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        problemText2: {
            type: 'string',
            default: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        problemText3: {
            type: 'string',
            default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        // Testimonial section
        quote: {
            type: 'string',
            default: 'Vivamus ac eleifend massa. Sed a dui aliquam, posuere risus eget, maximus risus. Morbi a purus mi. Vivamus enim tortor, lacinia nec lacus non, efficitur varius velit. Nunc id facilisis massa, et lobortis lorem'
        },
        authorName: {
            type: 'string',
            default: 'Tamar Maisuradze'
        },
        authorTitle: {
            type: 'string',
            default: 'Data analyst'
        },
        authorImage: {
            type: 'object',
            default: {
                url: '',
                alt: '',
                id: null
            }
        }
    },
        quote: {
            type: 'string',
            source: 'html',
            selector: '.quote-text',
            default: 'Vivamus ac eleifend massa. Sed a dui aliquam, posuere risus eget, maximus risus. Morbi a purus mi. Vivamus enim tortor, lacinia nec lacus non, efficitur varius velit. Nunc id facilisis massa, et lobortis lorem'
        },
        authorName: {
            type: 'string',
            source: 'html',
            selector: '.author-name',
            default: 'Tamar Maisuradze'
        },
        authorTitle: {
            type: 'string',
            source: 'html',
            selector: '.author-title',
            default: 'Data analyst'
        },
        backgroundColor: {
            type: 'string',
            default: '#FFFFFF'
        },
        quoteColor: {
            type: 'string',
            default: '#333333'
        },
        authorNameColor: {
            type: 'string',
            default: '#2D2A5F'
        },
        authorTitleColor: {
            type: 'string',
            default: '#8399AF'
        },
        quoteFontSize: {
            type: 'number',
            default: 16
        },
        authorNameFontSize: {
            type: 'number',
            default: 18
        },
        authorTitleFontSize: {
            type: 'number',
            default: 14
        },
        borderRadius: {
            type: 'number',
            default: 10
        },
        authorImage: {
            type: 'object',
            default: {
                url: '',
                alt: '',
                id: null
            }
        }
    },
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        const {
            problemTitle, problemText1, problemText2, problemText3,
            quote, authorName, authorTitle, authorImage
        } = attributes;

        // Responsive
        const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

        // Styles matching user's CSS
        const styles = {
            container: {
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                maxWidth: '1200px',
                margin: '0 auto',
                fontFamily: 'Arial, sans-serif',
                gap: '30px',
                padding: isMobile ? '0 15px' : undefined
            },
            problemSection: {
                flex: '0 0 45%'
            },
            problemTitle: {
                color: '#2d2d5f',
                fontSize: '28px',
                fontWeight: 700,
                marginBottom: '20px',
                lineHeight: 1.2
            },
            problemText: {
                color: '#2d2d5f',
                fontSize: '16px',
                lineHeight: 1.6,
                marginBottom: '15px'
            },
            testimonialSection: {
                flex: '0 0 55%',
                display: 'flex',
                alignItems: 'center'
            },
            testimonialCard: {
                backgroundColor: '#f8f9fa',
                borderRadius: '15px',
                padding: '30px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                width: '100%'
            },
            testimonialQuote: {
                color: '#2d2d5f',
                fontSize: '18px',
                lineHeight: 1.6,
                textAlign: 'center',
                marginBottom: '25px',
                fontStyle: 'italic'
            },
            testimonialAuthor: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            },
            authorImage: {
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginBottom: '15px'
            },
            authorInfo: {
                textAlign: 'center'
            },
            authorName: {
                color: '#2d2d5f',
                fontSize: '20px',
                fontWeight: 600,
                margin: '0 0 5px 0'
            },
            authorTitle: {
                color: '#6c757d',
                fontSize: '16px',
                margin: 0
            }
        };

        return (
            <div {...blockProps} style={styles.container}>
                <div style={styles.problemSection}>
                    <RichText
                        tagName="h1"
                        value={problemTitle}
                        onChange={value => setAttributes({ problemTitle: value })}
                        style={styles.problemTitle}
                        placeholder="Problem Title"
                        allowedFormats={['core/bold', 'core/italic']}
                    />
                    <RichText
                        tagName="p"
                        value={problemText1}
                        onChange={value => setAttributes({ problemText1: value })}
                        style={styles.problemText}
                        placeholder="Problem paragraph 1"
                    />
                    <RichText
                        tagName="p"
                        value={problemText2}
                        onChange={value => setAttributes({ problemText2: value })}
                        style={styles.problemText}
                        placeholder="Problem paragraph 2"
                    />
                    <RichText
                        tagName="p"
                        value={problemText3}
                        onChange={value => setAttributes({ problemText3: value })}
                        style={styles.problemText}
                        placeholder="Problem paragraph 3"
                    />
                </div>
                <div style={styles.testimonialSection}>
                    <div style={styles.testimonialCard}>
                        <RichText
                            tagName="p"
                            value={quote}
                            onChange={value => setAttributes({ quote: value })}
                            style={styles.testimonialQuote}
                            placeholder="Testimonial quote"
                        />
                        <div style={styles.testimonialAuthor}>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={media => setAttributes({ authorImage: { url: media.url, alt: media.alt, id: media.id } })}
                                    allowedTypes={['image']}
                                    value={authorImage?.id}
                                    render={({ open }) => (
                                        <img
                                            src={authorImage?.url || 'https://via.placeholder.com/70'}
                                            alt={authorImage?.alt || 'Author'}
                                            style={styles.authorImage}
                                            onClick={open}
                                        />
                                    )}
                                />
                            </MediaUploadCheck>
                            <div style={styles.authorInfo}>
                                <RichText
                                    tagName="h3"
                                    value={authorName}
                                    onChange={value => setAttributes({ authorName: value })}
                                    style={styles.authorName}
                                    placeholder="Author Name"
                                />
                                <RichText
                                    tagName="p"
                                    value={authorTitle}
                                    onChange={value => setAttributes({ authorTitle: value })}
                                    style={styles.authorTitle}
                                    placeholder="Author Title"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
        const blockProps = useBlockProps();
        const { 
            quote, authorName, authorTitle,
            backgroundColor, quoteColor, authorNameColor, authorTitleColor,
            quoteFontSize, authorNameFontSize, authorTitleFontSize,
            borderRadius, authorImage
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
                                            label="ციტატა"
                                            value={quote}
                                            onChange={(value) => setAttributes({ quote: value })}
                                        />
                                        <TextControl
                                            label="ავტორის სახელი"
                                            value={authorName}
                                            onChange={(value) => setAttributes({ authorName: value })}
                                        />
                                        <TextControl
                                            label="ავტორის პოზიცია"
                                            value={authorTitle}
                                            onChange={(value) => setAttributes({ authorTitle: value })}
                                        />
                                        <div className="editor-post-featured-image">
                                            <MediaUploadCheck>
                                                <MediaUpload
                                                    onSelect={(media) => {
                                                        setAttributes({
                                                            authorImage: {
                                                                url: media.url,
                                                                alt: media.alt,
                                                                id: media.id
                                                            }
                                                        });
                                                    }}
                                                    allowedTypes={['image']}
                                                    value={authorImage?.id}
                                                    render={({ open }) => (
                                                        <div>
                                                            <Button 
                                                                onClick={open}
                                                                className={authorImage?.url ? 'editor-post-featured-image__preview' : 'editor-post-featured-image__toggle'}
                                                            >
                                                                {authorImage?.url ? 'შეცვალე ავტორის ფოტო' : 'აირჩიე ავტორის ფოტო'}
                                                            </Button>
                                                            {authorImage?.url && (
                                                                <Button 
                                                                    onClick={() => {
                                                                        setAttributes({
                                                                            authorImage: {
                                                                                url: '',
                                                                                alt: '',
                                                                                id: null
                                                                            }
                                                                        });
                                                                    }}
                                                                    isDestructive
                                                                >
                                                                    წაშალე ავტორის ფოტო
                                                                </Button>
                                                            )}
                                                        </div>
                                                    )}
                                                />
                                            </MediaUploadCheck>
                                            {authorImage?.url && (
                                                <div style={{ marginTop: '10px' }}>
                                                    <img 
                                                        src={authorImage.url} 
                                                        alt={authorImage.alt} 
                                                        style={{ maxWidth: '100px', borderRadius: '50%' }} 
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </PanelBody>
                                );
                            } else if (tab.name === 'style') {
                                return (
                                    <PanelBody>
                                        <div>
                                            <p>ფონის ფერი</p>
                                            <ColorPalette
                                                value={backgroundColor}
                                                onChange={(color) => setAttributes({ backgroundColor: color })}
                                            />
                                        </div>
                                        <div>
                                            <p>ციტატის ფერი</p>
                                            <ColorPalette
                                                value={quoteColor}
                                                onChange={(color) => setAttributes({ quoteColor: color })}
                                            />
                                        </div>
                                        <div>
                                            <p>ავტორის სახელის ფერი</p>
                                            <ColorPalette
                                                value={authorNameColor}
                                                onChange={(color) => setAttributes({ authorNameColor: color })}
                                            />
                                        </div>
                                        <div>
                                            <p>ავტორის პოზიციის ფერი</p>
                                            <ColorPalette
                                                value={authorTitleColor}
                                                onChange={(color) => setAttributes({ authorTitleColor: color })}
                                            />
                                        </div>
                                        <RangeControl
                                            label="ციტატის ზომა"
                                            value={quoteFontSize}
                                            onChange={(value) => setAttributes({ quoteFontSize: value })}
                                            min={12}
                                            max={24}
                                        />
                                        <RangeControl
                                            label="ავტორის სახელის ზომა"
                                            value={authorNameFontSize}
                                            onChange={(value) => setAttributes({ authorNameFontSize: value })}
                                            min={12}
                                            max={24}
                                        />
                                        <RangeControl
                                            label="ავტორის პოზიციის ზომა"
                                            value={authorTitleFontSize}
                                            onChange={(value) => setAttributes({ authorTitleFontSize: value })}
                                            min={10}
                                            max={20}
                                        />
                                        <RangeControl
                                            label="კუთხეების რადიუსი"
                                            value={borderRadius}
                                            onChange={(value) => setAttributes({ borderRadius: value })}
                                            min={0}
                                            max={50}
                                        />
                                    </PanelBody>
                                );
                            }
                        }}
                    </TabPanel>
                </InspectorControls>
                <div {...blockProps}>
                    <div style={{
                        ...styles.container(),
                        backgroundColor,
                        borderRadius: `${borderRadius}px`
                    }}>
                        <div style={styles.testimonialContent()}>
                            <div style={{width: '100%'}}>
                                <RichText
                                    tagName="p"
                                    className="quote-text"
                                    value={quote}
                                    onChange={(content) => setAttributes({ quote: content })}
                                    placeholder="Enter testimonial quote here..."
                                    style={{
                                        ...styles.quote(),
                                        color: quoteColor,
                                        fontSize: `${quoteFontSize}px`
                                    }}
                                />
                            </div>
                            <div style={styles.authorContainer()}>
                                <div style={styles.authorImageContainer()}>
                                    {authorImage?.url ? (
                                        <img 
                                            src={authorImage.url} 
                                            alt={authorImage.alt} 
                                            style={styles.authorImage()} 
                                        />
                                    ) : (
                                        <div style={{
                                            ...styles.authorImagePlaceholder(),
                                            borderRadius: '50%',
                                            backgroundColor: '#f0f0f0',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <span style={{color: '#666', fontSize: '12px'}}>ფოტო</span>
                                        </div>
                                    )}
                                </div>
                                <div style={styles.authorInfo()}>
                                    <RichText
                                        tagName="h4"
                                        className="author-name"
                                        value={authorName}
                                        onChange={(content) => setAttributes({ authorName: content })}
                                        placeholder="Author Name"
                                        style={{
                                            ...styles.authorName(),
                                            color: authorNameColor,
                                            fontSize: `${authorNameFontSize}px`
                                        }}
                                    />
                                    <RichText
                                        tagName="p"
                                        className="author-title"
                                        value={authorTitle}
                                        onChange={(content) => setAttributes({ authorTitle: content })}
                                        placeholder="Author Title"
                                        style={{
                                            ...styles.authorTitle(),
                                            color: authorTitleColor,
                                            fontSize: `${authorTitleFontSize}px`
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    },
    save: ({ attributes }) => {
        const {
            problemTitle, problemText1, problemText2, problemText3,
            quote, authorName, authorTitle, authorImage
        } = attributes;
        const isMobile = false; // SSR fallback, can be improved
        const styles = {
            container: {
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                maxWidth: '1200px',
                margin: '0 auto',
                fontFamily: 'Arial, sans-serif',
                gap: '30px',
                padding: isMobile ? '0 15px' : undefined
            },
            problemSection: {
                flex: '0 0 45%'
            },
            problemTitle: {
                color: '#2d2d5f',
                fontSize: '28px',
                fontWeight: 700,
                marginBottom: '20px',
                lineHeight: 1.2
            },
            problemText: {
                color: '#2d2d5f',
                fontSize: '16px',
                lineHeight: 1.6,
                marginBottom: '15px'
            },
            testimonialSection: {
                flex: '0 0 55%',
                display: 'flex',
                alignItems: 'center'
            },
            testimonialCard: {
                backgroundColor: '#f8f9fa',
                borderRadius: '15px',
                padding: '30px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                width: '100%'
            },
            testimonialQuote: {
                color: '#2d2d5f',
                fontSize: '18px',
                lineHeight: 1.6,
                textAlign: 'center',
                marginBottom: '25px',
                fontStyle: 'italic'
            },
            testimonialAuthor: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            },
            authorImage: {
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginBottom: '15px'
            },
            authorInfo: {
                textAlign: 'center'
            },
            authorName: {
                color: '#2d2d5f',
                fontSize: '20px',
                fontWeight: 600,
                margin: '0 0 5px 0'
            },
            authorTitle: {
                color: '#6c757d',
                fontSize: '16px',
                margin: 0
            }
        };
        return (
            <div style={styles.container}>
                <div style={styles.problemSection}>
                    <h1 style={styles.problemTitle}>{problemTitle}</h1>
                    <p style={styles.problemText}>{problemText1}</p>
                    <p style={styles.problemText}>{problemText2}</p>
                    <p style={styles.problemText}>{problemText3}</p>
                </div>
                <div style={styles.testimonialSection}>
                    <div style={styles.testimonialCard}>
                        <p style={styles.testimonialQuote}>
                            {quote}
                        </p>
                        <div style={styles.testimonialAuthor}>
                            {authorImage?.url && (
                                <img
                                    src={authorImage.url}
                                    alt={authorImage.alt || 'Author'}
                                    style={styles.authorImage}
                                />
                            )}
                            <div style={styles.authorInfo}>
                                <h3 style={styles.authorName}>{authorName}</h3>
                                <p style={styles.authorTitle}>{authorTitle}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
        const { 
            quote, authorName, authorTitle,
            backgroundColor, quoteColor, authorNameColor, authorTitleColor,
            quoteFontSize, authorNameFontSize, authorTitleFontSize,
            borderRadius, authorImage
        } = attributes;
        
        return (
            <div style={{
                ...styles.container(),
                backgroundColor,
                borderRadius: `${borderRadius}px`
            }}>
                <div style={styles.testimonialContent()}>
                    <div style={{width: '100%'}}>
                        <p 
                            className="quote-text"
                            style={{
                                ...styles.quote(),
                                color: quoteColor,
                                fontSize: `${quoteFontSize}px`
                            }}
                            dangerouslySetInnerHTML={{ __html: quote }}
                        ></p>
                    </div>
                    <div style={styles.authorContainer()}>
                        <div style={styles.authorImageContainer()}>
                            {authorImage?.url && (
                                <img 
                                    src={authorImage.url} 
                                    alt={authorImage.alt} 
                                    style={styles.authorImage()} 
                                />
                            )}
                        </div>
                        <div style={styles.authorInfo()}>
                            <h4 
                                className="author-name"
                                style={{
                                    ...styles.authorName(),
                                    color: authorNameColor,
                                    fontSize: `${authorNameFontSize}px`
                                }}
                                dangerouslySetInnerHTML={{ __html: authorName }}
                            ></h4>
                            <p 
                                className="author-title"
                                style={{
                                    ...styles.authorTitle(),
                                    color: authorTitleColor,
                                    fontSize: `${authorTitleFontSize}px`
                                }}
                                dangerouslySetInnerHTML={{ __html: authorTitle }}
                            ></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
