<?php

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
                <a href="#" class="video_fullscreen">
                    <video id="myVideo" width="100%" controls>
                    <source src="<?php echo $image['url'];?>" type="video/mp4">
                    </video>
                </a>                
            <?php else:?>
            <a href="<?php echo $image['url']; ?>" rel="prettyPhoto">                    
                <img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" />
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