app.factory('MainService', function ($http, $rootScope) {
    
    function Post() { }
    
    Post.prototype.createPost = function (data) {
        return new Promise(function(resolve, reject) {
            $http.post('http://localhost:4000/user/createPost', data).then(function(response) {
                resolve(response);
            });
        });
    };

    Post.prototype.listPosts = function() {
        return new Promise(function(resolve, reject) {
            $http.get('http://localhost:4000/user/listPosts').then(function(response) {
                resolve(response);
            });
        });
    };
    
    return new Post();
});