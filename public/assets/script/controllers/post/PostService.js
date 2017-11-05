app.factory('PostService', function ($http, $rootScope) {
    
    function Post() { }
    
    Post.prototype.createPost= function (text) {
        return new Promise(function(resolve, reject) {
            $http.post('http://localhost:4000/user/createPost', text).then(function(response) {
                resolve(response);
            });
        });
    }
    
    return new Post();
});