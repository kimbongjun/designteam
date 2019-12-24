<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package designteam
 */

get_header();
?>
<div id="barba-wrapper" data-barba="wrapper">
	<div class="barba-container" data-barba="container">
		<main id="main" class="site-page site-single">
		<?php
		while ( have_posts() ) :
			the_post();

			get_template_part( 'template-parts/content', get_post_type() );
			//the_post_navigation();
	
		endwhile; // End of the loop.
		
		?>
		</main><!-- #main -->
	</div>
</div>   
<?php
get_footer();
