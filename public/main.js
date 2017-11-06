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
            .when('/account-info/:userId', {
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
<<<<<<< HEAD
            .when('/friend-requests', {
                templateUrl: 'assets/script/controllers/friendRequests/friendRequests.htm',
                controller: 'friendRequestsController'
            })
    }]);
=======
    }]);
/*
    .when('/friendProfile', {
                templateUrl: 'assets/script/controllers/friendProfile/friendProfile.htm',
                controller: 'friendProfileController'
            })*/
>>>>>>> d8be33fce8dfb8d317641af352f676c72da4ab27
