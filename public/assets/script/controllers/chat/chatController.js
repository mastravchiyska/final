app.controller('chatController', ['$scope', 'friendListService', 'socket',
    function ($scope, friendListService, socket) {
        var user = JSON.parse(localStorage.getItem("user"));
        var userId = user._id;
        $scope.currentFriend;
        $scope.message = {};
        $scope.chronology = [];

        friendListService.listFriends(userId).then(function (result) {
            $scope.friends = result.data.data;
            if($scope.friends.length > 0) {
                $scope.chooseFriend($scope.friends[0]);
            }
        });
        
        $scope.chooseFriend = function(friend) {
            $scope.currentFriend = friend;
            socket.emit('getChronology', $scope.currentFriend.chatId);
        };

        $scope.getClass = function getClass(id){
            if(id === userId){
                return  "my";
            }
            return '';
        }

        $scope.sendMessage = function() {
            socket.emit('sendMessage', {
                chatId: $scope.currentFriend.chatId,
                message: {
                    text: $scope.message.text,
                    date: Date.now(),
                    userId: user._id
                }
            });
            $scope.message.text = '';

            var chatStage = document.querySelector('#chat-stage');
            if(chatStage) {
                chatStage.scrollTop = chatStage.scrollHeight;
            }
        };

        socket.on('returnChronology', function(chronology) {
            try {
                $scope.chronology = chronology.messages;
                $scope.$apply();
            } catch(e) {
                $scope.chronology = [];
                $scope.$apply();
            }
            
            var chatStage = document.querySelector('#chat-stage');
            if(chatStage) {
                chatStage.scrollTop = chatStage.scrollHeight;
            }
        });

    }]);