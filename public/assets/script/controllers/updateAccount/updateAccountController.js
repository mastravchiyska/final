app.controller('updateAccountController', ['$scope', 'updateAccountService',
    function ($scope, updateAccountService) {
        $scope.updateForm = {
            id: '',
            name: '',
            lastname: '',
            email: '',
            password: '',
            birthday: '',
            sex: ''
        };


        $scope.update = function () {
            var user = JSON.parse(localStorage.getItem("user"))
            var data = $scope.updateForm;
            data.id = user._id;
            data.sex = user.sex;
            updateAccountService.updateInfo(data).then(function (result) {
                console.log(result.d);
            })
            
        };
    }]);