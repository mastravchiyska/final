if (sessionStorage.length == 0) {
    var app = angular.module('tdApp', ['ngRoute']).
        config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'assets/script/controllers/login/login.htm',
                    controller: 'LoginController'
                });
        }]);
    
} else {
    var app = angular.module('tdApp', ['ngRoute']).
        config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'assets/script/controllers/main/main.htm',
                    controller: 'mainController'
                });
        }]);
}


