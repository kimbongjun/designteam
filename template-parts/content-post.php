<?php
?>
<section class="sub_header">	
	<header class="entry-header">				
		<h2 class="entry-title">
			블로그
		</h2>		
	</header><!-- .entry-header -->

</section>
<section class="sub_contents">
	<div class="container">	
		<div class="single-post-wrap">
			<h2>
				<?php echo get_the_title();?>
			</h2>	
		<?php the_content();?>

		</div>
	</div>	
</section>
