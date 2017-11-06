app.controller('friendRequestsController', ['$scope', 'friendRequestsService',

    function ($scope, friendRequestsService) {

        var user = JSON.parse(localStorage.getItem("user"))
        var userId= user._id;
        friendRequestsService.listRequests(userId).then(function (result) {
            $scope.requests=result.data.data;
        });
        
    }]);