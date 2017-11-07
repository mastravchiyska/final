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

<<<<<<< HEAD
    ListRequests.prototype.acceptRequest = function (id) {
        return new Promise(function (resolve, reject) {
            $http.get('http://localhost:4000/friend/add/'+id).then(function (response) {
=======
    // ListRequests.prototype.listRequests= function (data) {  
    //     return new Promise(function(resolve, reject) {
    //         $http.get('http://localhost:4000/friend/requestList', data).then(function(response) {
    //             resolve(response);
    //         });
    //     });
    // }


    ListRequests.prototype.removeRequest = function (id) {
        return new Promise(function (resolve, reject) {
            $http.get('http://localhost:4000/friend/removeRequest/' + id).then(function (response) {
>>>>>>> 8729fa955525c09bfd637462a61fd33531d4b54d
                resolve(response);
            });
        });
    }
    return new ListRequests();
});