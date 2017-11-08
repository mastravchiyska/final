app.controller('friendListController', ['$scope', 'friendListService', 'ErrorService',

    function ($scope, friendListService, ErrorService) {

        var user = JSON.parse(localStorage.getItem("user"))
        var userId= user._id;
        friendListService.listFriends(userId).then(function (result) {
            $scope.friends=result.data.data;
        }).catch(function(data) {
            ErrorService.processError(data);
        });

    }]);