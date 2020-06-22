window.onload = function () {
    "use strict";

    window.localStorage.removeItem("auth");

    function login() {
        const user = {
            "email": document.getElementById("email").value,
            "password": document.getElementById("password").value
        };
        common.post(settings.uri + "identity/login?d=frontend", function (token) {
            const auth = {
                "email": user.email,
                "token": token
            };
            window.localStorage.setItem("auth", JSON.stringify(auth));
            window.location = "/store.html";
        }, function () {
            alert("Wrong credentials.");
        }, user);
    };

    document.getElementById("login").onclick = function () {
        login();
    };

    document.getElementById("password").onkeyup = function (e) {
        if (e.keyCode === 13) {
            login();
        }
    };

    document.getElementById("register").onclick = function () {
        window.location = "/register.html";
    };
};