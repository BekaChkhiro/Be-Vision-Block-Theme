import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { styles } from './styles';
import { useState, useEffect } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
  const { title, content, imageUrl, imageId, imageAlt } = attributes;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const blockProps = useBlockProps({
    style: styles.container(isMobile),
  });

  return (
    <div {...blockProps}>
      <div style={styles.textColumn(isMobile)}>
        <RichText
          tagName="h2"
          style={styles.title(isMobile)}
          value={title}
          onChange={(title) => setAttributes({ title })}
          placeholder={__('Add title...', 'bevision')}
        />
        <RichText
          tagName="div"
          style={styles.content(isMobile)}
          value={content}
          onChange={(content) => setAttributes({ content })}
          placeholder={__('Add content...', 'bevision')}
        />
      </div>
      
      <div style={styles.imageColumn(isMobile)}>
        <div style={styles.imageContainer(isMobile)}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt}
              style={styles.image(isMobile)}
            />
          ) : (
            <MediaUploadCheck>
              <MediaUpload
                onSelect={(media) => {
                  setAttributes({
                    imageId: media.id,
                    imageUrl: media.url,
                    imageAlt: media.alt || '',
                  });
                }}
                allowedTypes={['image']}
                value={imageId}
                render={({ open }) => (
                  <div 
                    style={styles.imagePlaceholder(isMobile)}
                    onClick={open}
                  >
                    <Button 
                      isPrimary
                      onClick={open}
                    >
                      {__('Select Image', 'bevision')}
                    </Button>
                  </div>
                )}
              />
            </MediaUploadCheck>
          )}
          
          {imageUrl && (
            <MediaUploadCheck>
              <MediaUpload
                onSelect={(media) => {
                  setAttributes({
                    imageId: media.id,
                    imageUrl: media.url,
                    imageAlt: media.alt || '',
                  });
                }}
                allowedTypes={['image']}
                value={imageId}
                render={({ open }) => (
                  <Button
                    onClick={open}
                    isPrimary
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      zIndex: 10,
                      padding: '6px 12px',
                      fontSize: '14px',
                    }}
                  >
                    {__('Replace Image', 'bevision')}
                  </Button>
                )}
              />
            </MediaUploadCheck>
          )}
        </div>
      </div>
    </div>
  );
}
