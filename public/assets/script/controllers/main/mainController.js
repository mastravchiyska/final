app.controller('MainController', ['$scope', 'MainService', function ($scope, MainService) {

    $scope.postForm = {
        postContent: ''
    };

    $scope.createPost = function (data) {
        var text = $scope.postForm;
        MainService.createPost(text).then(function (result) {
            console.log(text)
            // MainService.listPosts().then(function (result) {
            //     $scope.posts = result.data.data;
            //});
            $scope.posts.push(result.data);
        });
    };


    MainService.listPosts().then(function (result) {
        $scope.posts = result.data.data;
    });


}]);