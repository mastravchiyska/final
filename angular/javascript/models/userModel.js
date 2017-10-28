function getUser(){
     return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:4000/user/', true);
        xhr.send(null);
        xhr.addEventListener('load', function() {
            if (xhr.status == 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(xhr.statusText);
            }
        });
    });
}

function addNewUser(user) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:4000/register/', true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(user));
        xhr.addEventListener('load', function() {
            if (xhr.status == 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(xhr.statusText);
            }
        });
    });
}