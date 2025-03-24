<?php
function bevision_register_blocks() {
    // Register blocks here
    register_block_type(get_template_directory() . '/src/blocks/footer');
    register_block_type(get_template_directory() . '/src/blocks/hero-section');
    register_block_type(get_template_directory() . '/src/blocks/header-section');
}
add_action('init', 'bevision_register_blocks');
