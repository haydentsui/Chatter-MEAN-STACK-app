# Angular AutoScroll Directive
This directive is used when you want to automatically move scroll to bottom when a dom child added. This fits best with a chat message listing where you want any time to be scrolled down while you write new messages. In order to use it just load module **ca.directive.autoscroll** and add directive to the messages container.

## Install it

```sh
bower install angular-ca-autoscroll --save
```

## Use it
```js
...
$scope.autoScrollEnabled = true;
...
```
```html
<div class="messages-container" auto-scroll="autoScrollEnabled"></div>
```
or with custom scroll widget:

```js
...
$scope.autoScrollEnabled = true;

$scope.onSendMessage = function() {
    // enable autoscrolling in case is disabled by user scroll up
    $scope.$emit('$enableAutoScroll');
};
$scope.onAutoScroll = function( event ) {
    // Use this callback if you want to update 
    // async or if you have custom scroll
    if(!customScrollLoaded)
    {
        var deferer = $q.defer();
        //when custom scroll loaded satisfy the promise
        customScroll.on('load', function(){
            deferer.resolve();
        });
        
        //wait until custom scroll loaded
        event.preventDefault();
        return deferer.promise;
    }
};
...
```

```html
<div auto-scroll="autoScrollEnabled" auto-scroll-trigger="onAutoScroll($event)"></div>
```