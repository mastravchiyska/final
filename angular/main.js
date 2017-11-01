var app = angular.module('myApp', []);
app.controller('LoginController', function($scope, $http) {
    $http.get('localhost:4000/login').then(function(response) {
        $scope.user = response.data;
    });
});