// Create the 'chat' controller
angular.module('chat').controller('ChatController', ['$scope', 'Authentication','Socket', 
    function($scope, Authentication, Socket) {
    	// Create a messages array
        $scope.messages = [];
        $scope.css = "application";
        $scope.authentication = Authentication
        //$scope.autoScrollEnabled = true;
        // Add an event listener to the 'chatMessage' event
        Socket.on('chatMessage', function(message) {
            $scope.messages.push(message);
          //  $('#message-list').scrollTop = $('message-list').scrollHeight;
            //$('#message-list').animate({scrollTop: $('#message-list').prop("scrollHeight")}, 10000);
        });
        
        // Create a controller method for sending messages
        $scope.sendMessage = function() {
        	// Create a new message object
            var message = {
                text: this.messageText,
            };
            
            // Emit a 'chatMessage' message event
            Socket.emit('chatMessage', message);
            
            // Clear the message text
            this.messageText = '';
        }

        // Remove the event listener when the controller instance is destroyed
        $scope.$on('$destroy', function() {
            Socket.removeListener('chatMessage');
        })

    }
])
.directive('schrollBottom', function() {
    return {
        scope: {
            schrollBottom: "="
        },
        link: function(scope, element) {
            scope.$watchCollection('schrollBottom', function(newValue) {
                if(newValue)
                {
                    $(element).scrollTop($(element)[0].scrollHeight);
                }
            })
        }
    }
}); 
