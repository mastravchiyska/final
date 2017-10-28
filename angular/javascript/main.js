var app = angular.module('myApp', []);
app.controller('userController', function($scope, $http) {
    $http.get('user').then(function(response) {
        $scope.user = response.data;
    });
});