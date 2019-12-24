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
        $categories = get_the_category();
		echo '<h2>'.$categories[0]->name.'</h2>';
		?>
	</header><!-- .entry-header -->

</section>
<section class="sub_contents">
	<div class="container">	
        <?php			  
          global $post;
              $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
              $args = array(
                  'post_type' => 'post',
                  'orderby' => 'date',             
              );
              $the_query = new WP_Query($args);              
              if ( $the_query->have_posts() ) :
                ?>
                <div class="post-wrap">
                    <ul>
                    <?php                                              
					while ( $the_query->have_posts() ) : $the_query->the_post();
					$thumbnail = get_the_post_thumbnail( $post->ID, 'full' );
                    echo '<li>';
                        echo '<a href='.get_permalink().'>';
						echo '<figure class="post_thumbnail">';
						if($thumbnail):
						echo get_the_post_thumbnail( $post->ID, 'full' );
						else:
						echo '<img src="//placekitten.com/600/600">';
						endif;
						echo '<figcaption style="padding: 1rem;">';
						echo '<h4 class="post_desc" style="margin: 0 0 0.5rem;line-height: 1;">';
						echo get_the_title();                            
						echo '</h4>';
						$user_id = get_the_author_meta( 'ID' );
						echo '<p style="margin: 0;">지은이 : '.get_the_author_meta( 'display_name').'</p>';
						echo '</figcaption>';
						echo '</figure>';                        
                        echo '</a>';
                    echo '</li>';
					endwhile;																															
                    ?>
                    </ul>                   
                </div>
				<?php				
              endif;              
              ?>                     
                <!-- <?php
                    $GLOBALS['wp_query']->max_num_pages = $the_query->max_num_pages;
                    $args = array(       
                        'total' => $the_query->max_num_pages,       
                        'mid_size'           => 2,
                        'next_text' => 'Next',
                        'prev_text' => 'Prev',
                        'format'    => 'page/%#%/',                         
                    );
                    the_posts_pagination($args);
                ?>                              -->
              <?php
              wp_reset_query();
              wp_reset_postdata();              
            ?>			
	</div>	
</section>
