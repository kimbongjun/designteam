<?php
function udtt_gallery(){
        ob_start();
        ?>
        <?php
        $images = get_field('udtt_gallery', 'option');        
        if( $images ): 
        ?>
        <div class="grid fadeUp">
            <div class="grid-sizer"></div>
        <?php foreach( $images as $image ):                      

        $ext = array_pop(explode(".", strtolower($image['url'])));        
        ?>
        <div class="grid-item">
            <?php if($ext == 'mp4'):?>
                <a href="#" class="video_fullscreen fadeUp">
                    <video id="myVideo" width="100%" controls <?php echo ($image['description'] ? 'poster='.$image['description']: '')?>>
                        <source src="<?php echo $image['url'];?>" type="video/mp4">
                    </video>
                </a>                
            <?php else:?>
            <a href="<?php echo $image['url']; ?>" class="fadeUp" title="<?=$image['caption']?>" data-alt="<?=$image['alt']; ?>">
                <figure>
                    <img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" class="lazy"/>
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
        <script>
        (function ($) {
            $(function () {
                $('.grid-item').magnificPopup({
                    delegate: 'a:not(.video_fullscreen)',
                    type: 'image',
                    tLoading: 'Loading image #%curr%...',
                    mainClass: 'mfp-img-mobile',
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true,
                        preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                    },
                    image: {
                        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                        titleSrc: function (item) {
                            return item.el.attr('title') + '<small>' + item.el.attr('data-alt') + '</small>';
                        }
                    }
                });

            })
        })(jQuery)
        </script>
        <?php
        $output = ob_get_clean();
        return $output;
}
add_shortcode('udtt_gallery', 'udtt_gallery');