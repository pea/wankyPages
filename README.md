Wanky Pages
===========

Page switching management with 3D/2D CSS3 transition support.

Demo
====

http://demo.peterbailey.eu/wankyPages/example.php

See below for other animations.

Usage
=====

1. Add animations.css

    ```html

    <link rel="stylesheet" type="text/css" href="animations.css">

    ```

2. Add foundation styles for pages

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

3. Add Page markup

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

4. Add Javascript dependencies

    ```html

    <script src="jquery.js"></script>
    <script src="modernizr.custom.js"></script>
    <script src="wankypages.jquery.js"></script>

    ```

5. Load the plugin

    ```javascript

    $(document).ready(function(){

        $('#pages').wankyPages({

            selector_prefix   : 'wanky_',                             // Prefix to give all classes and ID's
            default_page      : 1,                                    // Default/ first page to load
            
            animation         : 'moveUnfoldTopBottom',                // Animation to used. Change to false to use overrides
            
            leftInAnimation   : 'pt-page-moveFromLeft',               // Override left-in animation
            leftOutAnimation  : 'pt-page-moveToRight',                // Override left-out animatino
            
            rightInAnimation  : 'pt-page-moveFromRight',              // Override right-in animation
            rightOutAnimation : 'pt-page-moveToLeft',                 // Override right-out animation
            
            onBeforeChange    : function(next_page, current_page){},  // Function to call before page changes
            onAfterChange     : function(){},                         // Function to call after page changes
            onBeforeLoad      : function(){},                         // Function to call before plugin loads
            onInterval        : function(current_page){}              // Function to call on page checking interval

        });

    });

    ```
    
Supported Animations
====================

- moveLeftRight (http://demo.peterbailey.eu/wankyPages/example.php?animation=moveLeftRight)
- foldLeftRight (http://demo.peterbailey.eu/wankyPages/example.php?animation=foldLeftRight)
- pushLeftRight (http://demo.peterbailey.eu/wankyPages/example.php?animation=pushLeftRight)
- foldTopBottom (http://demo.peterbailey.eu/wankyPages/example.php?animation=foldTopBottom)
- moveToLeftRightEasing (http://demo.peterbailey.eu/wankyPages/example.php?animation=moveToLeftRightEasing)
- scaleDown (http://demo.peterbailey.eu/wankyPages/example.php?animation=scaleDown)
- glueLeftRight (http://demo.peterbailey.eu/wankyPages/example.php?animation=glueLeftRight)
- glueTopBottom (http://demo.peterbailey.eu/wankyPages/example.php?animation=glueTopBottom)
- cubeLeftRight (http://demo.peterbailey.eu/wankyPages/example.php?animation=cubeLeftRight)
