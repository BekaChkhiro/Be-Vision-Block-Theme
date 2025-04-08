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
            style: {
                backgroundColor: attributes.backgroundColor,
            }
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
                                                                    <div style={{ marginBottom: '16px' }}>
                                                                        {attributes.logo ? (
                                                                            <div>
                                                                                <img
                                                                                    src={attributes.logo}
                                                                                    alt="Selected logo"
                                                                                    style={{ maxWidth: '100%', marginBottom: '10px' }}
                                                                                />
                                                                                <Button
                                                                                    onClick={open}
                                                                                    variant="secondary"
                                                                                    isSecondary
                                                                                    style={{ width: '100%' }}
                                                                                >
                                                                                    ლოგოს შეცვლა
                                                                                </Button>
                                                                            </div>
                                                                        ) : (
                                                                            <Button
                                                                                onClick={open}
                                                                                variant="secondary"
                                                                                isSecondary
                                                                                style={{ width: '100%' }}
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
                                                                <div key={index} className="menu-item-control" style={{ 
                                                                    marginBottom: '16px',
                                                                    padding: '12px',
                                                                    backgroundColor: '#f0f0f0',
                                                                    borderRadius: '4px'
                                                                }}>
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
                                                            <div className="language-control" style={{ 
                                                                padding: '12px',
                                                                backgroundColor: '#f0f0f0',
                                                                borderRadius: '4px'
                                                            }}>
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
                                                        <div className="button-control" style={{ 
                                                            padding: '12px',
                                                            backgroundColor: '#f0f0f0',
                                                            borderRadius: '4px'
                                                        }}>
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
                                        }}
                                    </TabPanel>
                                );
                            } else {
                                return (
                                    <TabPanel
                                        className="bevision-style-tabs"
                                        activeClass="is-active"
                                        tabs={[
                                            {
                                                name: 'layout',
                                                title: 'განლაგება',
                                                className: 'tab-layout'
                                            },
                                            {
                                                name: 'colors',
                                                title: 'ფერები',
                                                className: 'tab-colors'
                                            },
                                            {
                                                name: 'typography',
                                                title: 'ტიპოგრაფია',
                                                className: 'tab-typography'
                                            }
                                        ]}
                                    >
                                        {(styleTab) => {
                                            if (styleTab.name === 'layout') {
                                                return (
                                                    <>
                                                        <PanelBody title="ჰედერის განლაგება" initialOpen={true}>
                                                            <div className="spacing-control" style={{ 
                                                                padding: '12px',
                                                                backgroundColor: '#f0f0f0',
                                                                borderRadius: '4px'
                                                            }}>
                                                                <RangeControl
                                                                    label="ჰედერის სიმაღლე"
                                                                    value={attributes.headerHeight}
                                                                    onChange={(value) => setAttributes({ headerHeight: value })}
                                                                    min={50}
                                                                    max={200}
                                                                />
                                                            </div>
                                                        </PanelBody>
                                                        
                                                        <PanelBody title="ღილაკის განლაგება" initialOpen={true}>
                                                            <div className="button-spacing-control" style={{ 
                                                                padding: '12px',
                                                                backgroundColor: '#f0f0f0',
                                                                borderRadius: '4px'
                                                            }}>
                                                                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                                                                    <RangeControl
                                                                        label="ვერტიკალური padding"
                                                                        value={attributes.buttonPaddingV}
                                                                        onChange={(value) => setAttributes({ buttonPaddingV: value })}
                                                                        min={5}
                                                                        max={30}
                                                                    />
                                                                    <RangeControl
                                                                        label="ჰორიზონტალური padding"
                                                                        value={attributes.buttonPaddingH}
                                                                        onChange={(value) => setAttributes({ buttonPaddingH: value })}
                                                                        min={10}
                                                                        max={50}
                                                                    />
                                                                </div>
                                                                <RangeControl
                                                                    label="ღილაკის მომრგვალება"
                                                                    value={attributes.buttonBorderRadius}
                                                                    onChange={(value) => setAttributes({ buttonBorderRadius: value })}
                                                                    min={0}
                                                                    max={50}
                                                                />
                                                            </div>
                                                        </PanelBody>
                                                    </>
                                                );
                                            }
                                            if (styleTab.name === 'colors') {
                                                return (
                                                    <>
                                                        <PanelBody title="ძირითადი ფერები" initialOpen={true}>
                                                            <div className="color-control" style={{ 
                                                                padding: '12px',
                                                                backgroundColor: '#f0f0f0',
                                                                borderRadius: '4px'
                                                            }}>
                                                                <p style={{ marginBottom: '8px', fontWeight: '500' }}>ფონის ფერი</p>
                                                                <ColorPalette
                                                                    value={attributes.backgroundColor}
                                                                    onChange={(color) => setAttributes({ backgroundColor: color })}
                                                                />
                                                            </div>
                                                        </PanelBody>

                                                        <PanelBody title="ღილაკის ფერები" initialOpen={true}>
                                                            <div className="button-color-control" style={{ 
                                                                padding: '12px',
                                                                backgroundColor: '#f0f0f0',
                                                                borderRadius: '4px'
                                                            }}>
                                                                <p style={{ marginBottom: '8px', fontWeight: '500' }}>ღილაკის ფერი</p>
                                                                <ColorPalette
                                                                    value={attributes.buttonColor}
                                                                    onChange={(color) => setAttributes({ buttonColor: color })}
                                                                />
                                                                
                                                                <p style={{ marginBottom: '8px', fontWeight: '500' }}>ტექსტის ფერი</p>
                                                                <ColorPalette
                                                                    value={attributes.buttonTextColor}
                                                                    onChange={(color) => setAttributes({ buttonTextColor: color })}
                                                                />
                                                            </div>
                                                        </PanelBody>

                                                        <PanelBody title="ტექსტის ფერები" initialOpen={true}>
                                                            <div className="text-color-control" style={{ 
                                                                padding: '12px',
                                                                backgroundColor: '#f0f0f0',
                                                                borderRadius: '4px'
                                                            }}>
                                                                <p style={{ marginBottom: '8px', fontWeight: '500' }}>სათაურის ფერი</p>
                                                                <ColorPalette
                                                                    value={attributes.headingColor}
                                                                    onChange={(color) => setAttributes({ headingColor: color })}
                                                                />
                                                                
                                                                <p style={{ marginBottom: '8px', fontWeight: '500' }}>აღწერის ფერი</p>
                                                                <ColorPalette
                                                                    value={attributes.descriptionColor}
                                                                    onChange={(color) => setAttributes({ descriptionColor: color })}
                                                                />
                                                            </div>
                                                        </PanelBody>
                                                    </>
                                                );
                                            }
                                            if (styleTab.name === 'typography') {
                                                return (
                                                    <PanelBody title="ღილაკის ტიპოგრაფია" initialOpen={true}>
                                                        <div className="button-typography-control" style={{ 
                                                            padding: '12px',
                                                            backgroundColor: '#f0f0f0',
                                                            borderRadius: '4px'
                                                        }}>
                                                            <RangeControl
                                                                label="ტექსტის ზომა"
                                                                value={attributes.buttonFontSize}
                                                                onChange={(value) => setAttributes({ buttonFontSize: value })}
                                                                min={12}
                                                                max={24}
                                                            />

                                                            <RangeControl
                                                                label="ტექსტის სისქე"
                                                                value={attributes.buttonFontWeight}
                                                                onChange={(value) => setAttributes({ buttonFontWeight: value })}
                                                                min={300}
                                                                max={900}
                                                                step={100}
                                                            />
                                                        </div>
                                                    </PanelBody>
                                                );
                                            }
                                        }}
                                    </TabPanel>
                                );
                            }
                        }}
                    </TabPanel>
                </InspectorControls>
                <header {...blockProps}>
                    <div className="header-container" style={{
                        maxWidth: '1440px',
                        margin: '0 auto',
                        padding: '25px 0px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        {/* Logo Section */}
                        <div className="logo-section">
                            <img 
                                src={attributes.logo} 
                                alt="Logo" 
                                style={{
                                    height: `${attributes.logoHeight}px`,
                                    width: attributes.logoWidth === 'auto' ? 'auto' : `${attributes.logoWidth}px`,
                                    objectFit: 'contain'
                                }} 
                            />
                        </div>

                        {/* Navigation Menu */}
                        <nav className="main-navigation" style={{
                            display: 'flex',
                            gap: '2rem'
                        }}>
                            {attributes.menuItems.map((item, index) => (
                                <RichText
                                    key={index}
                                    tagName="a"
                                    value={item.text}
                                    onChange={(text) => updateMenuItem(index, 'text', text)}
                                    style={{ color: '#333', textDecoration: 'none' }}
                                />
                            ))}
                        </nav>

                        {/* Right Section */}
                        <div className="right-section" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            {/* Language Selector */}
                            <div className="language-selector" style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <img 
                                    src={attributes.languageFlag} 
                                    alt="Language Flag" 
                                    style={{
                                        width: `${attributes.languageFlagSize}px`,
                                        height: `${attributes.languageFlagSize}px`
                                    }} 
                                />
                                <RichText
                                    tagName="span"
                                    value={attributes.languageText}
                                    onChange={(text) => setAttributes({ languageText: text })}
                                />
                            </div>

                            {/* Demo Button */}
                            <RichText
                                tagName="a"
                                value={attributes.buttonText}
                                onChange={(text) => setAttributes({ buttonText: text })}
                                style={{
                                    backgroundColor: attributes.buttonColor,
                                    color: attributes.buttonTextColor,
                                    padding: `${attributes.buttonPaddingV}px ${attributes.buttonPaddingH}px`,
                                    borderRadius: `${attributes.buttonBorderRadius}px`,
                                    textDecoration: 'none',
                                    fontWeight: attributes.buttonFontWeight,
                                    fontSize: `${attributes.buttonFontSize}px`,
                                    display: 'inline-block',
                                    transition: 'all 0.3s ease'
                                }}
                            />
                        </div>
                    </div>
                </header>
            </>
        );
    },
    save: ({ attributes }) => {
        const blockProps = useBlockProps.save({
            style: {
                backgroundColor: attributes.backgroundColor,
            }
        });

        return (
            <header {...blockProps}>
                <div className="header-container" style={{
                    maxWidth: '1440px',
                    margin: '0 auto',
                    padding: '25px 0px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div className="logo-section">
                        <a href="/">
                            <img 
                                src={attributes.logo} 
                                alt="Logo" 
                                style={{
                                    height: `${attributes.logoHeight}px`,
                                    width: attributes.logoWidth === 'auto' ? 'auto' : `${attributes.logoWidth}px`,
                                    objectFit: 'contain'
                                }} 
                            />
                        </a>
                    </div>

                    <nav className="main-navigation" style={{
                        display: 'flex',
                        gap: '2rem'
                    }}>
                        {attributes.menuItems.map((item, index) => (
                            <a 
                                key={index} 
                                href={item.url} 
                                style={{ color: '#333', textDecoration: 'none' }}
                            >
                                {item.text}
                            </a>
                        ))}
                    </nav>

                    <div className="right-section" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <div className="language-selector" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <img 
                                src={attributes.languageFlag} 
                                alt="Language Flag" 
                                style={{
                                    width: `${attributes.languageFlagSize}px`,
                                    height: `${attributes.languageFlagSize}px`
                                }} 
                            />
                            <span>{attributes.languageText}</span>
                        </div>

                        <a 
                            href={attributes.buttonUrl}
                            className="demo-button" 
                            style={{
                                backgroundColor: attributes.buttonColor,
                                color: attributes.buttonTextColor,
                                padding: `${attributes.buttonPaddingV}px ${attributes.buttonPaddingH}px`,
                                borderRadius: `${attributes.buttonBorderRadius}px`,
                                textDecoration: 'none',
                                fontWeight: attributes.buttonFontWeight,
                                fontSize: `${attributes.buttonFontSize}px`,
                                display: 'inline-block',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {attributes.buttonText}
                        </a>
                    </div>
                </div>
            </header>
        );
    }
});
