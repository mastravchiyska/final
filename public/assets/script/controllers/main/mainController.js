app.controller('MainController', ['$scope', 'MainService', function ($scope, MainService) {
    $scope.posts = [];
    $scope.postForm = {
        postContent: ''
    };
    $scope.mainPage = true;
    
    this.$onInit = function () {
        getPosts();
    };

    function getPosts() {
        MainService.listFriendsPosts().then(function (result) {
            $scope.posts = result.data.data;
            $scope.$apply();
        });
    }

}]);