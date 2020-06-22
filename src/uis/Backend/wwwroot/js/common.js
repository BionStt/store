const common = {
    post: function (url, callback, errorCallback, content, token) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState === 4 && (this.status === 200 || this.status === 201) && callback) {
                callback(this.responseText);
            } else if (this.readyState === 4 && errorCallback) {
                errorCallback();
            }
        };
        xmlhttp.onerror = function () {
            if (errorCallback) {
                errorCallback();
            }
        };
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        if (token) {
            xmlhttp.setRequestHeader("Authorization", "Bearer " + token);
        }
        xmlhttp.send(JSON.stringify(content));
    },
    get: function (url, callback, errorCallback, token) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200 && callback) {
                callback(this.responseText);
            } else if (this.readyState === 4 && errorCallback) {
                errorCallback();
            }
        };
        xmlhttp.onerror = function () {
            if (errorCallback) {
                errorCallback();
            }
        };
        xmlhttp.open("GET", url, true);
        if (token) {
            xmlhttp.setRequestHeader("Authorization", "Bearer " + token);
        }
        xmlhttp.send();
    },
    delete: function (url, callback, errorCallback, token) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200 && callback) {
                callback(this.responseText);
            } else if (this.readyState === 4 && errorCallback) {
                errorCallback();
            }
        };
        xmlhttp.onerror = function () {
            if (errorCallback) {
                errorCallback();
            }
        };
        xmlhttp.open("DELETE", url, true);
        if (token) {
            xmlhttp.setRequestHeader("Authorization", "Bearer " + token);
        }
        xmlhttp.send();
    }
};