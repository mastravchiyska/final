var app = angular.module('tdApp', ['ngRoute']).
config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'assets/script/controllers/login/login.htm',
            controller: 'LoginController'
        });
        /*.when('/accountDetails', {
            templateUrl: 'assets/script/views/accountDetails.htm'
        })
        .when('/accountSetting', {
            templateUrl: 'assets/script/views/accountSetting.htm'
        })
        .when('/pictureList', {
            templateUrl: 'assets/script/views/pictureList.htm'
        })
        .when('/searchScreen', {
            templateUrl: 'assets/script/views/searchScreen.htm'
        });*/
}]);
