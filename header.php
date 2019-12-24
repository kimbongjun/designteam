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
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 304.09 305.42"><defs>
				<style>.cls-1{fill:none;stroke-miterlimit:10;stroke-width:0.75px;}</style>
				</defs><title>우당탕탕</title>
				<g id="" data-name="레이어 2">
					<g id="Layer_1" data-name="Layer 1">
						<path class="cls-1"
							d="M127.93,305.05H14.55A14.17,14.17,0,0,1,.38,290.87V177.49a14.17,14.17,0,0,1,14.17-14.18H127.93a14.18,14.18,0,0,1,14.18,14.18v1.31A14.18,14.18,0,0,1,127.93,193H30.33v82.42h97.6a14.18,14.18,0,0,1,14.18,14.18v1.3A14.18,14.18,0,0,1,127.93,305.05Z" />
						<path class="cls-1"
							d="M289.21,305.05H176.49A14.51,14.51,0,0,1,162,290.54V177.82a14.51,14.51,0,0,1,14.51-14.51H289.21a14.51,14.51,0,0,1,14.51,14.51v.64A14.51,14.51,0,0,1,289.21,193H191.94v82.42h97.27a14.51,14.51,0,0,1,14.51,14.51v.64A14.51,14.51,0,0,1,289.21,305.05Z" />
						<rect class="cls-1" x="248.84" y="219.35" width="54.87" height="29.65" rx="14.17" />
						<path class="cls-1"
							d="M289.61,142.11H176.09A14.11,14.11,0,0,1,162,128V14.48A14.1,14.1,0,0,1,176.09.38H289.61a14.1,14.1,0,0,1,14.11,14.1v1.45A14.1,14.1,0,0,1,289.61,30H191.94v82.42h97.67a14.11,14.11,0,0,1,14.11,14.11V128A14.11,14.11,0,0,1,289.61,142.11Z" />
						<path class="cls-1"
							d="M71.24,30.38A40.87,40.87,0,1,1,30.38,71.24,40.92,40.92,0,0,1,71.24,30.38m0-30a70.87,70.87,0,1,0,70.87,70.86A70.85,70.85,0,0,0,71.24.38Z" />
						<rect class="cls-1" x="87.23" y="219.35" width="54.87" height="29.65" rx="14.17" />
					</g>
				</g></svg>
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