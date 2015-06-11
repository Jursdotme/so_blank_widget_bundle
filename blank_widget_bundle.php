<?php
/*
Plugin Name: Blank Widget Bundle
Description: An example plugin to demonstrate extending the SiteOrigin Widgets Bundle.
Version: 1.0
Author: SiteOrigin
Author URI: http://siteorigin.com
License: GPL3
License URI: https://www.gnu.org/licenses/gpl-3.0.txt
*/

function add_my_awesome_widgets_collection($folders){
	$folders[] = plugin_dir_path(__FILE__).'blank_widgets_bundle/';
	return $folders;
}
add_filter('siteorigin_widgets_widget_folders', 'add_my_awesome_widgets_collection');

function blank_widgets_bundle_scripts() {
	wp_enqueue_style( 'blank-widget-bundle-styles', plugin_dir_url( __FILE__ ) . 'build/stylesheets/style.css' );
	wp_enqueue_script( 'blank-widget-bundle-scripts', plugin_dir_url( __FILE__ ) . 'build/js/example.js', array('jquery'), '1.0.0', true );
}

add_action( 'wp_enqueue_scripts', 'blank_widgets_bundle_scripts' );
