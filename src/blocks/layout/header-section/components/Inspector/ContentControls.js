import React from 'react';
import { PanelBody, TextControl, Button, TabPanel } from '@wordpress/components';
import { MediaUpload } from '@wordpress/block-editor';

const HeaderContent = ({ attributes, setAttributes }) => (
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
                                    style={{ width: '100%' }}
                                >
                                    ლოგოს შეცვლა
                                </Button>
                            </div>
                        ) : (
                            <Button
                                onClick={open}
                                variant="secondary"
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

const NavigationContent = ({ attributes, setAttributes, updateMenuItem }) => (
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
                    <TextControl
                        label={`ბმული ${index + 1} - აღწერა`}
                        value={item.description || ''}
                        onChange={(value) => updateMenuItem(index, 'description', value)}
                    />
                    <Button 
                        isDestructive
                        onClick={() => {
                            const newItems = [...attributes.menuItems];
                            newItems.splice(index, 1);
                            setAttributes({ menuItems: newItems });
                        }}
                    >
                        Remove
                    </Button>
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

const ActionContent = ({ attributes, setAttributes }) => (
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

const ContentControls = ({ attributes, setAttributes, updateMenuItem }) => {
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
                    return <HeaderContent attributes={attributes} setAttributes={setAttributes} />;
                }
                if (contentTab.name === 'navigation') {
                    return <NavigationContent attributes={attributes} setAttributes={setAttributes} updateMenuItem={updateMenuItem} />;
                }
                if (contentTab.name === 'actions') {
                    return <ActionContent attributes={attributes} setAttributes={setAttributes} />;
                }
            }}
        </TabPanel>
    );
};

export default ContentControls;
