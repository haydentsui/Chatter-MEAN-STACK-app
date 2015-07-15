// Configure the 'example' module routes
angular.module('example').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'example/views/example.client.view.html',
			css: ['https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css','styles/bootstrip.css']
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]);

