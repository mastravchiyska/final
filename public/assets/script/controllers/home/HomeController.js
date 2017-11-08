app.controller('HomeController', ['$scope', '$window', 'HomeService','HeaderService', 'ErrorService',
 function ($scope, $window, HomeService, HeaderService, ErrorService) {
    $scope.registerForm = {
        name:'',
        lastname: '',
        email: '',
        password: '',
        birthday: '',
        sex: ''
    };

    $scope.register = function () {
        var user = $scope.registerForm;
        HomeService.register(user).then(function (result) {
            HeaderService.login({email: user.email, password: user.password}).then(function(result) {
            localStorage.setItem('user', JSON.stringify(result.data.data));
            $window.location.href = '/#/main-page';
        }).catch(function(data) {
            ErrorService.processError(data);
        });
        }).catch(function(data) {
            ErrorService.processError(data);
        });
    };
}]);