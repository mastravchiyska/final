app.controller('adController', ['$scope', 'adService', function ($scope, adService) {

    $scope.showDetails = function () {
        var sessionId = sessionStorage.getItem('session_id')

        LoginService.showDetails({ "_id": sessionId }).then(function (result) {

            // $scope.fname = result.data.data.name;
            console.log(result.data.data.name);
        });
    };
}]);