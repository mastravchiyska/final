app.controller('friendProfileController', ['$scope', 'friendProfileService',
    function ($scope, friendProfileService) {
        $scope.friend = {
            name: 'Petar',
            lastname : 'Peev',
            email: 'peev@gmail.com',
            birthday: '09.05.1995',
            sex: 'male'
        }
        // friendProfileService.viewProfile().then(function (result) {
        //     $scope.friends=result.data.data;
        // });
        
    }]);