app.controller('accountInfoController', ['$scope', '$rootScope', '$routeParams', 'accountInfoService', 'friendRequestsService', 'friendListService', 'ErrorService',
    function ($scope, $rootScope, $routeParams, accountInfoService, friendRequestsService, friendListService, ErrorService) {
        var pageUserId = $routeParams.userId;
        var userData = JSON.parse(localStorage.getItem('user'));
        $scope.isMyProfile = userData._id == pageUserId;

        $rootScope.isMyProfile = userData._id == pageUserId;
        accountInfoService.showAccountInfo(pageUserId).then(function (result) {
            checkForFriend();
            $scope.user = result.data.data;
            $scope.$apply();
        }).catch(function(data) {
            ErrorService.processError(data);
        });

        accountInfoService.getUserPosts(pageUserId).then(function (result) {
            $scope.posts = result.data.data;
            $scope.$apply();
        }).catch(function(data) {
            ErrorService.processError(data);
        });

        $scope.addToFriends = function (friendId) {
            friendRequestsService.addToFriendList(friendId).then(function (result) {
            }).catch(function(data) {
                ErrorService.processError(data);
             });
        };

        $scope.removeFriend = function(friendId) {
            friendRequestsService.removeFromFriendList(friendId).then(function (result) {
                checkForFriend();
            }).catch(function(data) {
                ErrorService.processError(data);
            });
        };

        function checkForFriend() {
            friendListService.listFriends(userData._id).then(function(result) {
                var friendList = result.data.data;
                var inFriendList = friendList.find(element => element._id == pageUserId );
                if(inFriendList){
                   $scope.inFriends=true;
                } else {
                    $scope.inFriends=false;
                }
            }).catch(function(data) {
                ErrorService.processError(data);
            });
        }
    }]);