app.controller('adController', ['$scope', 'adService', function ($scope, adService) {
    var sessionId = sessionStorage.getItem('session_id')

    $scope.showDetails = function () {
<<<<<<< HEAD
        adService.showDetails({ "_id": sessionId }).then(function (result) {
            console.log(result.data.data.name);
=======
        var sessionId = sessionStorage.getItem('session_id')

        adService.showDetails({ "_id": sessionId }).then(function (result) {

            // $scope.fname = result.data.data.name;
            console.log(result);
>>>>>>> 02cf0ad626d5a074a538ea00c52c343ab1a1cf13
        });
    };
}]);

