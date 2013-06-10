Wanky Pages
===========

Fancy page transitions based on CSS from tympanus.net (http://tympanus.net/Development/PageTransitions).

Usage
=====

- [x] Add animations.css

```html

<link rel="stylesheet" type="text/css" href="animations.css">

```

- [x] Add foundation styles for pages

```css

.wanky_pages {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-perspective: 1200px;
    -moz-perspective: 1200px;
    perspective: 1200px;
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;
}

.wanky_page {
    -webkit-animation-duration: 2s;
    -moz-animation-duration: 2s;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
    overflow: auto;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}

.wanky_current_page {
    visibility: visible;
}

.wanky_page_top {
    z-index: 4;
}

```

- [x] Add Page markup

```html

<div id="pages" class="wanky_pages">

    <div class="wanky_page" data-pageid="1">
        <h1>Page 1</h1>
        <a href="#2">Next</a>
    </div>
    
    <div class="wanky_page" data-pageid="2">
        <h1>Page 2</h2>
        <a href="#3">Next</a>
    </div>
    
    <div class="wanky_page" data-pageid="3">
        <h1>Page 3</h1>
        <a href="#1">Next</a>
    </div>

</div>

```

- [x] Add Javascript dependencies

```html

<script src="jquery.js"></script>
<script src="modernizr.custom.js"></script>
<script src="wankypages.jquery.js"></script>

```

- [x] Load the plugin

```javascript

$(document).ready(function(){

    $('#pages').wankyPages({
        selector_prefix   : 'wanky_',                // Prefix to give all classes and ID's (apart from animations)
        default_page      : '1',                     // Default/ first page to load
        animation         : 'foldLeftRight'          // Animation type
    });

});

```