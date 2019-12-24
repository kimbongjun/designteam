<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package designteam
 */

?>
<section class="sub_header">	
	<header class="entry-header">
		<?php 		
		the_title( '<h2 class="entry-title">', '</h2>' ); 
		?>
	</header><!-- .entry-header -->

</section>
<section class="sub_contents">
	<div class="container">		
		<?php the_content();?>
	</div>	
</section>
