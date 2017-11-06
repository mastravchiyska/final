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
            })
            .when('/account-info', {
                templateUrl: 'assets/script/controllers/accountInfo/accountInfo.htm',
                controller: 'accountInfoController'
            })
            .when('/account-update', {
                templateUrl: 'assets/script/controllers/updateAccount/updateAccount.htm',
                controller: 'updateAccountController'
            })
            .when('/friendList', {
                templateUrl: 'assets/script/controllers/friendList/friendList.htm',
                controller: 'friendListController'
            })
            .when('/friend-requests', {
                templateUrl: 'assets/script/controllers/friendRequests/friendRequests.htm',
                controller: 'friendRequestsController'
            })
    }]);