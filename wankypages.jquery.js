(function($){
 $.fn.wankyPages = function(options) {

    var defaults = {
        
        selector_prefix   : 'wanky_',                    // Prefix to give all classes and ID's
        default_page      : 1,                           // Default/ first page to load
        
        animation         : false,
        
        leftInAnimation   : 'pt-page-moveFromLeft',  // Class to apply to pages switching to moving left
        leftOutAnimation  : 'pt-page-moveToRight',   // Class to apply to pages switching from moving left
        
        rightInAnimation  : 'pt-page-moveFromRight', // Class to apply to pages switching to moving right
        rightOutAnimation : 'pt-page-moveToLeft'     // Class to apply to pages switching from moving right
        
    };
    var options = $.extend(defaults, options);

    return this.each(function() {
        
        var obj = $(this);
        
        /**
        * If URL hash set show that page, otherwise show first page
        */
    
        if(window.location.hash){
            obj.find('.' + options.selector_prefix + 'page[data-pageid="' + window.location.hash.substring(1) + '"]').addClass('' + options.selector_prefix + 'current_page');
        } else {
            obj.find('.' + options.selector_prefix + 'page[data-pageid="' + options.default_page + '"]').addClass('' + options.selector_prefix + 'current_page');
        }
        
        /**
        * Periodically check to see if window hash changed. If 
        * so switch page to that requested
        */
        
        setInterval(function(){
            
            if(window.location.hash == ''){
                var hash = options.default_page;
            } else {
                var hash = window.location.hash.substring(1);
            }
            
            if(hash != $('.' + options.selector_prefix + 'current_page').attr('data-pageid')){
                pages.switch_page(hash);
            }
            
        }, 100);


        /**
        * Pages
        * Handles page switching and management
        */
        
        
        var pages = {
            
            /**
            * Switch page
            * Changes page
            */
            
            
            switch_page: function(page_id){
                
                // Don't execute if currently switching
                
                if($('.' + options.selector_prefix + 'current_page').length == 2){ return; }
                
                // Events called after CSS animations ended
            
                var animEndEventNames = {
                    'WebkitAnimation': 'webkitAnimationEnd',
                    'OAnimation': 'oAnimationEnd',
                    'msAnimation': 'MSAnimationEnd',
                    'animation': 'animationend'
                }

                var animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ], support = Modernizr.cssanimations;
                
                // Get object of current page and requesting (next) page
                
                var current_page = $('.' + options.selector_prefix + 'current_page');
                var next_page = $('.' + options.selector_prefix + 'page[data-pageid="' + page_id + '"]');

                // Don't change page if requested page is current page
                
                if(current_page.attr('data-pageid') == page_id){ return; }
                
                // Get direction of navigation
                
                if((next_page.prevAll(current_page)).length == 0){
                    var direction = 'left';   
                } else {
                    var direction = 'right';  
                }
                
                var leftOutAnimation = null;
                var leftInAnimation = null;
                var rightOutAnimation = null;
                var rightInAnimation = null;

                switch(options.animation){
                                        
                    case 'moveLeftRight':
                        leftInAnimation   = 'pt-page-moveFromLeft';
                        leftOutAnimation  = 'pt-page-moveToRight';
                        rightInAnimation  = 'pt-page-moveFromRight';
                        rightOutAnimation = 'pt-page-moveToLeft'
                    break;
                    
                    case 'foldLeftRight':
                        leftInAnimation   = 'pt-page-moveFromLeftFade';
                        leftOutAnimation  = 'pt-page-rotateFoldRight';
                        rightInAnimation  = 'pt-page-moveFromRightFade';
                        rightOutAnimation = 'pt-page-rotateFoldLeft';
                    break;
                    
                    case 'pushLeftRight':
                        leftInAnimation   = 'pt-page-rotatePullLeft pt-page-delay180';
                        leftOutAnimation  = 'pt-page-rotatePushRight';
                        rightInAnimation  = 'pt-page-rotatePullRight pt-page-delay180';
                        rightOutAnimation = 'pt-page-rotatePushLeft';
                    break;
                    
                    case 'foldTopBottom':
                        leftInAnimation   = 'pt-page-moveFromTopFade';
                        leftOutAnimation  = 'pt-page-rotateFoldBottom';
                        rightInAnimation  = 'pt-page-moveFromBottomFade';
                        rightOutAnimation = 'pt-page-rotateFoldTop';
                    break;
                    
                    case 'moveToLeftRightFade':
                        leftInAnimation   = 'pt-page-rotateUnfoldBottom ';
                        leftOutAnimation  = 'pt-page-rotateUnfoldLeft';
                        rightInAnimation  = 'pt-page-rotateUnfoldBottom ';
                        rightOutAnimation = 'pt-page-rotateUnfoldRight';
                    break;
                    
                    default: 
                        leftOutAnimation = options.leftOutAnimation;
                        leftInAnimation = options.leftInAnimation;
                        rightOutAnimation = options.rightOutAnimation;
                        rightInAnimation = options.rightInAnimation;
                        
                }
              
                // Set animation classes
                
                if(direction == 'left'){
                    var out_classes = leftOutAnimation + ' ' + options.selector_prefix + ' ' + options.selector_prefix + 'current_page';
                    var in_classes  = leftInAnimation + ' ' + options.selector_prefix + 'current_page';
                } else {
                    var out_classes = rightOutAnimation + ' ' + options.selector_prefix + ' ' + options.selector_prefix + 'current_page';
                    var in_classes  = rightInAnimation + ' ' + options.selector_prefix + 'current_page';
                }
                
                // Apply out_classes to current page and remove when animation completed
                
                current_page.addClass(out_classes).removeClass(options.selector_prefix + 'page_top').on(animEndEventName, function() {
                    $(this).removeClass(out_classes)
                });
                
                // Apply in_classes to next page and remove when animation completed
                
                next_page.addClass(in_classes).on(animEndEventName, function() {
                    $(this).removeClass(in_classes).addClass(options.selector_prefix + 'current_page');
                });
                
            }
            
        }
        
    });

 };
})(jQuery);