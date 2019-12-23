<?php get_header();?>
<div id="barba-wrapper" data-barba="wrapper">
	<div class="barba-container" data-barba="container">
		<main id="main" class="site-page">
		<?php
		//while ( have_posts() ) :
			get_template_part( 'template-parts/content', 'category' );			
			// If comments are open or we have at least one comment, load up the comment template.
		

		//endwhile; // End of the loop.
		?>
		</main><!-- #main -->
	</div>
</div>  
<?php get_footer();?>