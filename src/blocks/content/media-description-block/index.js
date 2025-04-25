import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, Button, ToggleControl, RangeControl, TextControl } from '@wordpress/components';
import { styles } from './styles';
import './frontend.css';

registerBlockType('bevision/media-description-block', {
    title: 'Media with Description Block',
    icon: 'format-video',
    category: 'design',
    attributes: {
        title: {
            type: 'string',
            default: 'Video or image with description'
        },
        descriptions: {
            type: 'array',
            default: [
                'Vivamus ac eleifend massa. Sed a dui aliquam, posuere risus eget, maximus risus. Morbi a purus mi. Vivamus enim tortor, lacinia nec lacus non, efficitur varius velit. Nunc id facilisis massa, et lobortis lorem. Aenean in neque nec massa placerat eleifend.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
            ]
        },
        hasVideo: {
            type: 'boolean',
            default: false
        },
        imageUrl: {
            type: 'string',
            default: ''
        },
        imageAlt: {
            type: 'string',
            default: ''
        },
        imageId: {
            type: 'number',
            default: null
        },
        videoUrl: {
            type: 'string',
            default: ''
        },
        videoEmbedCode: {
            type: 'string',
            default: ''
        },
        playButtonImage: {
            type: 'object',
            default: {
                url: '',
                alt: '',
                id: null
            }
        },
        titleColor: {
            type: 'string',
            default: '#4CD137'
        },
        descriptionColor: {
            type: 'string',
            default: '#8A97A0'
        },
        titleFontSize: {
            type: 'number',
            default: 32
        },
        descriptionFontSize: {
            type: 'number',
            default: 16
        }
    },
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        const {
            title, descriptions, hasVideo,
            imageUrl, imageAlt, imageId,
            videoUrl, videoEmbedCode, playButtonImage,
            titleColor, descriptionColor,
            titleFontSize, descriptionFontSize
        } = attributes;

        // Helper to update description paragraphs
        const updateDescription = (value, idx) => {
            const updated = [...descriptions];
            updated[idx] = value;
            setAttributes({ descriptions: updated });
        };

        // Handle media selection
        const onSelectImage = (media) => {
            setAttributes({
                imageUrl: media.url,
                imageAlt: media.alt || '',
                imageId: media.id
            });
        };

        // Handle media removal
        const removeImage = () => {
            setAttributes({
                imageUrl: '',
                imageAlt: '',
                imageId: null
            });
        };
        
        // Handle play button image selection
        const onSelectPlayButtonImage = (media) => {
            setAttributes({
                playButtonImage: {
                    url: media.url,
                    alt: media.alt || 'Play button',
                    id: media.id
                }
            });
        };
        
        // Handle play button image removal
        const removePlayButtonImage = () => {
            setAttributes({
                playButtonImage: {
                    url: '',
                    alt: '',
                    id: null
                }
            });
        };

        // Preview HTML for the play button
        const playButtonHtml = (
            <div style={styles.videoOverlay()}>
                {playButtonImage && playButtonImage.url ? (
                    <img 
                        src={playButtonImage.url}
                        alt={playButtonImage.alt || 'Play'}
                        style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'contain'
                        }}
                    />
                ) : (
                    <div style={styles.playButton()}>
                        <div style={styles.playIcon()}></div>
                    </div>
                )}
            </div>
        );

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Media Settings" initialOpen={true}>
                        <ToggleControl
                            label="დაამატეთ ვიდეო"
                            help={hasVideo ? 'ვიდეო ჩართულია' : 'ვიდეო გამორთულია'}
                            checked={hasVideo}
                            onChange={(value) => setAttributes({ hasVideo: value })}
                        />
                        
                        {hasVideo && (
                            <>
                                <TextControl
                                    label="ვიდეოს URL (YouTube ან Vimeo)"
                                    value={videoUrl}
                                    onChange={(value) => setAttributes({ videoUrl: value })}
                                    help="შეიყვანეთ YouTube ან Vimeo ბმული"
                                />
                                
                                <div style={{ marginTop: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px' }}>დაკვრის ღილაკის სურათი</label>
                                    <MediaUploadCheck>
                                        <MediaUpload
                                            onSelect={onSelectPlayButtonImage}
                                            allowedTypes={['image']}
                                            value={playButtonImage?.id}
                                            render={({ open }) => (
                                                <div>
                                                    {playButtonImage && playButtonImage.url ? (
                                                        <div style={{ position: 'relative', marginBottom: '10px' }}>
                                                            <img 
                                                                src={playButtonImage.url} 
                                                                alt={playButtonImage.alt} 
                                                                style={{ 
                                                                    maxWidth: '100%', 
                                                                    maxHeight: '80px',
                                                                    display: 'block' 
                                                                }} 
                                                            />
                                                            <Button
                                                                onClick={removePlayButtonImage}
                                                                className="button is-small"
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: '0',
                                                                    right: '0',
                                                                    backgroundColor: '#fff',
                                                                    border: 'none',
                                                                    borderRadius: '50%',
                                                                    padding: '2px',
                                                                    cursor: 'pointer',
                                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                                                }}
                                                            >
                                                                ✕
                                                            </Button>
                                                        </div>
                                                    ) : null}
                                                    <Button 
                                                        onClick={open}
                                                        className="button"
                                                        variant="secondary"
                                                    >
                                                        {playButtonImage && playButtonImage.url 
                                                            ? 'შეცვალეთ ღილაკის სურათი' 
                                                            : 'აირჩიეთ ღილაკის სურათი'}
                                                    </Button>
                                                    <div style={{ fontSize: '11px', marginTop: '5px', color: '#777' }}>
                                                        იდეალური ზომა: 80x80px
                                                    </div>
                                                </div>
                                            )}
                                        />
                                    </MediaUploadCheck>
                                </div>
                            </>
                        )}
                    </PanelBody>

                    <PanelBody title="Style Settings" initialOpen={false}>
                        <div>
                            <label>Title Color</label>
                            <input
                                type="color"
                                value={titleColor}
                                onChange={(e) => setAttributes({ titleColor: e.target.value })}
                                style={{ width: '100%', marginBottom: '10px' }}
                            />
                        </div>
                        
                        <div>
                            <label>Description Color</label>
                            <input
                                type="color"
                                value={descriptionColor}
                                onChange={(e) => setAttributes({ descriptionColor: e.target.value })}
                                style={{ width: '100%', marginBottom: '10px' }}
                            />
                        </div>
                        
                        <RangeControl
                            label="Title Font Size"
                            value={titleFontSize}
                            onChange={(value) => setAttributes({ titleFontSize: value })}
                            min={16}
                            max={48}
                        />
                        
                        <RangeControl
                            label="Description Font Size"
                            value={descriptionFontSize}
                            onChange={(value) => setAttributes({ descriptionFontSize: value })}
                            min={12}
                            max={24}
                        />
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps} style={styles.container()}>
                    {/* Media Column */}
                    <div style={styles.mediaColumn()}>
                        <div style={styles.mediaWrapper()}>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={onSelectImage}
                                    allowedTypes={['image']}
                                    value={imageId}
                                    render={({ open }) => (
                                        <>
                                            {imageUrl ? (
                                                <>
                                                    <img 
                                                        src={imageUrl} 
                                                        alt={imageAlt} 
                                                        style={styles.mediaImage()} 
                                                        onClick={open}
                                                    />
                                                    <Button
                                                        onClick={removeImage}
                                                        className="button is-small"
                                                        style={{
                                                            position: 'absolute',
                                                            top: '10px',
                                                            right: '10px',
                                                            backgroundColor: '#fff',
                                                            border: 'none',
                                                            borderRadius: '50%',
                                                            padding: '5px',
                                                            cursor: 'pointer',
                                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                                        }}
                                                    >
                                                        ✕
                                                    </Button>

                                                    {hasVideo && videoUrl && playButtonHtml}
                                                </>
                                            ) : (
                                                <div
                                                    style={styles.placeholderMedia()}
                                                    onClick={open}
                                                >
                                                    აირჩიეთ სურათი
                                                </div>
                                            )}
                                        </>
                                    )}
                                />
                            </MediaUploadCheck>
                        </div>
                    </div>

                    {/* Content Column */}
                    <div style={styles.contentColumn()}>
                        <RichText
                            tagName="h2"
                            value={title}
                            onChange={(content) => setAttributes({ title: content })}
                            placeholder="Enter a title"
                            style={{
                                ...styles.title(),
                                color: titleColor,
                                fontSize: `${titleFontSize}px`
                            }}
                        />
                        
                        {descriptions.map((description, index) => (
                            <RichText
                                key={index}
                                tagName="p"
                                value={description}
                                onChange={(content) => updateDescription(content, index)}
                                placeholder="Enter description"
                                style={{
                                    ...styles.descriptionText(),
                                    color: descriptionColor,
                                    fontSize: `${descriptionFontSize}px`
                                }}
                            />
                        ))}
                    </div>
                </div>
            </>
        );
    },
    save: ({ attributes }) => {
        const {
            title, descriptions, hasVideo,
            imageUrl, imageAlt,
            videoUrl, videoEmbedCode, playButtonImage,
            titleColor, descriptionColor,
            titleFontSize, descriptionFontSize
        } = attributes;

        // YouTube video ID extraction
        const getYouTubeVideoId = (url) => {
            if (!url) return '';
            
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);
            
            return (match && match[2].length === 11) ? match[2] : '';
        };

        const youtubeVideoId = getYouTubeVideoId(videoUrl);
        const thumbnailUrl = youtubeVideoId ? `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg` : '';

        return (
            <div className="wp-block-bevision-media-description-block">
                {/* Media Column */}
                <div className="media-column">
                    <div className="media-wrapper">
                        {imageUrl && (
                            <>
                                <img 
                                    src={imageUrl} 
                                    alt={imageAlt} 
                                    className="media-image" 
                                />
                                
                                {hasVideo && videoUrl && (
                                    <a 
                                        href={videoUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="video-overlay"
                                    >
                                        {playButtonImage && playButtonImage.url ? (
                                            <img 
                                                src={playButtonImage.url}
                                                alt={playButtonImage.alt || 'Play'}
                                                className="custom-play-button"
                                            />
                                        ) : (
                                            <div className="play-button">
                                                <div className="play-icon"></div>
                                            </div>
                                        )}
                                    </a>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Content Column */}
                <div className="content-column">
                    <h2 
                        className="title" 
                        style={{
                            color: titleColor,
                            fontSize: `${titleFontSize}px`
                        }}
                    >
                        {title}
                    </h2>
                    
                    {descriptions.map((description, index) => (
                        <p 
                            key={index}
                            className="description-text"
                            style={{
                                color: descriptionColor,
                                fontSize: `${descriptionFontSize}px`
                            }}
                        >
                            {description}
                        </p>
                    ))}
                </div>
            </div>
        );
    }
});
