app.controller('updateAccountController', ['$scope', '$window', 'updateAccountService', 'ErrorService',
    function ($scope, $window, updateAccountService, ErrorService) {
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
                $window.location.href = '/#/account-info/'+user._id;
            }).catch(function(data) {
                ErrorService.processError(data);
            });
        };
    }]);