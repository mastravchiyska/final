app.controller('adController', ['$scope', 'adService', function ($scope, adService) {
    var sessionId = sessionStorage.getItem('session_id')

    $scope.showDetails = function () {
        adService.showDetails({ "_id": sessionId }).then(function (result) {
            console.log(result.data.data.name);
        });
    };
}]);

