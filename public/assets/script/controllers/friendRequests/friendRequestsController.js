app.controller('friendRequestsController', ['$scope', 'friendRequestsService',

    function ($scope, friendRequestsService, ) {
        var targetId;
        var insertId;
        var user = JSON.parse(localStorage.getItem("user"))
        var userId = user._id;
        var counter = 0;
        friendRequestsService.listRequests(userId).then(function (result) {
            $scope.requests = result.data.data;
        });
        friendRequestsService.acceptRequest(friendId).then(function (result) {
            console.log(insertId);
        });
        // $scope.ShowId = function (event) {
        //     targetId = event.target.id - 1;
        //     insertId = $scope.requests[targetId]._id;
      
        // }


    }]);
