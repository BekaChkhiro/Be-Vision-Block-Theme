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
