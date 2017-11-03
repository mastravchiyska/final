app.controller('LoginController', ['$scope', 'LoginService', function ($scope, LoginService) {
    $scope.user = '';
    document.getElementById('header1').style.display = "none";
    $scope.login = function() {
        var email = document.getElementById("loginemail").value;
        var pass = document.getElementById("loginpass").value;
        LoginService.login({ "email": "Doncho@mail.com", "password": "verySecure1!" }).then(function(result) {
            console.log(result.data.data._id);
            sessionStorage.setItem('session_id', result.data.data._id);
            location.reload();
        });
    };

}]);