app.controller('accountInfoController', ['$scope', '$rootScope', '$routeParams', 'accountInfoService', 'friendRequestsService', 'friendListService',
    function ($scope, $rootScope, $routeParams, accountInfoService, friendRequestsService, friendListService) {
        var pageUserId = $routeParams.userId;
        var userData = JSON.parse(localStorage.getItem('user'));
        $scope.isMyProfile = userData._id == pageUserId;

        $rootScope.isMyProfile = userData._id == pageUserId;
        accountInfoService.showAccountInfo(pageUserId).then(function (result) {
            checkForFriend();
            $scope.user = result.data.data;
            $scope.$apply();
        });

        accountInfoService.getUserPosts(pageUserId).then(function (result) {
            $scope.posts = result.data.data;
            $scope.$apply();
        });

        $scope.addToFriends = function (friendId) {
            friendRequestsService.addToFriendList(friendId).then(function (result) {
            });
        };

        $scope.removeFriend = function(friendId) {
            friendRequestsService.removeFromFriendList(friendId).then(function (result) {
                checkForFriend();
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
            });
        }
    }]);