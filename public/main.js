if (sessionStorage.length == 0) {
    var app = angular.module('tdApp', ['ngRoute',]).
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
                    controller: 'MainController'
                })
                .when('/accDetails', {
                    templateUrl: 'assets/script/controllers/accDetails/accountDetails.htm',
                    controller: 'adController'
                })
                .when('/accSettings', {
                    templateUrl: 'assets/script/controllers/accSettings/accountSettings.htm',
                    controller: 'asController'
                })
                .when('/pictureList', {
                    templateUrl: 'assets/script/controllers/pictureList/pictureList.htm',
                    controller: 'plistController'
                })
                .when('/search', {
                    templateUrl: 'assets/script/controllers/search/search.htm',
                    controller: 'searchController'
                });
        }]);
}


