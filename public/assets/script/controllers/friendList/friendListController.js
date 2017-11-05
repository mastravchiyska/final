app.controller('friendListController', ['$scope', 'friendListService',

    function ($scope, friendListService) {

        var user = JSON.parse(localStorage.getItem("user"))
        var userId= user._id;
        friendListService.listFriends(userId).then(function (result) {
            $scope.friends=result.data.data;
        });
        
    }]);