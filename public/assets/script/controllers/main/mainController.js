app.controller('MainController', ['$scope', 'MainService', function ($scope, MainService) {
    $scope.posts = [];
    $scope.postForm = {
        postContent: ''
    };

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