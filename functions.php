<?php

// Enable error reporting for debugging
if (!defined('WP_DEBUG')) {
    define('WP_DEBUG', true);
}
if (!defined('WP_DEBUG_DISPLAY')) {
    define('WP_DEBUG_DISPLAY', true);
}
if (!defined('WP_DEBUG_LOG')) {
    define('WP_DEBUG_LOG', true);
}
error_reporting(E_ALL);
ini_set('display_errors', 1);

add_action('wp_footer', function() {
    if (defined('WP_DEBUG') && WP_DEBUG) {
        $posts = get_posts(array(
            'post_type' => 'post',
            'post_status' => 'publish',
            'numberposts' => -1
        ));
        echo '<!-- Debug: Found ' . count($posts) . ' published posts -->';
        
        if (count($posts) === 0) {
            // Create a test post if no posts exist
            wp_insert_post(array(
                'post_title' => 'Test Post',
                'post_content' => 'This is a test post.',
                'post_status' => 'publish',
                'post_author' => 1,
                'post_type' => 'post'
            ));
            echo '<!-- Debug: Created a test post -->';
        }
    }
});

// Include necessary files
require_once get_template_directory() . '/inc/class-bevision-fonts.php';
require_once get_template_directory() . '/inc/theme-settings.php';
require_once get_template_directory() . '/inc/blocks.php';

// Basic theme setup
function bevision_setup() {
    add_theme_support('wp-block-styles');
    add_theme_support('editor-styles');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-fields');
    add_theme_support('title-tag');
    add_theme_support('automatic-feed-links');
    add_editor_style('build/index.css');

    // Flush rewrite rules to ensure REST API works
    flush_rewrite_rules();
}
add_action('after_setup_theme', 'bevision_setup');

// Initialize font manager
add_action('after_setup_theme', function() {
    $fonts = BeVision_Fonts::get_instance();
    add_action('admin_menu', [$fonts, 'add_font_upload_page']);
    add_action('wp_enqueue_scripts', [$fonts, 'register_fonts']);
    add_action('admin_enqueue_scripts', [$fonts, 'register_fonts']);
});

// Initialize REST API
function bevision_rest_api_init() {
    // Register post fields
    register_rest_field('post', 'featured_image_url', array(
        'get_callback' => function($object) {
            if ($object['featured_media']) {
                $img = wp_get_attachment_image_src($object['featured_media'], 'medium');
                return $img[0];
            }
            return null;
        }
    ));

    // Add CORS headers for REST API
    add_action('rest_api_init', function() {
        remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
        add_filter('rest_pre_serve_request', function($value) {
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Expose-Headers: X-WP-Total, X-WP-TotalPages');
            return $value;
        });
    });
}
add_action('rest_api_init', 'bevision_rest_api_init');

// Fix potential REST API issues
function bevision_fix_rest_api_issues() {
    // Remove any filters that might interfere with the REST API
    remove_filter('rest_authentication_errors', 'wp_authenticate_cookie', 100);
    
    // Ensure proper REST base URL
    add_filter('rest_url_prefix', function($prefix) {
        return 'wp-json';
    });
}
add_action('init', 'bevision_fix_rest_api_issues');

// Modify post queries to ensure public visibility
add_action('pre_get_posts', function($query) {
    if (!is_admin() && $query->is_main_query()) {
        $query->set('post_status', 'publish');
    }
});

// Posts block render callback
function bevision_render_posts_tab($attributes) {
    // Enqueue frontend script with direct AJAX support
    wp_enqueue_script(
        'bevision-posts-tab',
        get_template_directory_uri() . '/src/blocks/content/posts-tab/frontend.js',
        array('jquery'),
        filemtime(get_template_directory() . '/src/blocks/content/posts-tab/frontend.js'),
        true
    );

    // Localize script with AJAX URL instead of REST API
    wp_localize_script('bevision-posts-tab', 'bevisionSettings', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'action' => 'get_posts',
        'nonce' => wp_create_nonce('bevision_posts_nonce'),
        'themeUrl' => get_template_directory_uri(),
        'debug' => defined('WP_DEBUG') && WP_DEBUG
    ));

    $wrapper_attributes = get_block_wrapper_attributes();
    $categories = isset($attributes['categories']) ? wp_json_encode($attributes['categories']) : '[]';
    $current_tab = isset($attributes['currentTab']) ? esc_attr($attributes['currentTab']) : 'all';

    return sprintf(
        '<div %1$s>
            <div class="blog-posts-filter" 
                data-posts-per-page="%2$s"
                data-max-posts="%3$s"
                data-categories=\'%4$s\'
                data-current-tab="%5$s"
            >
                <div class="posts-tabs-container"></div>
                <div class="posts-grid-container"></div>
                <div class="loading-indicator" style="display: none">
                    პოსტების ჩატვირთვა...
                </div>
                <div class="load-more-container">
                    <button class="load-more-button">მეტის ნახვა</button>
                </div>
            </div>
        </div>',
        $wrapper_attributes,
        isset($attributes['postsPerPage']) ? esc_attr($attributes['postsPerPage']) : '4',
        isset($attributes['maxPosts']) ? esc_attr($attributes['maxPosts']) : '12',
        $categories,
        $current_tab
    );
}

// AJAX fallback for posts loading
function bevision_ajax_get_posts() {
    $page = isset($_POST['page']) ? intval($_POST['page']) : 1;
    $per_page = isset($_POST['per_page']) ? intval($_POST['per_page']) : 4;
    $category = isset($_POST['category']) ? sanitize_text_field($_POST['category']) : 'all';
    
    $args = array(
        'post_type' => 'post',
        'post_status' => 'publish',
        'posts_per_page' => $per_page,
        'paged' => $page,
        'orderby' => 'date',
        'order' => 'DESC'
    );
    
    if ($category !== 'all') {
        $args['cat'] = $category;
    }
    
    $query = new WP_Query($args);
    $posts = array();
    
    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $post = array(
                'id' => get_the_ID(),
                'title' => array(
                    'rendered' => get_the_title()
                ),
                'link' => get_permalink(),
                'featured_image_url' => get_the_post_thumbnail_url(null, 'medium'),
                'categories' => array()
            );
            
            $categories = get_the_category();
            if (!empty($categories)) {
                foreach ($categories as $cat) {
                    $post['categories'][] = array(
                        'id' => $cat->term_id,
                        'name' => $cat->name,
                        'slug' => $cat->slug
                    );
                }
            }
            
            $posts[] = $post;
        }
        wp_reset_postdata();
    }
    
    wp_send_json_success(array(
        'posts' => $posts,
        'total' => $query->found_posts,
        'max_pages' => $query->max_num_pages
    ));
}
add_action('wp_ajax_get_posts', 'bevision_ajax_get_posts');
add_action('wp_ajax_nopriv_get_posts', 'bevision_ajax_get_posts');

// Register assets
function bevision_enqueue_block_editor_assets() {
    $asset_file = include(get_template_directory() . '/build/index.asset.php');
    
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
add_action('enqueue_block_editor_assets', 'bevision_enqueue_block_editor_assets');

// Frontend assets
function bevision_enqueue_assets() {
    $asset_file = include(get_template_directory() . '/build/index.asset.php');

    wp_enqueue_style(
        'bevision-styles',
        get_template_directory_uri() . '/build/index.css',
        array(),
        $asset_file['version']
    );
}
add_action('wp_enqueue_scripts', 'bevision_enqueue_assets');

// REST API debugging and initialization
add_action('rest_api_init', function() {
    // Enable raw error display for REST API
    if (defined('REST_REQUEST') && REST_REQUEST) {
        ini_set('display_errors', 1);
        error_reporting(E_ALL);
    }

    // Add basic GET endpoint for testing
    register_rest_route('bevision/v1', '/test', array(
        'methods' => 'GET',
        'callback' => function() {
            return array('status' => 'ok');
        },
        'permission_callback' => function() {
            return true;
        }
    ));
}, 0);

// Add direct posts endpoint for testing
add_action('rest_api_init', function() {
    register_rest_route('bevision/v1', '/posts', array(
        'methods' => 'GET',
        'callback' => function() {
            $args = array(
                'post_type' => 'post',
                'post_status' => 'publish',
                'posts_per_page' => 4
            );
            
            $query = new WP_Query($args);
            $posts = array();
            
            if ($query->have_posts()) {
                while ($query->have_posts()) {
                    $query->the_post();
                    $posts[] = array(
                        'id' => get_the_ID(),
                        'title' => get_the_title(),
                        'link' => get_permalink()
                    );
                }
                wp_reset_postdata();
            }
            
            return $posts;
        },
        'permission_callback' => function() {
            return true;
        }
    ));
});

// Add direct AJAX test endpoint
function bevision_test_endpoint() {
    wp_send_json_success(array('status' => 'ok'));
}
add_action('wp_ajax_test_endpoint', 'bevision_test_endpoint');
add_action('wp_ajax_nopriv_test_endpoint', 'bevision_test_endpoint');
