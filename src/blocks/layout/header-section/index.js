import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls, MediaUpload } from '@wordpress/block-editor';
import { PanelBody, ColorPalette, Button, RangeControl, TextControl, TabPanel } from '@wordpress/components';

registerBlockType('bevision/header-section', {
    title: 'Header Section',
    icon: 'menu',
    category: 'design',
    attributes: {
        backgroundColor: {
            type: 'string',
            default: '#ffffff'
        },
        buttonColor: {
            type: 'string',
            default: '#00E640'
        },
        buttonTextColor: {
            type: 'string',
            default: '#ffffff'
        },
        buttonPaddingV: {
            type: 'number',
            default: 12
        },
        buttonPaddingH: {
            type: 'number',
            default: 24
        },
        buttonBorderRadius: {
            type: 'number',
            default: 4
        },
        buttonFontSize: {
            type: 'number',
            default: 16
        },
        buttonFontWeight: {
            type: 'string',
            default: '500'
        },
        logo: {
            type: 'string',
            default: '/wp-content/themes/BeVision/assets/images/logo.svg'
        },
        logoHeight: {
            type: 'number',
            default: 40
        },
        logoWidth: {
            type: 'string',
            default: 'auto'
        },
        menuItems: {
            type: 'array',
            default: [
                { text: 'Products', url: '#' },
                { text: 'Clients', url: '#' },
                { text: 'About us', url: '#' }
            ]
        },
        languageText: {
            type: 'string',
            default: 'GE'
        },
        languageFlag: {
            type: 'string',
            default: '/wp-content/themes/BeVision/assets/images/ge-flag.svg'
        },
        languageFlagSize: {
            type: 'number',
            default: 24
        },
        languageUrl: {
            type: 'string',
            default: '#'
        },
        buttonText: {
            type: 'string',
            default: 'Request a demo'
        },
        buttonUrl: {
            type: 'string',
            default: '#'
        },
        headerHeight: {
            type: 'number',
            default: 100
        },
        headingColor: {
            type: 'string',
            default: '#333'
        },
        descriptionColor: {
            type: 'string',
            default: '#666'
        }
    },
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps({
            className: 'w-full bg-white'
        });

        const updateMenuItem = (index, field, value) => {
            const newMenuItems = [...attributes.menuItems];
            newMenuItems[index] = {
                ...newMenuItems[index],
                [field]: value
            };
            setAttributes({ menuItems: newMenuItems });
        };

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
                                    <TabPanel
                                        className="bevision-content-tabs"
                                        activeClass="is-active"
                                        tabs={[
                                            {
                                                name: 'header',
                                                title: 'ჰედერი',
                                                className: 'tab-header'
                                            },
                                            {
                                                name: 'navigation',
                                                title: 'ნავიგაცია',
                                                className: 'tab-navigation'
                                            },
                                            {
                                                name: 'actions',
                                                title: 'მოქმედებები',
                                                className: 'tab-actions'
                                            }
                                        ]}
                                    >
                                        {(contentTab) => {
                                            if (contentTab.name === 'header') {
                                                return (
                                                    <PanelBody title="ლოგოს პარამეტრები" initialOpen={true}>
                                                        <div className="components-base-control">
                                                            <MediaUpload
                                                                onSelect={(media) => setAttributes({ logo: media.url })}
                                                                allowedTypes={['image']}
                                                                value={attributes.logo}
                                                                render={({ open }) => (
                                                                    <div className="mb-4">
                                                                        {attributes.logo ? (
                                                                            <div>
                                                                                <img
                                                                                    src={attributes.logo}
                                                                                    alt="Selected logo"
                                                                                    className="max-w-full mb-2.5"
                                                                                />
                                                                                <Button
                                                                                    onClick={open}
                                                                                    variant="secondary"
                                                                                    className="w-full"
                                                                                >
                                                                                    ლოგოს შეცვლა
                                                                                </Button>
                                                                            </div>
                                                                        ) : (
                                                                            <Button
                                                                                onClick={open}
                                                                                variant="secondary"
                                                                                className="w-full"
                                                                            >
                                                                                აირჩიეთ ლოგო
                                                                            </Button>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            />
                                                        </div>
                                                    </PanelBody>
                                                );
                                            }
                                            if (contentTab.name === 'navigation') {
                                                return (
                                                    <>
                                                        <PanelBody title="მენიუს ბმულები" initialOpen={true}>
                                                            {attributes.menuItems.map((item, index) => (
                                                                <div key={index} className="menu-item-control mb-4 p-3 bg-gray-100 rounded">
                                                                    <TextControl
                                                                        label={`ბმული ${index + 1} - ტექსტი`}
                                                                        value={item.text}
                                                                        onChange={(value) => updateMenuItem(index, 'text', value)}
                                                                    />
                                                                    <TextControl
                                                                        label={`ბმული ${index + 1} - URL`}
                                                                        value={item.url}
                                                                        onChange={(value) => updateMenuItem(index, 'url', value)}
                                                                    />
                                                                </div>
                                                            ))}
                                                        </PanelBody>

                                                        <PanelBody title="ენის პარამეტრები" initialOpen={true}>
                                                            <div className="p-3 bg-gray-100 rounded">
                                                                <TextControl
                                                                    label="ენის ტექსტი"
                                                                    value={attributes.languageText}
                                                                    onChange={(value) => setAttributes({ languageText: value })}
                                                                />
                                                                <TextControl
                                                                    label="ენის URL"
                                                                    value={attributes.languageUrl}
                                                                    onChange={(value) => setAttributes({ languageUrl: value })}
                                                                />
                                                            </div>
                                                        </PanelBody>
                                                    </>
                                                );
                                            }
                                            if (contentTab.name === 'actions') {
                                                return (
                                                    <PanelBody title="ღილაკის პარამეტრები" initialOpen={true}>
                                                        <div className="button-control p-3 bg-gray-100 rounded">
                                                            <TextControl
                                                                label="ღილაკის ტექსტი"
                                                                value={attributes.buttonText}
                                                                onChange={(value) => setAttributes({ buttonText: value })}
                                                            />
                                                            <TextControl
                                                                label="ღილაკის URL"
                                                                value={attributes.buttonUrl}
                                                                onChange={(value) => setAttributes({ buttonUrl: value })}
                                                            />
                                                        </div>
                                                    </PanelBody>
                                                );
                                            }
                                            return null;
                                        }}
                                    </TabPanel>
                                );
                            }
                            return null;
                        }}
                    </TabPanel>
                </InspectorControls>
                
                <header {...blockProps}>
                    <div className="max-w-[1440px] mx-auto py-6 px-4">
                        <div className="flex justify-between items-center">
                            <div className="flex-shrink-0">
                                <img 
                                    src={attributes.logo} 
                                    alt="Logo" 
                                    className="h-10 w-auto object-contain"
                                />
                            </div>

                            <nav className="flex gap-8">
                                {attributes.menuItems.map((item, index) => (
                                    <RichText
                                        key={index}
                                        tagName="a"
                                        value={item.text}
                                        onChange={(text) => updateMenuItem(index, 'text', text)}
                                        className="text-gray-800 hover:text-primary transition-colors duration-300"
                                    />
                                ))}
                            </nav>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <img 
                                        src={attributes.languageFlag} 
                                        alt="Language Flag" 
                                        className="w-6 h-6 object-contain"
                                    />
                                    <RichText
                                        tagName="span"
                                        value={attributes.languageText}
                                        onChange={(text) => setAttributes({ languageText: text })}
                                        className="text-gray-800"
                                    />
                                </div>

                                <RichText
                                    tagName="a"
                                    value={attributes.buttonText}
                                    onChange={(text) => setAttributes({ buttonText: text })}
                                    className="inline-flex items-center px-6 py-3 bg-[#00E640] text-white rounded hover:bg-[#00cc39] transition-colors duration-300 text-base font-semibold"
                                />
                            </div>
                        </div>
                    </div>
                </header>
            </>
        );
    },

    save: ({ attributes }) => {
        const blockProps = useBlockProps.save({
            className: 'w-full bg-white'
        });

        return (
            <header {...blockProps}>
                <div className="max-w-[1440px] mx-auto py-6 px-4">
                    <div className="flex justify-between items-center">
                        <div className="flex-shrink-0">
                            <a href="/" className="block">
                                <img 
                                    src={attributes.logo} 
                                    alt="Logo" 
                                    className="h-10 w-auto object-contain"
                                />
                            </a>
                        </div>

                        <nav className="flex gap-8">
                            {attributes.menuItems.map((item, index) => (
                                <a 
                                    key={index} 
                                    href={item.url} 
                                    className="text-gray-800 hover:text-primary transition-colors duration-300"
                                >
                                    {item.text}
                                </a>
                            ))}
                        </nav>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <img 
                                    src={attributes.languageFlag} 
                                    alt="Language Flag" 
                                    className="w-6 h-6 object-contain"
                                />
                                <span className="text-gray-800">{attributes.languageText}</span>
                            </div>

                            <a 
                                href={attributes.buttonUrl}
                                className="inline-flex items-center px-6 py-3 bg-[#00E640] text-white rounded hover:bg-[#00cc39] transition-colors duration-300 text-base font-semibold"
                            >
                                {attributes.buttonText}
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
});
