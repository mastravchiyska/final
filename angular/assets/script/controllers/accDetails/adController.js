app.controller('adController', ['$scope', 'adService', function ($scope, adService) {

    $scope.showDetails = function () {

        LoginService.getInfo({ "email": "Doncho@mail.com", "password": "verySecure1!" }).then(function (result) {
            sessionStorage.setItem('session_id', result.data.data._id);
            $scope.fname = result.data.data.name;
            location.reload();
        });
    };
}]);