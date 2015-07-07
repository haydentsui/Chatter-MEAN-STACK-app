angular.module('example').controller('ExampleController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// Get the user's 'fullName' 
		$scope.name = Authentication.user ? Authentication.user.fullName : 'MEAN Application';
	}
]);
