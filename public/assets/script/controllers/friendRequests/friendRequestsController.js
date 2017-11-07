app.controller('friendRequestsController', ['$scope', 'friendRequestsService',
    function ($scope, friendRequestsService) {
        var user = JSON.parse(localStorage.getItem("user"))
        var userId = user._id;
        var counter = 0;
        friendRequestsService.listRequests(userId).then(function (result) {
            $scope.requests = result.data.data;
        });

        $scope.acceptRequests = function (friendId) {
            friendRequestsService.acceptRequest(friendId).then(function (result) {
                $scope.$apply();
            });
        }

         $scope.declineRequests = function (friendId) {
            friendRequestsService.removeRequest(friendId).then(function (result) {
                 $scope.$apply();
            });
        }

    }]);
