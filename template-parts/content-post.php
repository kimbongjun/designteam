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
		<!-- 라이브리 시티 설치 코드 -->
		<div id="lv-container" data-id="city" data-uid="MTAyMC80ODAzMy8yNDUzMA==">
			<script type="text/javascript">
		var refer = "<?=get_permalink($id);?>".replace("http://","");
		(function(d, s) {
			var j, e = d.getElementsByTagName(s)[0];

			if (typeof LivereTower === 'function') { return; }

			j = d.createElement(s);
			j.src = 'https://cdn-city.livere.com/js/embed.dist.js';
			j.async = true;

			e.parentNode.insertBefore(j, e);
		})(document, 'script');
			</script>
		<noscript> 라이브리 댓글 작성을 위해 JavaScript를 활성화 해주세요</noscript>
		</div>
<!-- 시티 설치 코드 끝 -->		
		</div>		
	</div>	
</section>
