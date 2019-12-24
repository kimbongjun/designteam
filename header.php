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
			<svg id="udtt_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101 101">
				<defs>
					<style>
						.cls-1 {
							fill: none;
							stroke: #221e1f;
							stroke-miterlimit: 10;
						}
					</style>
				</defs>
				<title>우당탕탕</title>
				<g id="udtt_layer" data-name="udtt_layer">
					<g id="Layer_1" data-name="Layer 1">
						<path class="cls-1"
							d="M42.55,100.5H5.17A4.66,4.66,0,0,1,.5,95.85V58.63A4.66,4.66,0,0,1,5.17,54H42.55a4.66,4.66,0,0,1,4.67,4.65v.43a4.66,4.66,0,0,1-4.67,4.65H10.38V90.77H42.55a4.66,4.66,0,0,1,4.67,4.65v.43A4.66,4.66,0,0,1,42.55,100.5Z" />
						<path class="cls-1"
							d="M95.72,100.5H58.56a4.77,4.77,0,0,1-4.78-4.76v-37A4.77,4.77,0,0,1,58.56,54H95.72a4.77,4.77,0,0,1,4.78,4.76V59a4.77,4.77,0,0,1-4.78,4.76H63.65V90.77H95.72a4.77,4.77,0,0,1,4.78,4.76v.21A4.77,4.77,0,0,1,95.72,100.5Z" />
						<rect class="cls-1" x="82.41" y="72.37" width="18.09" height="9.73" rx="4.87" />
						<path class="cls-1"
							d="M95.85,47H58.43a4.64,4.64,0,0,1-4.65-4.63V5.13A4.64,4.64,0,0,1,58.43.5H95.85a4.64,4.64,0,0,1,4.65,4.63V5.6a4.64,4.64,0,0,1-4.65,4.63H63.65V37.29h32.2a4.64,4.64,0,0,1,4.65,4.63v.47A4.64,4.64,0,0,1,95.85,47Z" />
						<path class="cls-1"
							d="M23.86,10.35A13.41,13.41,0,1,1,10.39,23.76,13.45,13.45,0,0,1,23.86,10.35m0-9.85A23.26,23.26,0,1,0,47.22,23.76,23.31,23.31,0,0,0,23.86.5Z" />
						<rect class="cls-1" x="29.13" y="72.37" width="18.09" height="9.73" rx="4.87" />
					</g>
				</g>
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