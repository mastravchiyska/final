app.controller('updateAccountController', ['$scope', 'updateAccountService',
    function ($scope, updateAccountService) {
        var user = JSON.parse(localStorage.getItem("user"))
        $scope.updateForm = {
            id: '',
            name: '',
            lastname: '',
            email: '',
            password: '',
            birthday: '',
            sex: ''
        };
        $scope.updateForm.name = user.name;
        $scope.updateForm.lastname = user.lastname;
        $scope.updateForm.email = user.email;

        $scope.update = function () {
            var data = $scope.updateForm;
            data.id = user._id;
            data.sex = user.sex;
            updateAccountService.updateInfo(data).then(function (result) {
                console.log(result.d);
            })

        };
    }]);