'use strict';

angular.module('ca.directive.autoscroll',[])

.directive('autoScroll', function( $timeout, $q, $parse, $log ){

    return {
        restrict : 'A',
        link : function(scope, element, attributes) {

            if( element.css('overflow') !== 'auto' ) {
                return $log.warn('Element is not scrollable. Auto scroll has no sense!');
            }

            // user scope flag to enable/disable scrolling.
            // this will override the internal flag
            var externalAutoScroll = scope.$eval(attributes.autoScroll);

            // internal flag for autoscroll to be anabled or disabled
            var autoscroll = externalAutoScroll || true;

            // timer used to avoid trigger scroll event for multiple 
            // nodes added added on current frame

            var updateTimeout;

            var AutoScrollEvent = function(element) {
                
                var defaultPrevented = false;

                this.target = element;

                this.preventDefault = function(){
                    defaultPrevented = true;
                };

                this.isDefaultPrevented = function() {
                    return defaultPrevented;
                };
            };

            /**
             * Event to enable internal scrolling flag
             */
            scope.$on('$enableAutoScroll', function(){
                
                if(!autoscroll) {
                    $log.info('Enable autoscroll');
                }

                autoscroll=true;
            });

            /**
             * Event to enable internal scrolling flag
             */
            scope.$on('$disableAutoScroll', function(){
                
                if(autoscroll) {
                    $log.info('Disable autoscroll');
                }

                autoscroll=false;
            });

            /**
             * Listen for wheel events to disable autoscroll
             * when user scrolls up. The autoscrolling event 
             * will be enabled when scroll to bottom
             */
            element.on('wheel', function(event){

                var delta = event.originalEvent.detail? 
                            event.originalEvent.detail*(-120) : 
                            event.originalEvent.wheelDelta;
                
                if( delta > 0 ) {
                    autoscroll = false;
                    return;
                }

                if( element.get(0).scrollTop >= element.get(0).scrollHeight - element.height()) {
                    autoscroll = true;
                }
            });

            /**
             * Listen for all nodes added to this element
             * and on the next frame update mouse position
             */
            element.on('DOMNodeInserted', function( event ){

                var whatsNew = event.srcElement||event.target/*firefox*/;
                var container = event.delegateTarget;

                if( whatsNew.nodeType === 1 &&
                    autoscroll === true && 
                    externalAutoScroll === true)
                {
                    //cancel last update scroll position timeout
                    $timeout.cancel(updateTimeout);

                    //create new update scroll position timeout
                    updateTimeout = $timeout(function(){

                        //create event for auto-scroll-trigger parameter
                        var event = new AutoScrollEvent(element);
                        var locals = { $event : event };
                        
                        // fire callback
                        var fn = $parse(attributes.autoScrollTrigger)||angular.noop;
                        var promise = fn(scope, locals);

                        if( promise ) {
                            $q.when(promise).then(function(){
                                container.scrollTop = container.scrollHeight;
                            });
                        }

                        if(!event.isDefaultPrevented()) {
                            container.scrollTop = container.scrollHeight;
                        }
                    });
                }
            });
        }
    };
});