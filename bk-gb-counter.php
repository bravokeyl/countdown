<?php
/*
Plugin Name: Counter Block
Plugin URI: https://bravokeyl.com/
Description: Custom plugin
Version: 0.1.0
Author: bravokeyl
Author URI: https://bravokeyl.com/
Text Domain: bk-gb-counter
*/

defined( 'ABSPATH' ) or die( 'Bail out!' );

define( 'BKGB_VERSION', '0.1.0' );

define( 'BKGB_DEVELOPMENT_MODE', true );

/**
 * Load up the assets if Gutenberg is active.
 */
function bkgb_initialize() {
	$files_exist = file_exists( plugin_dir_path( __FILE__ ) . '/build/countdown.js' );

	if ( $files_exist && function_exists( 'register_block_type' ) ) {
		add_action( 'init', 'bkgb_register_blocks' );
		add_action( 'init', 'bkgb_register_scripts' );
    add_filter( 'block_categories', 'bkgb_add_block_category' );
	}

	if ( defined( 'BKGB_DEVELOPMENT_MODE' ) && BKGB_DEVELOPMENT_MODE && ! $files_exist ) {
		add_action( 'admin_notices', 'bkgb_plugins_notice' );
	}
}
add_action( 'plugins_loaded', 'bkgb_initialize' );


/**
 * Adds a category to the block inserter.
 *
 * @param array $categories Array of categories.
 * @return array Array of block categories.
 */
function bkgb_add_block_category( $categories ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'fusion',
				'title' => __( 'Fusion Blocks', 'bk-gb-counter' ),
				'icon'  => 'heart',
			),
		)
	);
}

/**
 * Display a warning about building files.
 */
function bkgb_plugins_notice() {
	echo '<div class="error"><p>';
	printf(
		/* Translators: %1$s is the install command, %2$s is the build command, %3$s is the watch command. */
		esc_html__( 'Blocks development mode requires files to be built. From the plugin directory, run %1$s to install dependencies, %2$s to build the files or %3$s to build the files and watch for changes.', 'bk-gb-counter' ),
		'<code>npm install</code>',
		'<code>npm run build</code>',
		'<code>npm start</code>'
	);
	echo '</p></div>';
}

/**
 * Register the block and its scripts.
 */
function bkgb_register_blocks() {
	register_block_type(
		'bkgb/countdown',
		array(
			'editor_script' => 'bk-countdown',
			'editor_style'  => 'bk-block-editor',
			'style'         => 'bk-block-style',
		)
	);
}

/**
 * Register extra scripts needed.
 */
function bkgb_register_scripts() {

	$block_dependencies = array(
		'wp-blocks',
		'wp-components',
		'wp-compose',
		'wp-data',
		'wp-element',
		'wp-editor',
		'wp-i18n',
		'wp-url',
		'lodash',
		'wc-vendors',
	);

	// @todo Remove this dependency (as it adds a separate react instance).
	wp_register_script(
		'react-transition-group',
		plugins_url( 'assets/js/vendor/react-transition-group.js', __FILE__ ),
		array(),
		'2.2.1',
		true
	);

	wp_register_script(
		'wc-vendors',
		plugins_url( 'build/vendors.js', __FILE__ ),
		array(),
		bkgb_get_file_version( '/build/vendors.js' ),
		true
	);

	wp_register_style(
		'wc-block-editor',
		plugins_url( 'build/editor.css', __FILE__ ),
		array( 'wp-edit-blocks' ),
		bkgb_get_file_version( '/build/editor.css' )
	);

	wp_register_style(
		'wc-block-style',
		plugins_url( 'build/style.css', __FILE__ ),
		array(),
		bkgb_get_file_version( '/build/style.css' )
	);

	wp_register_script(
		'bk-countdown',
		plugins_url( 'build/countdown.js', __FILE__ ),
    $block_dependencies,
		bkgb_get_file_version( '/build/countdown.js' ),
		true
	);

	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations( 'bk-countdown', 'bkgb_counter', plugin_dir_path( __FILE__ ) . 'languages' );
	}

}

/**
 * Get the file modified time as a cache buster if we're in dev mode.
 *
 * @param string $file Local path to the file.
 * @return string The cache buster value to use for the given file.
 */
function bkgb_get_file_version( $file ) {
	if ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) {
		$file = trim( $file, '/' );
		return filemtime( plugin_dir_path( __FILE__ ) . $file );
	}
	return WGPB_VERSION;
}
