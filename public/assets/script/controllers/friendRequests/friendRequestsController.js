app.controller('friendRequestsController', ['$scope', 'friendRequestsService', 'ErrorService',
    function ($scope, friendRequestsService, ErrorService) {
        var user = JSON.parse(localStorage.getItem("user"))
        var userId = user._id;
        var counter = 0;

        function getRequests(){
            friendRequestsService.listRequests(userId).then(function (result) {
                $scope.requests = result.data.data;
                $scope.$apply();
            }).catch(function(data) {
                ErrorService.processError(data);
            });

        }

        this.$onInit = function () {
            getRequests();
        };

        $scope.acceptRequests = function (reqiuestId) {
            friendRequestsService.acceptRequest(reqiuestId).then(function (result) {
                getRequests();
            }).catch(function(data) {
                ErrorService.processError(data);
            });
        }

         $scope.declineRequests = function (reqiuestId) {
            friendRequestsService.removeRequest(reqiuestId).then(function (result) {
                console.log(reqiuestId);
                 $scope.$apply();
            }).catch(function(data) {
                ErrorService.processError(data);
            });
        }

    }]);
