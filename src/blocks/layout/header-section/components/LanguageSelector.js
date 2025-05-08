import React from 'react';
import { RichText } from '@wordpress/block-editor';

const LanguageSelector = ({ languageText, languageFlag, languageFlagSize, setAttributes }) => {
    return (
        <div className="language-selector" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        }}>
            <img 
                src={languageFlag} 
                alt="Language Flag" 
                style={{
                    width: `${languageFlagSize}px`,
                    height: `${languageFlagSize}px`
                }} 
            />
            <RichText
                tagName="span"
                value={languageText}
                onChange={(text) => setAttributes({ languageText: text })}
            />
        </div>
    );
};

export default LanguageSelector;
