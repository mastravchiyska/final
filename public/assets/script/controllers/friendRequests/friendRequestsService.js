app.factory('friendRequestsService', function ($http, $rootScope) {

    function ListRequests() { }

    ListRequests.prototype.listRequests = function () {
        return new Promise(function (resolve, reject) {
            $http.get('http://localhost:4000/friend//requestList').then(function (response) {
                resolve(response);
            });
        });
    }

    ListRequests.prototype.acceptRequest = function (id) {
        return new Promise(function (resolve, reject) {
            $http.get('http://localhost:4000/friend/add/' + id).then(function (response) {
                resolve(response);
            });
        });
    }

    ListRequests.prototype.removeRequest = function (id) {
        return new Promise(function (resolve, reject) {
            $http.delete('http://localhost:4000/friend/removeRequest/' + id).then(function (response) {
                resolve(response);
            });
        });
    }

    ListRequests.prototype.addToFriendList = function (id) {
        return new Promise(function (resolve, reject) {
            $http.post('http://localhost:4000/friend/sendRequest/' + id).then(function (response) {
                resolve(response);
            });
        });
    }

    ListRequests.prototype.removeFromFriendList = function (id) {
        return new Promise(function (resolve, reject) {
            $http.delete('http://localhost:4000/friend/removeFriend/' + id).then(function (response) {
                resolve(response);
            });
        });
    }

    return new ListRequests();
});