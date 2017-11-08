app.controller('MainController', ['$scope', 'MainService', 'ErrorService', function ($scope, MainService, ErrorService) {
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
        }).catch(function(data) {
            ErrorService.processError(data);
        });
    }

}]);