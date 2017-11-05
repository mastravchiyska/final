var app = angular.module('tdApp', ['ngRoute']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'assets/script/controllers/home/home.htm',
                controller: 'HomeController'
            })
            .when('/main-page', {
                templateUrl: 'assets/script/controllers/main/main.htm',
                controller: 'MainController'
            });
    }]);