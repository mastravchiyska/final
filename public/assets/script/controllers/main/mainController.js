app.controller('MainController', ['$scope', 'MainService', function ($scope, MainService) {
    var sessionId = sessionStorage.getItem('session_id')
    $scope.createPost = function () {
        var postContent = document.getElementById("postText").value;
        MainService.createPost({ "userId": sessionId, "postContent": postContent }).then(function (result) {
            console.log(result);
        });
    };
    $scope.butName = name;
}]);