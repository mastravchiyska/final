app.controller('accountInfoController', ['$scope', '$routeParams', 'accountInfoService',
    function ($scope, $routeParams, accountInfoService) {
        var pageUserId = $routeParams.userId;
        var userData = JSON.parse(localStorage.getItem('user'));
        $scope.isMyProfile = userData._id == pageUserId;

        console.log('isMyProfile', $scope.isMyProfile);

        accountInfoService.showAccountInfo(pageUserId).then(function (result) {
            $scope.user = result.data.data;
            $scope.$apply();
        });
        
        accountInfoService.getUserPosts(pageUserId).then(function (result) {
            $scope.posts = result.data.data;
            $scope.$apply();
        });
    }]);