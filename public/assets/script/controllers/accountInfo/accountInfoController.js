app.controller('accountInfoController', ['$scope', 'accountInfoService',
    function ($scope, accountInfoService) {

        $scope.user = JSON.parse(localStorage.getItem('user'));
        accountInfoService.showAccountInfo($scope.user._id).then(function (result) {
            console.log(result);
        });

    }]);