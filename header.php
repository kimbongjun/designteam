<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package designteam
 */

?>
<!doctype html>
<html <?php language_attributes(); ?> class="<?php echo (is_front_page() ? 'mainpage' : '');?>">

<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<header class="site-header">
	<h1 id="logo">
		<a href="<?php echo home_url('/')?>">
	
			<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 304.09 305.42">
				<defs>
					<style>
						.cls-1 {
							fill: none;
							stroke: #fff;
							stroke-miterlimit: 10;
							stroke-width: 5px;
						}
					</style>
				</defs>
				<title>design_logo</title>
				<path class="cls-1"
					d="M396.83,450H283.45a14.18,14.18,0,0,1-14.18-14.18V322.42a14.18,14.18,0,0,1,14.18-14.18H396.83A14.18,14.18,0,0,1,411,322.42v1.3a14.18,14.18,0,0,1-14.18,14.18h-97.6v82.42h97.6A14.18,14.18,0,0,1,411,434.5v1.3A14.18,14.18,0,0,1,396.83,450Z"
					transform="translate(-268.9 -144.93)" />
				<path class="cls-1"
					d="M558.11,450H445.39a14.51,14.51,0,0,1-14.51-14.51V322.75a14.51,14.51,0,0,1,14.51-14.51H558.11a14.51,14.51,0,0,1,14.51,14.51v.64a14.51,14.51,0,0,1-14.51,14.51H460.84v82.42h97.27a14.51,14.51,0,0,1,14.51,14.51v.64A14.51,14.51,0,0,1,558.11,450Z"
					transform="translate(-268.9 -144.93)" />
				<rect class="cls-1" x="248.84" y="219.35" width="54.87" height="29.65" rx="14.17" />
				<path class="cls-1"
					d="M558.51,287H445a14.11,14.11,0,0,1-14.11-14.11V159.41A14.11,14.11,0,0,1,445,145.3H558.51a14.11,14.11,0,0,1,14.11,14.11v1.45A14.11,14.11,0,0,1,558.51,175H460.84v82.42h97.67a14.11,14.11,0,0,1,14.11,14.11v1.44A14.11,14.11,0,0,1,558.51,287Z"
					transform="translate(-268.9 -144.93)" />
				<path class="cls-1"
					d="M340.14,175.3a40.87,40.87,0,1,1-40.87,40.87,40.92,40.92,0,0,1,40.87-40.87m0-30A70.87,70.87,0,1,0,411,216.17a70.87,70.87,0,0,0-70.87-70.87Z"
					transform="translate(-268.9 -144.93)" />
				<rect class="cls-1" x="87.23" y="219.35" width="54.87" height="29.65" rx="14.17" />
			</svg>
		</a>	
	</h1>
	<div id="global_menu_btn_wrap">
		<a id="global_menu_btn" class="global_menu_btn custom_hover custom_simple_cursor" href="#">
		<span class="sr-only">메뉴 열기</span>
		<div class="global_menu_btn_inner">
			<span class="global_menu_btn_line global_menu_btn_line_01"></span>
			<span class="global_menu_btn_line global_menu_btn_line_02"></span>
			<span class="global_menu_btn_line global_menu_btn_line_03"></span>
		</div>
		</a>
	</div>
	<div id="global_menu_outer">
		<div class="global_menu_inner">
			<!-- <div class="global_menu_cursor"><i></i><span class="sr-only">닫기</span></div> -->
			<div class="global_menu_bg"></div>

			<nav class="global_menu_nav">
				<?php 
					wp_nav_menu(array(
						'menu' => 'Primary',
						'menu_id' => 'menu',
						'walker' => new Description_Walker()
					))
				?>				
			</nav>
		</div>
	</div>
	</header>
	
	<!-- <div id="global_popup_overlay" class="global_popup_overlay"></div>
    <div id="global_popup_cover" class="global_popup_cover"></div>
    <div id="global_popup_dim" class="global_popup_dim"></div> -->	