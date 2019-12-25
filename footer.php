<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package designteam
 */

?>


	 <div id="transition_container">
        	<div class="transition_mask"></div>       
		</div><!-- #transition_container -->
		<div class="music">
		<?php
$file = get_field('udtt_music','option');
if( $file ):
    // Extract variables.
    $url = $file['url'];
?>
<?php endif; ?>
		</div>
	<!-- SCM Music Player http://scmplayer.co 
<script type="text/javascript" src="https://scmplayer.co/script.js" 
data-config="{'skin':'skins/simpleRed/skin.css','volume':50,'autoplay':true,'shuffle':false,'repeat':1,'placement':'bottom','showplaylist':false,'playlist':[{'title':'1','url':'https://www.youtube.com/watch?v=3Ygqs75NGew'}]}" ></script>
<!-- SCM Music Player script end -->


	<footer id="colophon" class="site-footer">
		<div class="site-info">				
			<div class="container">
				<address>
				Copyright ⓒ ㈜우당탕탕. All rights reserved.
				</address>
			</div>			
		</div><!-- .site-info -->
	</footer><!-- #colophon -->

<?php wp_footer(); ?>

</body>
</html>
