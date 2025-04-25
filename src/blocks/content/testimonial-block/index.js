import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, ColorPalette, TabPanel, TextControl, RangeControl, Button } from '@wordpress/components';
import { styles } from './styles';
import './frontend.css';

registerBlockType('bevision/testimonial-block', {
    title: 'Testimonial Block',
    icon: 'format-quote',
    category: 'design',
    attributes: {
        introTitle: {
            type: 'string',
            default: 'Introduction text, describing problem'
        },
        introParagraphs: {
            type: 'array',
            default: [
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            ]
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
            introTitle, introParagraphs,
            quote, authorName, authorTitle,
            backgroundColor, quoteColor, authorNameColor, authorTitleColor,
            quoteFontSize, authorNameFontSize, authorTitleFontSize,
            borderRadius, authorImage
        } = attributes;

        // Helper to update paragraphs
        const updateParagraph = (value, idx) => {
            const updated = [...introParagraphs];
            updated[idx] = value;
            setAttributes({ introParagraphs: updated });
        };

        return (
            <div style={{ display: 'flex', gap: '40px', alignItems: 'stretch', background: 'transparent', padding: '40px 0', maxWidth: '1440px', margin: '0 auto' }}>
                {/* Left column: Introduction/problem */}
                <div style={{ flex: 1.2, color: '#2e2367', paddingRight: '24px' }}>
                    <RichText
                        tagName="h2"
                        value={introTitle}
                        onChange={value => setAttributes({ introTitle: value })}
                        style={{ fontWeight: 700, fontSize: '2rem', marginBottom: '1rem' }}
                        placeholder="Introduction text, describing problem"
                    />
                    {introParagraphs.map((p, idx) => (
                        <RichText
                            key={idx}
                            tagName="p"
                            value={p}
                            onChange={value => updateParagraph(value, idx)}
                            style={{ marginBottom: '1rem', fontSize: '1rem', color: '#2e2367' }}
                            placeholder={`Paragraph ${idx + 1}`}
                        />
                    ))}
                </div>

                {/* Right column: Testimonial */}
                <div style={{ flex: 1, background: '#f8f6ff', border: '2px solid #7e6eea', borderRadius: '18px', padding: '32px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <InspectorControls>
                        <TabPanel
                            className="bevision-tab-panel"
                            activeClass="is-active"
                            tabs={[
                                { name: 'content', title: 'კონტენტი', className: 'tab-content' },
                                { name: 'style', title: 'სტილი', className: 'tab-style' }
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
                                                label="ბორდერის რადიუსი"
                                                value={borderRadius}
                                                onChange={(value) => setAttributes({ borderRadius: value })}
                                                min={0}
                                                max={32}
                                            />
                                        </PanelBody>
                                    );
                                }
                            }}
                        </TabPanel>
                    </InspectorControls>
                    <blockquote style={{ fontSize: '1.1rem', color: '#2e2367', marginBottom: '2rem', fontStyle: 'italic' }}>
                        {quote}
                    </blockquote>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        {authorImage?.url && (
                            <img src={authorImage.url} alt={authorImage.alt} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }} />
                        )}
                        <div>
                            <div style={{ fontWeight: 'bold', color: '#2e2367' }}>{authorName}</div>
                            <div style={{ fontSize: '0.95rem', color: '#7e6eea' }}>{authorTitle}</div>
                        </div>
                    </div>
                </div>
            </div>
        );

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
            introTitle, introParagraphs,
            quote, authorName, authorTitle,
            backgroundColor, quoteColor, authorNameColor, authorTitleColor,
            quoteFontSize, authorNameFontSize, authorTitleFontSize,
            borderRadius, authorImage
        } = attributes;
        return (
  <div className="bevision-testimonial-block">
    {/* Left column: Introduction/problem */}
    <div style={{ flex: 1.2, color: '#2e2367', paddingRight: '24px' }}>
      <h2 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: '1rem' }}>{introTitle}</h2>
      {introParagraphs && introParagraphs.map((p, idx) => (
        <p key={idx} style={{ marginBottom: '1rem', fontSize: '0.95rem', color: '#2e2367', lineHeight: '1.5' }}>{p}</p>
      ))}
    </div>
    {/* Right column: Testimonial */}
    <div className="bevision-testimonial-block__testimonial">
      <blockquote className="quote-text" dangerouslySetInnerHTML={{ __html: quote }}></blockquote>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {authorImage?.url && (
          <img src={authorImage.url} alt={authorImage.alt} />
        )}
        <div style={{ textAlign: 'center' }}>
          <div className="author-name" dangerouslySetInnerHTML={{ __html: authorName }}></div>
          <div className="author-title" dangerouslySetInnerHTML={{ __html: authorTitle }}></div>
        </div>
      </div>
    </div>
  </div>
);
    }
});
