app.controller('LoginController', function ($scope, LoginService) {
    LoginService.login().then(function (res) {
        $scope.user = res.data;
    });
});