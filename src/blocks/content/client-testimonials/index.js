import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { RichText, MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

const styles = {
    clientTestimonials: {
        padding: '80px 0'
    },
    subtitle: {
        color: '#6653C6',
        textAlign: 'center',
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: 750,
        lineHeight: 'normal',
        margin: '0px 0px 5px'
    },
    title: {
        color: '#221A4C',
        textAlign: 'center',
        fontSize: '30px',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 'normal',
        margin: '0px 0px 60px'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '30px',
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 20px'
    },
    carousel: {
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 20px',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        '&::-webkit-scrollbar': {
            display: 'none'
        }
    },
    carouselInner: {
        display: 'flex',
        gap: '30px',
        padding: '20px 0'
    },
    testimonialCard: {
        background: '#fff',
        boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.05)',
        borderRadius: '20px',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        position: 'relative',
        flex: '0 0 calc(33.333% - 20px)',
        minWidth: '300px'
    },
    companyLogo: {
        height: '40px',
        objectFit: 'contain',
        marginBottom: '20px'
    },
    content: {
        color: '#221A4C',
        fontSize: '16px',
        lineHeight: 1.6,
        margin: 0,
        fontWeight: 400
    },
    author: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        marginTop: 'auto'
    },
    authorImage: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        objectFit: 'cover'
    },
    authorInfo: {
        margin: 0
    },
    authorName: {
        margin: 0,
        fontSize: '18px',
        fontWeight: 600,
        color: '#221A4C'
    },
    authorPosition: {
        margin: 0,
        fontSize: '14px',
        color: '#6653C6',
        fontWeight: 500
    },
    controls: {
        display: 'flex',
        gap: '10px',
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 1
    },
    actionButton: {
        backgroundColor: '#fff',
        color: '#6653C6',
        padding: '8px',
        border: '1px solid #6653C6',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    },
    addButton: {
        backgroundColor: '#6653C6',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    removeButton: {
        backgroundColor: '#fff',
        color: '#6653C6',
        padding: '10px 20px',
        border: '1px solid #6653C6',
        borderRadius: '5px',
        cursor: 'pointer',
        position: 'absolute',
        top: '10px',
        right: '10px'
    }
};

registerBlockType('bevision/client-testimonials', {
    title: __('Client Testimonials', 'bevision'),
    icon: 'groups',
    category: 'bevision',
    attributes: {
        subtitle: {
            type: 'string',
            default: 'CLIENTS'
        },
        title: {
            type: 'string',
            default: 'They lead with data'
        },
        testimonials: {
            type: 'array',
            default: [
                {
                    companyLogo: '',
                    content: '',
                    authorName: '',
                    authorPosition: '',
                    authorImage: ''
                },
                {
                    companyLogo: '',
                    content: '',
                    authorName: '',
                    authorPosition: '',
                    authorImage: ''
                },
                {
                    companyLogo: '',
                    content: '',
                    authorName: '',
                    authorPosition: '',
                    authorImage: ''
                }
            ]
        }
    },

    edit: ({ attributes, setAttributes }) => {
        const { title, subtitle, testimonials } = attributes;
        const [sliderKey, setSliderKey] = useState(1);

        useEffect(() => {
            // Force re-render of slider when testimonials change
            setSliderKey(prev => prev + 1);
        }, [testimonials.length]);

        const onChangeTitle = (newTitle) => {
            setAttributes({ title: newTitle });
        };

        const onChangeSubtitle = (newSubtitle) => {
            setAttributes({ subtitle: newSubtitle });
        };

        const addTestimonial = () => {
            const newTestimonials = [...testimonials, {
                companyLogo: '',
                content: '',
                authorName: '',
                authorPosition: '',
                authorImage: ''
            }];
            setAttributes({ testimonials: newTestimonials });
        };

        const removeTestimonial = (index) => {
            const newTestimonials = testimonials.filter((_, i) => i !== index);
            setAttributes({ testimonials: newTestimonials });
        };

        const updateTestimonial = (index, key, value) => {
            const newTestimonials = [...testimonials];
            newTestimonials[index] = {
                ...newTestimonials[index],
                [key]: value
            };
            setAttributes({ testimonials: newTestimonials });
        };

        const duplicateTestimonial = (index) => {
            const testimonialToDuplicate = testimonials[index];
            const duplicatedTestimonial = { ...testimonialToDuplicate };
            const newTestimonials = [...testimonials];
            newTestimonials.splice(index + 1, 0, duplicatedTestimonial);
            setAttributes({ testimonials: newTestimonials });
        };

        const renderTestimonialCard = (testimonial, index) => (
            <div key={index} style={styles.testimonialCard}>
                <div style={styles.controls}>
                    <button 
                        onClick={() => removeTestimonial(index)}
                        style={styles.actionButton}
                        title="Remove"
                    >
                        ✕
                    </button>
                    <button 
                        onClick={() => duplicateTestimonial(index)}
                        style={styles.actionButton}
                        title="Duplicate"
                    >
                        ⎘
                    </button>
                </div>
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={(media) => updateTestimonial(index, 'companyLogo', media.url)}
                        type="image"
                        render={({ open }) => (
                            <Button onClick={open}>
                                {testimonial.companyLogo ? (
                                    <img src={testimonial.companyLogo} alt="" style={styles.companyLogo} />
                                ) : (
                                    'Upload Company Logo'
                                )}
                            </Button>
                        )}
                    />
                </MediaUploadCheck>
                <RichText
                    tagName="p"
                    style={styles.content}
                    value={testimonial.content}
                    onChange={(content) => updateTestimonial(index, 'content', content)}
                    placeholder={__('Enter testimonial content', 'bevision')}
                />
                <div style={styles.author}>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(media) => updateTestimonial(index, 'authorImage', media.url)}
                            type="image"
                            render={({ open }) => (
                                <Button onClick={open}>
                                    {testimonial.authorImage ? (
                                        <img src={testimonial.authorImage} alt="" style={styles.authorImage} />
                                    ) : (
                                        'Upload Author Image'
                                    )}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                    <div style={styles.authorInfo}>
                        <RichText
                            tagName="h4"
                            style={styles.authorName}
                            value={testimonial.authorName}
                            onChange={(name) => updateTestimonial(index, 'authorName', name)}
                            placeholder={__('Author Name', 'bevision')}
                        />
                        <RichText
                            tagName="p"
                            style={styles.authorPosition}
                            value={testimonial.authorPosition}
                            onChange={(position) => updateTestimonial(index, 'authorPosition', position)}
                            placeholder={__('Position', 'bevision')}
                        />
                    </div>
                </div>
            </div>
        );

        return (
            <div style={styles.clientTestimonials}>
                <RichText
                    tagName="p"
                    style={styles.subtitle}
                    value={subtitle}
                    onChange={onChangeSubtitle}
                    placeholder={__('Enter subtitle', 'bevision')}
                />
                <RichText
                    tagName="h2"
                    style={styles.title}
                    value={title}
                    onChange={onChangeTitle}
                    placeholder={__('Enter title', 'bevision')}
                />
                <div style={styles.carousel}>
                    <div style={styles.carouselInner}>
                        {testimonials.map((testimonial, index) => renderTestimonialCard(testimonial, index))}
                    </div>
                </div>
                <div style={styles.controls}>
                    <button 
                        onClick={addTestimonial}
                        style={styles.addButton}
                    >
                        Add Testimonial
                    </button>
                </div>
            </div>
        );
    },

    save: ({ attributes }) => {
        const { title, subtitle, testimonials } = attributes;

        return (
            <div className="wp-block-bevision-client-testimonials" style={styles.clientTestimonials}>
                <p style={styles.subtitle}>{subtitle}</p>
                <h2 style={styles.title}>{title}</h2>
                <div style={styles.carousel}>
                    <div className="carousel-inner" style={styles.carouselInner}>
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="testimonial-card" style={styles.testimonialCard}>
                                {testimonial.companyLogo && (
                                    <img className="company-logo" src={testimonial.companyLogo} alt="" style={styles.companyLogo} />
                                )}
                                <p className="content" style={styles.content}>{testimonial.content}</p>
                                <div className="author" style={styles.author}>
                                    {testimonial.authorImage && (
                                        <img className="author-image" src={testimonial.authorImage} alt="" style={styles.authorImage} />
                                    )}
                                    <div className="author-info" style={styles.authorInfo}>
                                        <h4 className="author-name" style={styles.authorName}>{testimonial.authorName}</h4>
                                        <p className="author-position" style={styles.authorPosition}>{testimonial.authorPosition}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <ul className="carousel-dots">
                        {testimonials.map((_, index) => (
                            <li key={index} className={`carousel-dot ${index === 0 ? 'active' : ''}`} data-index={index}></li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
});
