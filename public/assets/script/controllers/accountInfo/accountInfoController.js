app.controller('accountInfoController', ['$scope', '$rootScope', '$routeParams', 'accountInfoService',
    function ($scope, $rootScope, $routeParams, accountInfoService) {
        var pageUserId = $routeParams.userId;
        var userData = JSON.parse(localStorage.getItem('user'));
        $scope.isMyProfile = userData._id == pageUserId;

        $rootScope.isMyProfile = userData._id == pageUserId;
        console.log( $scope.isMyProfile);
        accountInfoService.showAccountInfo(pageUserId).then(function (result) {
            console.log(pageUserId);
            $scope.user = result.data.data;
            $scope.$apply();
        });

        accountInfoService.getUserPosts(pageUserId).then(function (result) {
             console.log(pageUserId);
            $scope.posts = result.data.data;
            $scope.$apply();
        });

    }]);