<?php
if( function_exists('acf_add_options_page') ) {
	$parent = acf_add_options_page(array(
    	'icon_url' => 'dashicons-hammer',    
		'page_title' 	=> '잡동사니',
		'menu_title'	=> '잡동사니',
		'menu_slug' 	=> 'bongjour-theme-settings'   		
	));	
}

add_action( 'init', 'cptui_register_my_cpts' );
function cptui_register_my_cpts() {

	$labels = array(
		"name" => "indivi",
		"singular_name" => "indivi",
		"menu_name" => "해우소",
		"all_items" => "모든 해우소",
	);
	$rewrite = array(
		//'slug'                  => 'recipes/%recipes-category%',
		'slug'                  => 'indivi',
		'with_front'            => true,
		'pages'                 => true,
		'feeds'                 => true,
	);
	$args = array(
		"labels" => $labels,		
		"public" => true,
		"show_ui" => true,
		"has_archive" => true,
		"show_in_menu" => true,		
		"capability_type" => "post",
		"map_meta_cap" => true,
		"hierarchical" => true,
		"rewrite" => $rewrite,
		"query_var" => true,
		"menu_icon" => "dashicons-star-filled",
		"supports" => array( "title", "editor", "excerpt", "thumbnail", "page-attributes" ),
		"taxonomies" => array( "recipes-category" )
	);
	register_post_type( "recipes", $args );	

}
//add_action( 'init', 'cptui_register_my_taxes' );
function cptui_register_my_taxes() {

	$labels = array(
		"name" => "Recipes Category",
		"label" => "Recipes Category",
		);

	$args = array(
		"labels" => $labels,
		"hierarchical" => true,
		"label" => "Recipes Category",
		"show_ui" => true,
		"query_var" => true,
		//"rewrite" => array( 'slug' => 'recipes', 'with_front' => true, 'hierarchical' => true ),
		"show_admin_column" => true,
	);
	register_taxonomy( "recipes-category", array( "recipes" ), $args );
	flush_rewrite_rules();
// End cptui_register_my_taxes
}

// loginout
add_filter( 'wp_nav_menu_items', 'wti_loginout_menu_link', 10, 2 );
function wti_loginout_menu_link( $items, $args ) {	
   if ($args->menu == 'Primary') {
      if (is_user_logged_in()) {
         $items .= '<li class="right"><a href="'. wp_logout_url(get_permalink()) .'">'. __("나갈게") .'</a></li>';
      } else {
         $items .= '<li class="right"><a href="'. wp_login_url(get_permalink()) .'">'. __("반가워") .'</a></li>';
      }
   }
   return $items;
}