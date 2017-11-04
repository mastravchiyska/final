app.controller('adController', ['$scope', 'adService', function ($scope, adService) {
    var users = JSON.parse(localStorage.getItem('testObject'));
    $scope.lname = users.lastname;
    $scope.fname = users.name;
    $scope.mail = users.email;
    $scope.sex = users.sex;
    $scope.bday = users.birthday;
    
    $scope.showDetails = function () {
        // var sessionId = sessionStorage.getItem('session_id')
        

    };
}]);