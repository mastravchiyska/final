var DbConnect = require('./db-connection');

function SearchModel() {
    db = new DbConnect();
    userCollecion = db.get('users');
}

SearchModel.prototype.search = function (stringList) {
    var self = this;
    var results = [];
    var wordResults = 0;
    return new Promise(function (resolve, reject) {
        stringList.forEach(function (word) {
            self.searchByWord(word).then(function (result) {
                wordResults++;
                results = results.concat(result);
                if (stringList.length == wordResults) {
                    resolve(results);
                }
            });
        });
    });
};

SearchModel.prototype.searchByWord = function (word) {
    var self = this;
    return new Promise(function (resolve, reject) {
        var searchFields = ['name', 'lastname', 'email'];
        var findedCounter = 0;
        var results = [];

        searchFields.forEach(function (field) {
            var searchParams = {};
            var pattern = new RegExp(word, 'i');
            searchParams[field] = { $regex: pattern };
            this.userCollecion.find(searchParams).then(function (result) {
                findedCounter++;
                results = results.concat(result);
                if (searchFields.length == findedCounter) {
                    resolve(self.getUniqueArray(results));
                }
            });
        });
    });
};

SearchModel.prototype.getUniqueArray = function (fullCollection) {
    var unique = [];

    fullCollection.forEach(function(item) {
        if(unique.length > 0) {
            var contains = false;

            unique.forEach(function(uniqueItem) {
                if(JSON.stringify(uniqueItem._id) == JSON.stringify(item._id)) {
                    contains = true;
                }
            });

            if(!contains) {
                unique.push(item);
            }
        } else {
            unique.push(item);
        }
    });

    return unique;
};

module.exports = SearchModel;