app.factory('MainService', function ($http, $rootScope) {
    
    function Post() { }
    
    Post.prototype.createPost = function (data) {
        return new Promise(function(resolve, reject) {
            $http.post('http://localhost:4000/post/create', data).then(function(response) {
                resolve(response);
            });
        });
    };

    Post.prototype.listPosts = function(id) {
        return new Promise(function(resolve, reject) {
            $http.get('http://localhost:4000/post/list/'+ id).then(function(response) {
                resolve(response);
            });
        });
    };
    
    Post.prototype.listFriendsPosts = function() {
        return new Promise(function(resolve, reject) {
            $http.get('http://localhost:4000/post/list').then(function(response) {
                resolve(response);
            }).catch(function(err) { reject(err); });
        });
    };

    return new Post();
});