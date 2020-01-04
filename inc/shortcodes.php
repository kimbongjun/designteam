<?php
function roulette(){
    ob_start();
    ?>
    <form id="myForm" action="/" onSubmit="return false">
        <input type="text" name="address" maxlength="5" placeholder="메뉴 또는 음식점 (6글자만 써요)">
        <input type="submit" value="메뉴 추천하기">
    </form>
    <br/>    
    <div id="wheel">
       <canvas height="600" id="canvas" width="800"></canvas>
    </div>
    <div id="counter"></div>
    <script type=text/javascript>
    // Helpers
	shuffle = function(o) {
		for ( var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
			;
		return o;
	};

	String.prototype.hashCode = function(){
		// See http://www.cse.yorku.ca/~oz/hash.html		
		var hash = 5381;
		for (i = 0; i < this.length; i++) {
			char = this.charCodeAt(i);
			hash = ((hash<<5)+hash) + char;
			hash = hash & hash; // Convert to 32bit integer
		}
		return hash;
	}

	Number.prototype.mod = function(n) {
		return ((this%n)+n)%n;
	}
</script>
<script type=text/javascript>
(function($){
    //////////////////////////////    
    var wheel = {

        timerHandle: 0,
        timerDelay: 33,

        angleCurrent: 0,
        angleDelta: 0,

        size: 290,

        canvasContext: null,

        colors: ["#63b598", "#ce7d78", "#ea9e70", "#a48a9e", "#c6e1e8", "#648177" ,"#0d5ac1" ,
"#f205e6" ,"#1c0365" ,"#14a9ad" ,"#4ca2f9" ,"#a4e43f" ,"#d298e2" ,"#6119d0",
"#d2737d" ,"#c0a43c" ,"#f2510e" ,"#651be6" ,"#79806e" ,"#61da5e" ,"#cd2f00" ,
"#9348af" ,"#01ac53" ,"#c5a4fb" ,"#996635","#b11573" ,"#4bb473" ,"#75d89e" ,
"#2f3f94" ,"#2f7b99" ,"#da967d" ,"#34891f" ,"#b0d87b" ,"#ca4751" ,"#7e50a8" ,
"#c4d647" ,"#e0eeb8" ,"#11dec1" ,"#289812" ,"#566ca0" ,"#ffdbe1" ,"#2f1179" ,
"#935b6d" ,"#916988" ,"#513d98" ,"#aead3a", "#9e6d71", "#4b5bdc", "#0cd36d",
"#250662", "#cb5bea", "#228916", "#ac3e1b", "#df514a", "#539397", "#880977",
"#f697c1", "#ba96ce", "#679c9d", "#c6c42c", "#5d2c52", "#48b41b", "#e1cf3b",
"#5be4f0", "#57c4d8", "#a4d17a", "#225b8", "#be608b", "#96b00c", "#088baf",
"#f158bf", "#e145ba", "#ee91e3", "#05d371", "#5426e0", "#4834d0", "#802234",
"#6749e8", "#0971f0", "#8fb413", "#b2b4f0", "#c3c89d", "#c9a941", "#41d158",
"#fb21a3", "#51aed9", "#5bb32d", "#807fb", "#21538e", "#89d534", "#d36647",
"#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3",
"#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec",
"#1bb699", "#6b2e5f", "#64820f", "#1c271", "#21538e", "#89d534", "#d36647",
"#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3",
"#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec",
"#1bb699", "#6b2e5f", "#64820f", "#1c271", "#9cb64a", "#996c48", "#9ab9b7",
"#06e052", "#e3a481", "#0eb621", "#fc458e", "#b2db15", "#aa226d", "#792ed8",
"#73872a", "#520d3a", "#cefcb8", "#a5b3d9", "#7d1d85", "#c4fd57", "#f1ae16",
"#8fe22a", "#ef6e3c", "#243eeb", "#1dc18", "#dd93fd", "#3f8473", "#e7dbce",
"#421f79", "#7a3d93", "#635f6d", "#93f2d7", "#9b5c2a", "#15b9ee", "#0f5997",
"#409188", "#911e20", "#1350ce", "#10e5b1", "#fff4d7", "#cb2582", "#ce00be",
"#32d5d6", "#17232", "#608572", "#c79bc2", "#00f87c", "#77772a", "#6995ba",
"#fc6b57", "#f07815", "#8fd883", "#060e27", "#96e591", "#21d52e", "#d00043",
"#b47162", "#1ec227", "#4f0f6f", "#1d1d58", "#947002", "#bde052", "#e08c56",
"#28fcfd", "#bb09b", "#36486a", "#d02e29", "#1ae6db", "#3e464c", "#a84a8f",
"#911e7e", "#3f16d9", "#0f525f", "#ac7c0a", "#b4c086", "#c9d730", "#30cc49",
"#3d6751", "#fb4c03", "#640fc1", "#62c03e", "#d3493a", "#88aa0b", "#406df9",
"#615af0", "#4be47", "#2a3434", "#4a543f", "#79bca0", "#a8b8d4", "#00efd4",
"#7ad236", "#7260d8", "#1deaa7", "#06f43a", "#823c59", "#e3d94c", "#dc1c06",
"#f53b2a", "#b46238", "#2dfff6", "#a82b89", "#1a8011", "#436a9f", "#1a806a",
"#4cf09d", "#c188a2", "#67eb4b", "#b308d3", "#fc7e41", "#af3101", "#ff065",
"#71b1f4", "#a2f8a5", "#e23dd0", "#d3486d", "#00f7f9", "#474893", "#3cec35",
"#1c65cb", "#5d1d0c", "#2d7d2a", "#ff3420", "#5cdd87", "#a259a4", "#e4ac44",
"#1bede6", "#8798a4", "#d7790f", "#b2c24f", "#de73c2", "#d70a9c", "#25b67",
"#88e9b8", "#c2b0e2", "#86e98f", "#ae90e2", "#1a806b", "#436a9e", "#0ec0ff",
"#f812b3", "#b17fc9", "#8d6c2f", "#d3277a", "#2ca1ae", "#9685eb", "#8a96c6",
"#dba2e6", "#76fc1b", "#608fa4", "#20f6ba", "#07d7f6", "#dce77a", "#77ecca"
        ],

        //segments : [ 'Andrew', 'Bob', 'Fred', 'John', 'China', 'Steve', 'Jim', 'Sally', 'Andrew', 'Bob', 'Fred', 'John', 'China', 'Steve', 'Jim'],
        segments: [],

        seg_colors: [], // Cache of segments to colors

        maxSpeed: Math.PI / 16,

        upTime: 1000, // How long to spin up for (in ms)
        downTime: 17000, // How long to slow down for (in ms)

        spinStart: 0,

        frames: 0,
        maxLength : 0,

        centerX: 300,
        centerY: 300,

        handleInsert : function(){
            document.getElementById("myForm").onsubmit = function(e) { 
                var values = $("input[name='address']").val();           
                $("input[name='address']").focus();     
                var inputs = $("input[name='address']");    
                e.target.reset();  
                var venueContainer = $('#venues ul');      
                //var cbox = $(this)[0];
                //console.log(cbox);
                var segments = wheel.segments;
                var i = segments.indexOf(values);


                if(values != ''){
                    segments.push(values);
                }               
                segments.sort();
                wheel.update();          
                wheel.maxLength = segments.length;
                return false;
            };                          
        },
        spin: function () {               
            // Start the wheel only if it's not already spinning                        
            if (wheel.timerHandle == 0 && wheel.maxLength != 0) {
                wheel.spinStart = new Date().getTime();
                wheel.maxSpeed = Math.PI / (16 + Math.random()); // Randomly vary how hard the spin is
                wheel.frames = 0;
                wheel.sound.play();

                wheel.timerHandle = setInterval(wheel.onTimerTick, wheel.timerDelay);
            }else{
                alert("밥 먹기 싫어요?");
            }
        },
        initAudio : function() {
			var sound = document.createElement('audio');
			sound.setAttribute('src', '/wp-content/themes/designteam/resources/assets/mp3/If_I_Had_a_Chicken.mp3');
			wheel.sound = sound;
		},
        onTimerTick: function () {                       
            wheel.frames++;

            wheel.draw();

            var duration = (new Date().getTime() - wheel.spinStart);
            var progress = 0;
            var finished = false;

            if (duration < wheel.upTime) {
                progress = duration / wheel.upTime;
                wheel.angleDelta = wheel.maxSpeed *
                    Math.sin(progress * Math.PI / 2);
            } else {
                progress = duration / wheel.downTime;
                wheel.angleDelta = wheel.maxSpeed *
                    Math.sin(progress * Math.PI / 2 + Math.PI / 2);
                if (progress >= 1)
                    finished = true;
            }

            wheel.angleCurrent += wheel.angleDelta;
            while (wheel.angleCurrent >= Math.PI * 2)
                // Keep the angle in a reasonable range
                wheel.angleCurrent -= Math.PI * 2;

            if (finished) {
                clearInterval(wheel.timerHandle);
                wheel.timerHandle = 0;
                wheel.angleDelta = 0;      
                wheel.sound.pause();               
                var i = wheel.segments.length - Math.floor((wheel.angleCurrent / (Math.PI * 2)) * wheel.segments.length) - 1;            
                if(wheel.segments[i] == '그냥 굶는다.'){
                    $("#counter").html('<h2 style="margin-top: 1rem; text-align: center;">'+ '저녁엔 꼭 먹도록 해요^^' + '</h2>');
                }else{
                    $("#counter").html('<h2 style="margin-top: 1rem; text-align: center;">'+ '무적권&nbsp;"' + wheel.segments[i] + '"&nbsp;갑시다 ㅇㅈ?' + '</h2>');                    
                }
            }

            /*
            // Display RPM
            var rpm = (wheel.angleDelta * (1000 / wheel.timerDelay) * 60) / (Math.PI * 2);
            $("#counter").html( Math.round(rpm) + " RPM" 
            );*/
           
        },

        init: function (optionList) {            
            try {
                wheel.initWheel();
                wheel.initAudio();                                   
                wheel.initCanvas();
                wheel.draw();
                wheel.handleInsert();                                
                $.extend(wheel, optionList);

            } catch (exceptionData) {
                alert('Wheel is not loaded ' + exceptionData);
            }

        },

        initCanvas: function () {            
            var canvas = $('#wheel #canvas').get(0);            
            if ($.browser.msie) {
                canvas = document.createElement('canvas');
                $(canvas).attr('width', 800).attr('height', 600).attr('id', 'canvas').appendTo('.wheel');
                canvas = G_vmlCanvasManager.initElement(canvas);
            }        
            canvas.addEventListener("click", wheel.spin, false);            
            wheel.canvasContext = canvas.getContext("2d");            
        },

        initWheel: function () {
            shuffle(wheel.colors);
        },

        // Called when segments have changed
        update: function () {
            // Ensure we start mid way on a item
            //var r = Math.floor(Math.random() * wheel.segments.length);
            var r = 0;
            wheel.angleCurrent = ((r + 0.5) / wheel.segments.length) * Math.PI * 2;

            var segments = wheel.segments;
            var len = segments.length;
            var colors = wheel.colors;
            var colorLen = colors.length;

            // Generate a color cache (so we have consistant coloring)
            var seg_color = new Array();
            for (var i = 0; i < len; i++)
                seg_color.push(colors[segments[i].hashCode().mod(colorLen)]);

            wheel.seg_color = seg_color;

            wheel.draw();
        },

        draw: function () {
            wheel.clear();
            wheel.drawWheel();
            wheel.drawNeedle();
        },

        clear: function () {
            var ctx = wheel.canvasContext;
            ctx.clearRect(0, 0, 1000, 800);
        },

        drawNeedle: function () {
            var ctx = wheel.canvasContext;
            var centerX = wheel.centerX;
            var centerY = wheel.centerY;
            var size = wheel.size;

            ctx.lineWidth = 1;
            ctx.strokeStyle = '#000000';
            ctx.fileStyle = '#ffffff';

            ctx.beginPath();

            ctx.moveTo(centerX + size - 40, centerY);
            ctx.lineTo(centerX + size + 20, centerY - 10);
            ctx.lineTo(centerX + size + 20, centerY + 10);
            ctx.closePath();

            ctx.stroke();
            ctx.fill();

            // Which segment is being pointed to?
            var i = wheel.segments.length - Math.floor((wheel.angleCurrent / (Math.PI * 2)) * wheel.segments.length) - 1;

            // Now draw the winning name
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillStyle = '#000000';
            ctx.font = "2em BMEULJIRO";
            ctx.fillText(wheel.segments[i], centerX + size + 25, centerY);                      
        },

        drawSegment: function (key, lastAngle, angle) {
            var ctx = wheel.canvasContext;
            var centerX = wheel.centerX;
            var centerY = wheel.centerY;
            var size = wheel.size;

            var segments = wheel.segments;
            var len = wheel.segments.length;
            var colors = wheel.seg_color;

            var value = segments[key];

            ctx.save();
            ctx.beginPath();

            // Start in the centre
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, size, lastAngle, angle, false); // Draw a arc around the edge
            ctx.lineTo(centerX, centerY); // Now draw a line back to the centre

            // Clip anything that follows to this area
            //ctx.clip(); // It would be best to clip, but we can double performance without it
            ctx.closePath();

            ctx.fillStyle = colors[key];
            ctx.fill();
            ctx.stroke();

            // Now draw the text
            ctx.save(); // The save ensures this works on Android devices
            ctx.translate(centerX, centerY);
            ctx.rotate((lastAngle + angle) / 2);

            ctx.fillStyle = '#000000';
            ctx.fillText(value.substr(0, 20), size / 2 + 20, 0);
            ctx.restore();

            ctx.restore();
        },

        drawWheel: function () {
            var ctx = wheel.canvasContext;

            var angleCurrent = wheel.angleCurrent;
            var lastAngle = angleCurrent;

            var segments = wheel.segments;
            var len = wheel.segments.length;
            var colors = wheel.colors;
            var colorsLen = wheel.colors.length;

            var centerX = wheel.centerX;
            var centerY = wheel.centerY;
            var size = wheel.size;

            var PI2 = Math.PI * 2;

            ctx.lineWidth = 1;
            ctx.strokeStyle = '#000000';
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.font = "1.4em BMEULJIRO";

            for (var i = 1; i <= len; i++) {
                var angle = PI2 * (i / len) + angleCurrent;
                wheel.drawSegment(i - 1, lastAngle, angle);
                lastAngle = angle;
            }
            // Draw a center circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, 20, 0, PI2, false);
            ctx.closePath();

            ctx.fillStyle = '#ffffff';
            //ctx.strokeStyle = '#000000';
            ctx.fill();
            ctx.stroke();

            // Draw outer circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, size, 0, PI2, false);
            ctx.closePath();

            ctx.lineWidth = 10;
            ctx.strokeStyle = '#000000';
            ctx.stroke();
        },
    }

window.onload = function() {
    wheel.init();    
    var segments = new Array();    
    var comment = "그냥 굶는다.";
    segments.push(comment);
    wheel.segments = segments;
    wheel.update();        

    // Hide the address bar (for mobile devices)!
    setTimeout(function() {
        window.scrollTo(0, 1);
    }, 0);
}    
})(jQuery)
</script>
<script src="https://blog.bramp.net/wheel/jquery.tinysort.min.js" type="text/javascript"></script>
    <?php
    return ob_get_clean();
}
add_shortcode('roulette', 'roulette');

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