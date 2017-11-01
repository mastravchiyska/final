app.service('UserService', ['$http', function($http) {






    
    this.getAll = function() {
        return $http.get('http://localhost:4000/user');
    }
    this.addNew = function(friend) {
        return $http.put('http://localhost:4000/user', friend);
    }
    this.remove = function(id) {
        return $http.delete('http://localhost:4000/user' + id);
    }
    this.edit = function(user) {
        return $http.post('http://localhost:4000/user' + user._id, user);
    }
}]);