<?php

add_theme_support('custom-logo');

wp_enqueue_script('jquery');

function register_my_menu()
{
    register_nav_menu('header-menu-1', __('Main menu 1'));
    register_nav_menu('header-menu-2', __('Main menu 2'));
    register_nav_menu('footer-menu', __('Footer menu'));
}
add_action('init', 'register_my_menu');

// Add thumbnails support
function add_support()
{
    add_theme_support('post-thumbnails');
    add_post_type_support('page', 'excerpt');
}
add_action('after_setup_theme', 'add_support');

// Set global variable to store template name
add_filter('template_include', 'var_template_include', 1000);
function var_template_include($t)
{
    $GLOBALS['current_theme_template'] = basename($t, ".php");
    return $t;
}
function get_current_template($echo = false)
{
    if (!isset($GLOBALS['current_theme_template']))
        return false;
    if ($echo)
        echo $GLOBALS['current_theme_template'];
    else
        return $GLOBALS['current_theme_template'];
}
