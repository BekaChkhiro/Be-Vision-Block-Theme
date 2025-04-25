import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { title, content, imageUrl, imageAlt } = attributes;
  
  // Using the same class name as in the CSS
  return (
    <div className="text-with-image-block">
      <div className="text-column">
        {title && (
          <h2 className="title" dangerouslySetInnerHTML={{ __html: title }} />
        )}
        {content && (
          <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
        )}
      </div>
      
      <div className="image-column">
        <div className="image-container">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={imageAlt || ''}
              className="image"
            />
          )}
        </div>
      </div>
    </div>
  );
}
