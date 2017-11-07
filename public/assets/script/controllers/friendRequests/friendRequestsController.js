app.controller('friendRequestsController', ['$scope', 'friendRequestsService',

    function ($scope, friendRequestsService, ) {
        var targetId;
        var insertId;
        var user = JSON.parse(localStorage.getItem("user"))
        var userId = user._id;
        var counter = 0;
        friendRequestsService.listRequests(userId).then(function (result) {
            console.log(result.data.data)
            $scope.requests = result.data.data;
        });

        $scope.ShowId = function (friendId) {
            console.log(friendId);
            friendRequestsService.acceptRequest(friendId).then(function (result) {
                console.log(result);
            });
        }


    }]);
