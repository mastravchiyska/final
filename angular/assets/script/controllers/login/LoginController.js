app.controller('LoginController', ['$scope', 'LoginService', function ($scope, LoginService) {
    $scope.user = '';
    
    $scope.login = function() {
        LoginService.login({ "email": "Doncho@mail.com", "password": "verySecure1!" }).then(function(result) {
            console.log(result.data);
        });
    };

}]);