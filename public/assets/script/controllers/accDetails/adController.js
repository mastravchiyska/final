app.controller('adController', ['$scope', 'adService', function ($scope, adService) {
    var users = JSON.parse(localStorage.getItem('testObject'));
    $scope.lname = users.lastname;
    $scope.fname = users.name;
    $scope.mail = users.email;
    $scope.sex = users.sex;
    $scope.bday = users.birthday;
}]);