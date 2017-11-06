app.controller('MainController', ['$scope', '$rootScope', 'MainService', function ($scope, $rootScope, MainService) {
    $scope.posts = [];
    $scope.postForm = {
        postContent: ''
    };

    if ($rootScope.isMyProfile === undefined) {
        $scope.isMyProfile = true;
    } else {
        $scope.isMyProfile = $rootScope.isMyProfile;
    }

    console.log($scope.isMyProfile);
    this.$onInit = function () {
        getPosts();
    };

    $scope.createPost = function (data) {
        var text = $scope.postForm;
        MainService.createPost(text).then(function (result) {
            getPosts();
            $scope.postForm.postContent = '';
        });
    };

    function getPosts() {
        MainService.listFriendsPosts().then(function (result) {
            $scope.posts = result.data.data;
            $scope.$apply();
        });
    }

}]);