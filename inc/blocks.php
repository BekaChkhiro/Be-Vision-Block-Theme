<?php
function bevision_register_blocks() {
    if (!function_exists('register_block_type')) {
        return;
    }

    // Layout blocks
    register_block_type(get_template_directory() . '/src/blocks/layout/footer');
    register_block_type(get_template_directory() . '/src/blocks/layout/hero-section');
    register_block_type(get_template_directory() . '/src/blocks/layout/header-section');
    
    // Content blocks
    register_block_type(get_template_directory() . '/src/blocks/content/products');
    register_block_type(get_template_directory() . '/src/blocks/content/importance-section');
    register_block_type(get_template_directory() . '/src/blocks/content/why-bivision');
    register_block_type(get_template_directory() . '/src/blocks/content/partners');
    register_block_type(get_template_directory() . '/src/blocks/content/analytics-hero');
    register_block_type(get_template_directory() . '/src/blocks/content/client-testimonials');
    register_block_type(get_template_directory() . '/src/blocks/content/product-hero');
    register_block_type(get_template_directory() . '/src/blocks/content/dashboard-features');
    register_block_type(get_template_directory() . '/src/blocks/content/category-analysis');
    register_block_type(get_template_directory() . '/src/blocks/content/cross-sell-basket');
    register_block_type(get_template_directory() . '/src/blocks/content/lead-popup');
    
    // Register posts tab block with additional settings
    register_block_type('bevision/posts-tab', array(
        'render_callback' => 'bevision_render_posts_tab',
        'supports' => array(
            'align' => true,
            'html' => false
        ),
        'attributes' => array(
            'categories' => array(
                'type' => 'array',
                'default' => array()
            ),
            'currentTab' => array(
                'type' => 'string',
                'default' => 'all'
            ),
            'postsPerPage' => array(
                'type' => 'number',
                'default' => 4
            ),
            'maxPosts' => array(
                'type' => 'number',
                'default' => 12
            )
        )
    ));
}

// Register blocks on init
add_action('init', 'bevision_register_blocks');

// Add post visibility support
add_action('init', function() {
    add_post_type_support('post', 'custom-fields');
    add_post_type_support('post', 'excerpt');
    add_post_type_support('post', 'thumbnail');
});
