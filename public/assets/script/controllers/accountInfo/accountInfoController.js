app.controller('accountInfoController', ['$scope', 'accountInfoService',
    function ($scope, $window,$location, accountInfoService) {
        $scope.showAccountInfo = function () {
            $scope.user = JSON.parse(localStorage.getItem('user'));
            console.log($scope.user);
            accountInfoService.showAccountInfo($scope.user._id).then(function (result) {
                resolve(result);
            });
        };
    }]);