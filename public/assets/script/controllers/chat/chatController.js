app.controller('chatController', ['$scope', 'friendListService', 'socket',
    function ($scope, friendListService, socket) {
        var user = JSON.parse(localStorage.getItem("user"));
        var userId = user._id;
        $scope.currentFriend;
        $scope.message = {};
        $scope.chronology = [];

        friendListService.listFriends(userId).then(function (result) {
            $scope.friends=result.data.data;
        });
        
        $scope.chooseFriend = function(friend) {
            $scope.currentFriend = friend;
            socket.emit('getChronology', [user._id, $scope.currentFriend._id]);
        };

        $scope.sendMessage = function() {
            socket.emit('sendMessage', {
                members: [user._id, $scope.currentFriend._id],
                message: {
                    text: $scope.message.text,
                    date: Date.now(),
                    userId: user._id
                }
            });
        };

        socket.on('returnChronology', function(chronology) {
            try {
                $scope.chronology = chronology.messages;
                $scope.$apply();
            } catch(e) {
                $scope.chronology = [];
                $scope.$apply();
            }
        });

    }]);