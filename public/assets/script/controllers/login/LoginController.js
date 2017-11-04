app.controller('LoginController', ['$scope', 'LoginService', function ($scope, LoginService) {
    $scope.user = '';
    document.getElementById('header1').style.display = "none";

    $scope.login = function () {

        var email = document.getElementById("loginemail").value;
        var pass = document.getElementById("loginpass").value;
        LoginService.login({ "email": "Doncho@mail.com", "password": "verySecure1!" }).then(function (result) {
            sessionStorage.setItem('session_id', result.data.data._id);
            localStorage.setItem('testObject', JSON.stringify(result.data.data));
            location.reload();
        });
    
    };


    $scope.register = function () {
        var name = document.getElementById("name").value;
        var lastname = document.getElementById("lastname").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var birthday = document.getElementById("birthday").value;
        var sex;
        if (document.getElementById("male").checked) {
            console.log(sex)
        }
        if (document.getElementById("female").checked) {
            sex = "female";
        }
        LoginService.register({ "name": name, "lastname": lastname, "email": email, "birthday": birthday, "sex": sex, "password": password }).then(function (result) {
            location.reload();
        });

    };

}]);