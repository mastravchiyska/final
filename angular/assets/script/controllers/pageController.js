var app = angular.module("myApp", ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "assets/script/views/main.htm"
        })
        .when("/accountDetails", {
            templateUrl: "assets/script/views/accountDetails.htm"
        })
        .when("/accountSetting", {
            templateUrl: "assets/script/views/accountSetting.htm"
        })
        .when("/pictureList", {
            templateUrl: "assets/script/views/pictureList.htm"
        })
        .when("/searchScreen", {
            templateUrl: "assets/script/views/searchScreen.htm"
        });
});