import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl, TabPanel } from '@wordpress/components';

const blockStyle = {
    productsSection: {
        padding: '70px 0px 120px',
        color: '#333',
        position: 'relative',
        overflow: 'hidden'
    },
    glowEffect: {
        position: 'absolute',
        top: '50%',
        right: '-20%',
        width: '60%',
        height: '60%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        zIndex: 1
    },
    container: {
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 15px',
        position: 'relative',
        zIndex: 2
    },
    sectionTitle: {
        color: '#6653C6',
        textAlign: 'center',
        fontFamily: '"Helvetica Neue LT GEO"',
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: 750,
        lineHeight: 'normal',
        margin: '0px 0px 5px'
    },
    sectionSubtitle: {
        color: 'var(--Dark-Blue, #221A4C)',
        textAlign: 'center',
        fontSize: '30px',
        fontStyle: 'normal',
        fontWeight: 750,
        lineHeight: 'normal',
        margin: '0px 0px 60px'
    },
    navigation: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        listStyle: 'none',
        padding: 0,
        marginBottom: '60px'
    },
    navItem: {
        color: '#221A4C',
        fontSize: '20px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        padding: '12px 24px',
        borderRadius: '5px',
        fontWeight: '700',
        background: '#fff',
        ':hover': {
            color: '#6653C6',
            background: '#ecf0f8',
        }
    },
    navItemActive: {
        color: '#6653C6',
        background: '#ecf0f8',
        borderRadius: '5px'
    },
    productsGrid: {
        display: 'grid',
        gridTemplateColumns: '55% 45%',
        gap: '48px',
        alignItems: 'center'
    },
    productItem: {
        padding: '0'
    },
    subtitle: {
        color: '#7B61FF',
        fontSize: '16px',
        fontWeight: '750',
        margin: '0px 0px 5px'
    },
    title: {
        color: '#333',
        fontSize: '24px',
        fontWeight: '600',
        margin: '0px 0px 40px'
    },
    featuresList: {
        listStyle: 'none',
        padding: 0,
        marginBottom: '32px'
    },
    featureItem: {
        position: 'relative',
        paddingLeft: '28px',
        marginBottom: '20px',
        color: '#333',
        fontSize: '18px',
        fontWeight: '400',
    },
    checkmark: {
        position: 'absolute',
        left: 0,
        top: '2px',
        color: '#4CD964',
        fontSize: '18px'
    },
    buttonGroup: {
        display: 'flex',
        gap: '16px',
        marginTop: '32px'
    },
    button: {
        padding: '14px 28px',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    },
    primaryButton: {
        backgroundColor: '#6653C6',
        color: '#fff',
        padding: '16.5px 40px',
        fontSize: '16px',
        '&:hover': {
            backgroundColor: '#6B4FFF'
        }
    },
    secondaryButton: {
        backgroundColor: '#2FCA02',
        color: '#fff',
        padding: '16.5px 40px',
        fontSize: '16px',
        '&:hover': {
            backgroundColor: '#3CC954'
        }
    },
    imageContainer: {
        width: '100%',
        height: '400px',
        borderRadius: '16px',
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    uploadButton: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        border: '2px dashed rgba(123, 97, 255, 0.3)',
        borderRadius: '16px'
    }
};

registerBlockType('bevision/products', {
    title: 'Products Tabs',
    icon: 'grid-view',
    category: 'design',
    attributes: {
        tabs: {
            type: 'array',
            default: [
                {
                    id: 'biretail',
                    name: 'BiRetail',
                    subtitle: 'Retail',
                    title: 'Sales analytics',
                    features: [
                        'Client segmentation and service personalization',
                        'RFM-analysis and client preferences tracking',
                        'Smart SKU management and inventory analysis',
                        'KPI reporting and sales personnel performance tracking',
                        'Demand prediction, trend and seasonality analysis'
                    ],
                    image: '/wp-content/themes/BeVision/src/images/retail-analytics.png'
                }
            ]
        },
        activeTab: {
            type: 'string',
            default: 'biretail'
        }
    },

    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        const { tabs, activeTab } = attributes;

        const addNewTab = () => {
            const newTab = {
                id: `tab${tabs.length + 1}`,
                name: `Tab ${tabs.length + 1}`,
                subtitle: 'Subtitle',
                title: 'Title',
                features: ['New Feature'],
                image: ''
            };
            setAttributes({ tabs: [...tabs, newTab] });
        };

        const duplicateTab = (tabIndex) => {
            const sourceTab = tabs[tabIndex];
            const newTab = {
                ...sourceTab,
                id: `tab${tabs.length + 1}`,
                name: `${sourceTab.name} (Copy)`
            };
            const newTabs = [...tabs];
            newTabs.splice(tabIndex + 1, 0, newTab);
            setAttributes({ 
                tabs: newTabs,
                activeTab: newTab.id
            });
        };

        const updateTab = (index, field, value) => {
            const newTabs = [...tabs];
            newTabs[index] = { ...newTabs[index], [field]: value };
            setAttributes({ tabs: newTabs });
        };

        const updateFeature = (tabIndex, featureIndex, value) => {
            const newTabs = [...tabs];
            newTabs[tabIndex].features[featureIndex] = value;
            setAttributes({ tabs: newTabs });
        };

        const addFeature = (tabIndex) => {
            const newTabs = [...tabs];
            newTabs[tabIndex].features.push('New Feature');
            setAttributes({ tabs: newTabs });
        };

        const removeFeature = (tabIndex, featureIndex) => {
            const newTabs = [...tabs];
            newTabs[tabIndex].features.splice(featureIndex, 1);
            setAttributes({ tabs: newTabs });
        };

        const removeTab = (index) => {
            const newTabs = tabs.filter((_, i) => i !== index);
            setAttributes({ tabs: newTabs });
            if (tabs[index].id === activeTab && newTabs.length > 0) {
                setAttributes({ activeTab: newTabs[0].id });
            }
        };

        return (
            <>
                <InspectorControls>
                    <div style={{ padding: '16px' }}>
                        <div style={{ 
                            background: '#fff',
                            padding: '16px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                            marginBottom: '24px'
                        }}>
                            <h2 style={{ 
                                margin: '0 0 16px',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#1e1e1e'
                            }}>
                                Tab Management
                            </h2>

                            <Button 
                                isPrimary
                                onClick={addNewTab}
                                icon="plus-alt2"
                                style={{ 
                                    marginBottom: '16px', 
                                    width: '100%',
                                    justifyContent: 'center',
                                    height: '40px',
                                    gap: '8px',
                                    fontSize: '13px',
                                    fontWeight: '500'
                                }}
                            >
                                Add New Tab
                            </Button>

                            <div style={{ 
                                display: 'flex',
                                overflowX: 'auto',
                                gap: '8px',
                                paddingBottom: '4px',
                                marginBottom: '-4px',
                                WebkitOverflowScrolling: 'touch',
                                msOverflowStyle: '-ms-autohiding-scrollbar',
                                scrollbarWidth: 'thin',
                                '&::-webkit-scrollbar': {
                                    height: '4px'
                                },
                                '&::-webkit-scrollbar-track': {
                                    background: '#f1f1f1',
                                    borderRadius: '4px'
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    background: '#888',
                                    borderRadius: '4px'
                                }
                            }}>
                                {tabs.map((tab, index) => (
                                    <Button
                                        key={tab.id}
                                        isSecondary={activeTab !== tab.id}
                                        isPrimary={activeTab === tab.id}
                                        onClick={() => setAttributes({ activeTab: tab.id })}
                                        style={{
                                            minWidth: 'auto',
                                            padding: '8px 16px',
                                            height: '36px',
                                            whiteSpace: 'nowrap',
                                            fontSize: '13px',
                                            fontWeight: '500',
                                            borderRadius: '6px',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {tab.name || `Tab ${index + 1}`}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {tabs.map((tab, tabIndex) => (
                            <div key={tab.id} style={{ display: activeTab === tab.id ? 'block' : 'none' }}>
                                <div style={{
                                    background: '#fff',
                                    padding: '16px',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                    marginBottom: '16px'
                                }}>
                                    <h2 style={{ 
                                        margin: '0 0 16px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: '#1e1e1e',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <span className="dashicons dashicons-admin-generic" style={{ fontSize: '16px' }} />
                                        Basic Information
                                    </h2>
                                    
                                    <div style={{ marginBottom: '16px' }}>
                                        <div style={{ marginBottom: '12px' }}>
                                            <TextControl
                                                label={
                                                    <span style={{ 
                                                        fontSize: '12px', 
                                                        fontWeight: '500',
                                                        color: '#1e1e1e',
                                                        marginBottom: '4px',
                                                        display: 'block'
                                                    }}>
                                                        Tab Name
                                                    </span>
                                                }
                                                value={tab.name}
                                                onChange={(value) => updateTab(tabIndex, 'name', value)}
                                                style={{ margin: 0 }}
                                            />
                                        </div>
                                        <div style={{ marginBottom: '12px' }}>
                                            <TextControl
                                                label={
                                                    <span style={{ 
                                                        fontSize: '12px', 
                                                        fontWeight: '500',
                                                        color: '#1e1e1e',
                                                        marginBottom: '4px',
                                                        display: 'block'
                                                    }}>
                                                        Subtitle
                                                    </span>
                                                }
                                                value={tab.subtitle}
                                                onChange={(value) => updateTab(tabIndex, 'subtitle', value)}
                                                style={{ margin: 0 }}
                                            />
                                        </div>
                                        <div>
                                            <TextControl
                                                label={
                                                    <span style={{ 
                                                        fontSize: '12px', 
                                                        fontWeight: '500',
                                                        color: '#1e1e1e',
                                                        marginBottom: '4px',
                                                        display: 'block'
                                                    }}>
                                                        Title
                                                    </span>
                                                }
                                                value={tab.title}
                                                onChange={(value) => updateTab(tabIndex, 'title', value)}
                                                style={{ margin: 0 }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div style={{
                                    background: '#fff',
                                    padding: '16px',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                    marginBottom: '16px'
                                }}>
                                    <h2 style={{ 
                                        margin: '0 0 16px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: '#1e1e1e',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <span className="dashicons dashicons-editor-ul" style={{ fontSize: '16px' }} />
                                        Features List
                                    </h2>

                                    <div style={{ marginBottom: '12px' }}>
                                        {tab.features.map((feature, featureIndex) => (
                                            <div 
                                                key={featureIndex} 
                                                style={{ 
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    marginBottom: '8px',
                                                    background: '#f9f9f9',
                                                    padding: '8px 12px',
                                                    borderRadius: '6px',
                                                    border: '1px solid #e2e4e7'
                                                }}
                                            >
                                                <span className="dashicons dashicons-menu" style={{ 
                                                    color: '#999',
                                                    fontSize: '16px',
                                                    cursor: 'move'
                                                }} />
                                                <TextControl
                                                    value={feature}
                                                    onChange={(value) => updateFeature(tabIndex, featureIndex, value)}
                                                    style={{ margin: 0, flex: 1 }}
                                                    placeholder="Enter feature text"
                                                />
                                                <Button 
                                                    isDestructive
                                                    icon="no-alt"
                                                    onClick={() => removeFeature(tabIndex, featureIndex)}
                                                    style={{
                                                        padding: '0',
                                                        minWidth: '28px',
                                                        height: '28px',
                                                        border: 'none'
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <Button
                                        isSecondary
                                        icon="plus"
                                        onClick={() => addFeature(tabIndex)}
                                        style={{ 
                                            width: '100%', 
                                            justifyContent: 'center', 
                                            height: '36px',
                                            gap: '8px',
                                            fontSize: '13px'
                                        }}
                                    >
                                        Add Feature
                                    </Button>
                                </div>

                                <div style={{
                                    background: '#fff',
                                    padding: '16px',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                    marginBottom: '16px'
                                }}>
                                    <h2 style={{ 
                                        margin: '0 0 16px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: '#1e1e1e',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <span className="dashicons dashicons-format-image" style={{ fontSize: '16px' }} />
                                        Tab Image
                                    </h2>

                                    <MediaUploadCheck>
                                        <div style={{ 
                                            border: '1px dashed #c3c4c7',
                                            borderRadius: '6px',
                                            padding: '16px',
                                            textAlign: 'center',
                                            background: '#f9f9f9',
                                            transition: 'all 0.2s ease'
                                        }}>
                                            {tab.image ? (
                                                <>
                                                    <div style={{
                                                        position: 'relative',
                                                        marginBottom: '12px'
                                                    }}>
                                                        <img 
                                                            src={tab.image} 
                                                            alt="" 
                                                            style={{ 
                                                                width: '100%',
                                                                height: '160px',
                                                                objectFit: 'cover',
                                                                borderRadius: '4px',
                                                                display: 'block'
                                                            }}
                                                        />
                                                        <div style={{
                                                            position: 'absolute',
                                                            top: '8px',
                                                            right: '8px',
                                                            display: 'flex',
                                                            gap: '4px'
                                                        }}>
                                                            <MediaUpload
                                                                onSelect={(media) => updateTab(tabIndex, 'image', media.url)}
                                                                allowedTypes={['image']}
                                                                value={tab.image}
                                                                render={({ open }) => (
                                                                    <Button 
                                                                        onClick={open}
                                                                        icon="update"
                                                                        style={{
                                                                            padding: '0',
                                                                            width: '28px',
                                                                            height: '28px',
                                                                            background: 'rgba(255,255,255,0.9)',
                                                                            border: 'none',
                                                                            borderRadius: '4px',
                                                                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                                                        }}
                                                                    />
                                                                )}
                                                            />
                                                            <Button 
                                                                isDestructive
                                                                icon="no-alt"
                                                                onClick={() => updateTab(tabIndex, 'image', '')}
                                                                style={{
                                                                    padding: '0',
                                                                    width: '28px',
                                                                    height: '28px',
                                                                    background: 'rgba(255,255,255,0.9)',
                                                                    borderRadius: '4px',
                                                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <MediaUpload
                                                    onSelect={(media) => updateTab(tabIndex, 'image', media.url)}
                                                    allowedTypes={['image']}
                                                    value={tab.image}
                                                    render={({ open }) => (
                                                        <div style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                            gap: '8px',
                                                            padding: '24px 16px',
                                                            cursor: 'pointer'
                                                        }} onClick={open}>
                                                            <span className="dashicons dashicons-upload" style={{ 
                                                                fontSize: '24px',
                                                                width: '24px',
                                                                height: '24px',
                                                                color: '#007cba'
                                                            }} />
                                                            <span style={{
                                                                fontSize: '13px',
                                                                color: '#1e1e1e'
                                                            }}>
                                                                Click to upload image
                                                            </span>
                                                        </div>
                                                    )}
                                                />
                                            )}
                                        </div>
                                    </MediaUploadCheck>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    gap: '8px',
                                    marginBottom: '16px'
                                }}>
                                    <Button 
                                        icon="admin-page"
                                        onClick={() => duplicateTab(tabIndex)}
                                        style={{ 
                                            flex: 1,
                                            justifyContent: 'center',
                                            height: '36px',
                                            gap: '8px',
                                            fontSize: '13px'
                                        }}
                                    >
                                        Duplicate Tab
                                    </Button>
                                    <Button 
                                        isDestructive
                                        icon="trash"
                                        onClick={() => removeTab(tabIndex)}
                                        style={{ 
                                            flex: 1,
                                            justifyContent: 'center',
                                            height: '36px',
                                            gap: '8px',
                                            fontSize: '13px'
                                        }}
                                    >
                                        Remove Tab
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </InspectorControls>

                <div {...blockProps}>
                    <div style={blockStyle.productsSection}>
                        <div style={blockStyle.glowEffect}></div>
                        <div style={blockStyle.container}>
                            <h2 style={blockStyle.sectionTitle}>PRODUCTS</h2>
                            <h3 style={blockStyle.sectionSubtitle}>What we offer</h3>
                            
                            <ul style={blockStyle.navigation}>
                                {tabs.map((tab) => (
                                    <li
                                        key={tab.id}
                                        onClick={() => setAttributes({ activeTab: tab.id })}
                                        style={{
                                            ...blockStyle.navItem,
                                            ...(activeTab === tab.id ? blockStyle.navItemActive : {})
                                        }}
                                    >
                                        {tab.name}
                                    </li>
                                ))}
                            </ul>

                            {tabs.map((tab) => (
                                <div key={tab.id} style={{ display: activeTab === tab.id ? 'block' : 'none' }}>
                                    <div style={blockStyle.productsGrid}>
                                        <div style={blockStyle.productItem}>
                                            <h4 style={blockStyle.subtitle}>{tab.subtitle}</h4>
                                            <h3 style={blockStyle.title}>{tab.title}</h3>
                                            <ul style={blockStyle.featuresList}>
                                                {tab.features.map((feature, index) => (
                                                    <li key={index} style={blockStyle.featureItem}>
                                                        <span style={blockStyle.checkmark}>✓</span>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                            <div style={blockStyle.buttonGroup}>
                                                <button style={{...blockStyle.button, ...blockStyle.primaryButton}}>
                                                    Learn more
                                                </button>
                                                <button style={{...blockStyle.button, ...blockStyle.secondaryButton}}>
                                                    Book a call
                                                </button>
                                            </div>
                                        </div>
                                        <div style={blockStyle.imageContainer}>
                                            {tab.image && (
                                                <div style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    background: `url(${tab.image})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        );
    },

    save: ({ attributes }) => {
        const { tabs, activeTab } = attributes;
        const blockProps = useBlockProps.save();

        return (
            <div {...blockProps}>
                <div style={blockStyle.productsSection}>
                    <div style={blockStyle.glowEffect}></div>
                    <div style={blockStyle.container}>
                        <h2 style={blockStyle.sectionTitle}>PRODUCTS</h2>
                        <h3 style={blockStyle.sectionSubtitle}>What we offer</h3>
                        
                        <ul style={blockStyle.navigation} className="products-tabs-nav">
                            {tabs.map((tab) => (
                                <li
                                    key={tab.id}
                                    style={{
                                        ...blockStyle.navItem,
                                        ...(activeTab === tab.id ? blockStyle.navItemActive : {})
                                    }}
                                    data-tab={tab.id}
                                    className="products-tab-item"
                                >
                                    {tab.name}
                                </li>
                            ))}
                        </ul>

                        <div className="products-tabs-content">
                            {tabs.map((tab) => (
                                <div 
                                    key={tab.id} 
                                    style={{ display: activeTab === tab.id ? 'block' : 'none' }} 
                                    data-tab-content={tab.id}
                                    className="products-tab-content"
                                >
                                    <div style={blockStyle.productsGrid}>
                                        <div style={blockStyle.productItem}>
                                            <h4 style={blockStyle.subtitle}>{tab.subtitle}</h4>
                                            <h3 style={blockStyle.title}>{tab.title}</h3>
                                            <ul style={blockStyle.featuresList}>
                                                {tab.features.map((feature, index) => (
                                                    <li key={index} style={blockStyle.featureItem}>
                                                        <span style={blockStyle.checkmark}>✓</span>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                            <div style={blockStyle.buttonGroup}>
                                                <button style={{...blockStyle.button, ...blockStyle.primaryButton}}>
                                                    Learn more
                                                </button>
                                                <button style={{...blockStyle.button, ...blockStyle.secondaryButton}}>
                                                    Book a call
                                                </button>
                                            </div>
                                        </div>
                                        <div style={blockStyle.imageContainer}>
                                            {tab.image && (
                                                <div style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    background: `url(${tab.image})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                                document.addEventListener('DOMContentLoaded', function() {
                                    const tabsNav = document.querySelector('.products-tabs-nav');
                                    if (!tabsNav) return;

                                    const tabItems = tabsNav.querySelectorAll('.products-tab-item');
                                    const tabContents = document.querySelectorAll('.products-tab-content');

                                    // Add hover effect styles
                                    const style = document.createElement('style');
                                    style.innerHTML = '.products-tab-item:hover { color: #6653C6 !important; background: #ecf0f8 !important; }';
                                    document.head.appendChild(style);

                                    function setActiveTab(tabId) {
                                        // Update active tab styles
                                        tabItems.forEach(item => {
                                            if (item.dataset.tab === tabId) {
                                                item.style.color = '#6653C6';
                                                item.style.background = '#ecf0f8';
                                                item.style.borderRadius = '5px';
                                            } else {
                                                item.style.color = '#221A4C';
                                                item.style.background = '#fff';
                                                item.style.borderRadius = '5px';
                                            }
                                        });

                                        // Show active content, hide others
                                        tabContents.forEach(content => {
                                            if (content.dataset.tabContent === tabId) {
                                                content.style.display = 'block';
                                            } else {
                                                content.style.display = 'none';
                                            }
                                        });
                                    }

                                    tabItems.forEach(tab => {
                                        tab.addEventListener('click', () => {
                                            const tabId = tab.dataset.tab;
                                            setActiveTab(tabId);
                                        });
                                    });
                                });
                                `
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
});
