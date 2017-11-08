app.controller('HeaderController', ['$scope', '$window', '$location', '$rootScope', 'HeaderService',
    function ($scope, $window, $location, $rootScope, HeaderService) {
        $scope.userData = {};
        $scope.search = {
            searchString: ''
        };
        $scope.isLogged = false;
        $scope.loginForm = {
            email: '',
            password: ''
        };

        if (localStorage.getItem('user') !== null) {
            $scope.isLogged = true;
            $scope.userData = JSON.parse(localStorage.getItem('user'));
            if ($location.path() === '/') {
                $window.location.href = '/#/main-page';
            }
        } else {
            if ($location.path() !== '/') {
                $window.location.href = '/#/';
            }
            $scope.isLogged = false;
        }

        $scope.loginSubmit = function () {
            var data = $scope.loginForm;
            HeaderService.login(data).then(function (result) {
                localStorage.setItem('user', JSON.stringify(result.data.data));
                $window.location.href = '/#/main-page';
            }).catch(function (err) {
                console.log(err);
            });
        };

        $scope.logout = function () {
            HeaderService.logout().then(function () {
                localStorage.removeItem('user');
                $window.location.href = '/#/';
            });
        };

        $scope.myFunct = function (keyEvent) {
            var data = $scope.search;
            if (keyEvent.which === 13) {
                HeaderService.search(data).then(function (result) {
                    $rootScope.searchResults = result.data.data;
                    $window.location.href = '/#/results-from-search';
                });
            }
        }
    }]);