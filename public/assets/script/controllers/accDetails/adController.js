app.controller('adController', ['$scope', 'adService', function ($scope, adService) {
    var users = JSON.parse(localStorage.getItem('testObject'));
    $scope.fname = users.name;
    $scope.showDetails = function () {
        var sessionId = sessionStorage.getItem('session_id')

        adService.showDetails({ "_id": sessionId }).then(function (result) {
           
            console.log(fname)

        });
    };
}]);