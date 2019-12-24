<?php
function artboard(){
    ob_start();
    ?>
  
    
    <?php
    $output = ob_get_clean();
    return $output;
}
add_shortcode('artboard', 'artboard');
function udtt_gallery(){
        ob_start();
        ?>
        <?php
        $images = get_field('udtt_gallery', 'option');        
        if( $images ): 
        ?>
        <div class="grid">
            <div class="grid-sizer"></div>
        <?php foreach( $images as $image ):                      

        $ext = array_pop(explode(".", strtolower($image['url'])));        
        ?>
        <div class="grid-item">
            <?php if($ext == 'mp4'):?>
                <a href="#" class="video_fullscreen fadeUp">
                    <video id="myVideo" width="100%" controls>
                        <source src="<?php echo $image['url'];?>" type="video/mp4">
                    </video>
                </a>                
            <?php else:?>
            <a href="<?php echo $image['url']; ?>" rel="prettyPhoto[pp_gal]" class="fadeUp">                 
                <figure>
                    <img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" />
                </figure>                
                <?php
                    if($image['caption'] || $image['alt']):
                        ?>
                        <div class="description">
                            <?php if($image['caption']):?>
                            <p>작품명 : <?php echo $image['caption']; ?></p>                        
                            <?php endif;?>
                            <?php if($image['alt']):?>
                            <p>작가 : <?php echo $image['alt']; ?></p>                    
                            <?php endif;?>
                        </div>
                        <?php
                    endif;
                ?>                
            </a>
            <?php endif;?>                    
        </div>
        <?php endforeach; ?>
        </div>
        <?php endif;?>
        <?php
        $output = ob_get_clean();
        return $output;
}
add_shortcode('udtt_gallery', 'udtt_gallery');