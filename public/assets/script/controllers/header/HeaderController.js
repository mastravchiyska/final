app.controller('HeaderController', ['$scope', '$window', '$location', 'HeaderService', 
function ($scope, $window, $location, HeaderService) {
    $scope.userData = {};
    $scope.isLogged = false;
    $scope.loginForm = {
        email: '',
        password: ''
    };

    if(localStorage.getItem('user') !== null) {
        $scope.isLogged = true;
        $scope.userData = JSON.parse(localStorage.getItem('user'));
        if($location.path() === '/') {
            $window.location.href = '/#/main-page';
        }
    } else {
        if($location.path() !== '/') {
            $window.location.href = '/#/';
        }
        $scope.isLogged = false;
    }

    $scope.loginSubmit = function() {
        var data = $scope.loginForm;
        HeaderService.login(data).then(function(result) {
            localStorage.setItem('user', JSON.stringify(result.data.data));
            $window.location.href = '/#/main-page';
        });
    };

    $scope.logout = function() {
        HeaderService.logout().then(function(){
            localStorage.removeItem('user');
             $window.location.href = '/#/';
        });
    };

}]);