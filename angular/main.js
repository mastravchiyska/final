var app = angular.module('myApp', []);
app.controller('probaController', function($scope, $http) {
    $http.get('proba').then(function(response) {
        $scope.proba = response.data;
    });
});