<?php
function bevision_register_blocks() {
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
    register_block_type(get_template_directory() . '/src/blocks/content/posts-tab', array(
        'render_callback' => 'bevision_render_posts_tab'
    ));
}
add_action('init', 'bevision_register_blocks');
