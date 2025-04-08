import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, ColorPalette, Button, TabPanel, TextControl, RangeControl } from '@wordpress/components';

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
        backgroundImage: {
            type: 'object',
            default: null
        }
    },
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        const { 
            title, subtitle, description, buttonText, backgroundImage
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
                            }
                        ]}
                    >
                        {(tab) => (
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
                                                className="w-full mb-2.5"
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
                        )}
                    </TabPanel>
                </InspectorControls>
                <div {...blockProps} className="relative overflow-hidden max-w-[1440px] mx-auto">
                    <div className="mx-auto p-[60px] flex justify-between items-center gap-[43px] rounded-[20px] bg-[rgba(102,83,198,0.05)] relative">
                        {backgroundImage && (
                            <div className="absolute right-0 top-0 bottom-0 w-[40%] bg-cover bg-center opacity-70"
                                style={{
                                    backgroundImage: `url(${backgroundImage.url})`
                                }}
                            />
                        )}
                        <div className="flex-1 max-w-[40%]">
                            <RichText
                                tagName="span"
                                className="subtitle block mb-2.5 text-[24px] font-[750] text-[#2FCA02]"
                                value={subtitle}
                                onChange={(content) => setAttributes({ subtitle: content })}
                                placeholder="Lead with Data"
                            />
                            <RichText
                                tagName="h1"
                                className="text-[50px] font-[750] leading-[50px] mb-10 mt-0 text-[#221A4C]"
                                value={title}
                                onChange={(content) => setAttributes({ title: content })}
                                placeholder="Start analyzing your data today"
                            />
                            <RichText
                                tagName="p"
                                className="text-[18px] font-normal mb-10 text-[#8399AF]"
                                value={description}
                                onChange={(content) => setAttributes({ description: content })}
                                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                            />
                            <RichText
                                tagName="button"
                                className="flex h-[50px] px-10 py-2.5 justify-center items-center gap-2.5 rounded-lg bg-[#4ADE80] text-[#1A1A1A] text-[18px] font-semibold cursor-pointer shadow-[0_4px_6px_rgba(74,222,128,0.2)] hover:bg-[#00cc39] transition-colors duration-300"
                                value={buttonText}
                                onChange={(content) => setAttributes({ buttonText: content })}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    },
    save: ({ attributes }) => {
        const { 
            title, subtitle, description, buttonText, backgroundImage
        } = attributes;
        
        return (
            <div className="relative overflow-hidden max-w-[1440px] mx-auto">
                <div className="mx-auto p-[60px] flex justify-between items-center gap-[43px] rounded-[20px] bg-[rgba(102,83,198,0.05)] relative">
                    {backgroundImage && (
                        <div 
                            className="absolute right-0 top-0 bottom-0 w-[40%] bg-cover bg-center opacity-70"
                            style={{
                                backgroundImage: `url(${backgroundImage.url})`
                            }}
                        />
                    )}
                    <div className="flex-1 max-w-[40%]">
                        <span className="subtitle block mb-2.5 text-[24px] font-[750] text-[#2FCA02]">
                            {subtitle}
                        </span>
                        <h1 className="text-[50px] font-[750] leading-[50px] mb-10 mt-0 text-[#221A4C]">
                            {title}
                        </h1>
                        <p className="text-[18px] font-normal mb-10 text-[#8399AF]">
                            {description}
                        </p>
                        <button className="flex h-[50px] px-10 py-2.5 justify-center items-center gap-2.5 rounded-lg bg-[#4ADE80] text-[#1A1A1A] text-[18px] font-semibold cursor-pointer shadow-[0_4px_6px_rgba(74,222,128,0.2)] hover:bg-[#00cc39] transition-colors duration-300">
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
});
