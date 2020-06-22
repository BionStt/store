window.onload = function () {
    "use strict";

    document.getElementById("register").onclick = function () {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmedPassword = document.getElementById("confirm-password").value;

        if (password !== "" && password === confirmedPassword) {
            const user = {
                "email": email,
                "password": password
            };

            common.post(settings.uri + "identity/register", function () {
                common.post(settings.uri + "identity/login?d=frontend", function (token) {
                    const auth = {
                        "email": user.email,
                        "token": token
                    };
                    window.localStorage.setItem("auth", JSON.stringify(auth));
                    window.location = "/store.html";
                }, function () {
                    alert("Login error.");
                }, user);
            }, function () {
                alert("Registration error.");
            }, user);
        } else {
            alert("Passwords don't match.");
        }
    };
};