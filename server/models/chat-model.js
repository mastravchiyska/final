var DbConnect = require('../models/db-connection');

function ChatModel() {
    db = new DbConnect();
    chatCollection = db.get('chat');
}

ChatModel.prototype.getChat = function (idsList) {
    return new Promise(function (resolve, reject) {
        this.chatCollection.findOne({ members: idsList}).then(function(result) {
            resolve(result);
        }).catch(function(e) {
            reject(e);
        });
    });
};

ChatModel.prototype.saveChat = function (chatId, messageList) {
    return new Promise(function (resolve, reject) {
        this.chatCollection.findOneAndUpdate({ _id: chatId }, { $set: { messages: messageList } },
            { upsert: true, returnNewDocument: true })
        .then(function(result) {
            resolve(result);
        }).catch(function(e) {
            reject(e);
        });
    });
};

module.exports = ChatModel;