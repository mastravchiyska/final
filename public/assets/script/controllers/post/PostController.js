app.controller('PostController', ['$scope', 'PostService',
    function ($scope, PostService) {
        $scope.postForm = {
            postContent: ''
        };

        $scope.createPost = function(data){
            var text = $scope.postForm;
            PostService.createPost(text).then(function(result) {
                console.log(result.data)
            });
        }
    }]);