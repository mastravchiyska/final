app.controller('PostController', ['$scope', 'MainService', function ($scope, MainService) {
    $scope.postForm = {
        postContent: ''
    };

    $scope.createPost = function (data) {
        var text = $scope.postForm;
        MainService.createPost(text).then(function (result) {
            $scope.postForm.postContent = '';
        });
    };

}]);