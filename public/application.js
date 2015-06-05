var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName
   , ['ng-route', 'example']);

angular.element(document).ready(function() {
    angular.bootstrap(document, [mainApplicationModuleName]);

});

