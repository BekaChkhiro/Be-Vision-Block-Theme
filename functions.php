<?php

// Include font manager
require_once get_template_directory() . '/inc/class-bevision-fonts.php';
// Include theme settings
require_once get_template_directory() . '/inc/theme-settings.php';
// Include blocks registration
require_once get_template_directory() . '/inc/blocks.php';

if ( ! function_exists( 'bevision_setup' ) ) {
    function bevision_setup() {
        add_theme_support( 'wp-block-styles' );
        add_theme_support( 'editor-styles' );
        add_editor_style( 'build/index.css' );
    }
}
add_action( 'after_setup_theme', 'bevision_setup' );

// Initialize font manager
add_action('after_setup_theme', function() {
    $fonts = BeVision_Fonts::get_instance();
    add_action('admin_menu', [$fonts, 'add_font_upload_page']);
    add_action('wp_enqueue_scripts', [$fonts, 'register_fonts']);
    add_action('admin_enqueue_scripts', [$fonts, 'register_fonts']);
});

// Posts tab block render callback
function bevision_render_posts_tab($attributes) {
    wp_enqueue_script(
        'bevision-posts-tab',
        get_template_directory_uri() . '/src/blocks/content/posts-tab/frontend.js',
        array(),
        filemtime(get_template_directory() . '/src/blocks/content/posts-tab/frontend.js'),
        true
    );

    wp_localize_script('bevision-posts-tab', 'bevisionSettings', array(
        'restUrl' => esc_url_raw(rest_url()),
        'nonce' => wp_create_nonce('wp_rest'),
        'themeUrl' => get_template_directory_uri()
    ));

    $wrapper_attributes = get_block_wrapper_attributes();
    
    return sprintf(
        '<div %1$s>
            <div class="blog-posts-filter" data-posts-per-page="%2$s" data-max-posts="%3$s">
                <div class="posts-tabs-container"></div>
                <div class="posts-grid-container">
                    <div class="loading-indicator" style="display: none">პოსტების ჩატვირთვა...</div>
                </div>
                <div class="load-more-container">
                    <button class="load-more-button">მეტის ნახვა</button>
                </div>
            </div>
        </div>',
        $wrapper_attributes,
        isset($attributes['postsPerPage']) ? esc_attr($attributes['postsPerPage']) : '4',
        isset($attributes['maxPosts']) ? esc_attr($attributes['maxPosts']) : '12'
    );
}

function bevision_enqueue_block_editor_assets() {
    $asset_file = include( get_template_directory() . '/build/index.asset.php' );
    
    wp_enqueue_script(
        'bevision-blocks',
        get_template_directory_uri() . '/build/index.js',
        $asset_file['dependencies'],
        $asset_file['version']
    );

    wp_enqueue_style(
        'bevision-blocks',
        get_template_directory_uri() . '/build/index.css',
        array(),
        $asset_file['version']
    );
}
add_action( 'enqueue_block_editor_assets', 'bevision_enqueue_block_editor_assets' );

function bevision_enqueue_assets() {
    $asset_file = include( get_template_directory() . '/build/index.asset.php' );

    wp_enqueue_style(
        'bevision-styles',
        get_template_directory_uri() . '/build/index.css',
        array(),
        $asset_file['version']
    );
}
add_action( 'wp_enqueue_scripts', 'bevision_enqueue_assets' );
