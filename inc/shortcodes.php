<?php
function loginPage(){
    ?>
    <div id="map" style="width:100%;height:400px;"></div>
    <script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=avjhn29rjv"></script>
    <script>
    //지도를 삽입할 HTML 요소 또는 HTML 요소의 id를 지정합니다.
    var mapDiv = document.getElementById('map'); // 'map'으로 선언해도 동일

    //옵션 없이 지도 객체를 생성하면 서울 시청을 중심으로 하는 11 레벨의 지도가 생성됩니다.
    var map = new naver.maps.Map('map',{
         useStyleMap: true,
          center: new naver.maps.LatLng(37.3595704, 127.105399),
          zoom: 10
    });
    //   var map = null;
    //   var maps = document.getElementById('map');
    //     function initMap() {
    //         map = new naver.maps.Map(maps, {
    //             center: new naver.maps.LatLng(37.3595704, 127.105399),
    //             zoom: 10
    //         });
    //     }
    </script>
   <?php 
}
add_shortcode('loginPage', 'loginPage');
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
                    <video id="myVideo" width="100%" controls <?php echo ($image['description'] ? 'poster='.$image['description']: '')?>>
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