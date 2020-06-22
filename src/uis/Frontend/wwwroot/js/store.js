﻿window.onload = function () {
    "use strict";

    const auth = JSON.parse(window.localStorage.getItem("auth"));

    if (auth == null) {
        window.location = "/index.html";
    }

    common.get(settings.uri + "identity/validate?email=" + encodeURIComponent(auth.email) + "&token=" + encodeURIComponent(auth.token), function (userId) {
        userId = JSON.parse(userId);
        common.get(settings.uri + "catalog", function (catalogItems) {
            catalogItems = JSON.parse(catalogItems);

            let items = [];
            for (let i = 0; i < catalogItems.length; i++) {
                const catalogItem = catalogItems[i];
                items.push("<tr>"
                    + "<td class='id'>" + catalogItem.id + "</td>"
                    + "<td class='name'>" + catalogItem.name + "</td>"
                    + "<td>" + catalogItem.description + "</td>"
                    + "<td class='price'>" + catalogItem.price + "</td>"
                    + "<td><input type='button' value='Add' class='add btn btn-primary' /></td>"
                    + "</tr>");
            }
            let table = "<table class='table'>"
                + "<thead class='thead-dark'>"
                + "<tr>"
                + "<th>Name</th>"
                + "<th>Description</th>"
                + "<th>Price</th>"
                + "<th></th>"
                + "</tr>"
                + "</thead>"
                + "<tbody>"
                + items.join("")
                + "</tbody>"
                + "</table>";
            document.querySelector(".catalog").innerHTML = table;

            const rows = document.querySelector(".catalog").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                const addButton = row.querySelector(".add");
                addButton.onclick = function () {
                    const catalogItemId = row.querySelector(".id").innerHTML;
                    const catalogItemName = row.querySelector(".name").innerHTML;
                    const catalogItemPrice = parseFloat(row.querySelector(".price").innerHTML);
                    const quantity = 1;

                    const cartItem = {
                        "catalogItemId": catalogItemId,
                        "catalogItemName": catalogItemName,
                        "catalogItemPrice": catalogItemPrice,
                        "quantity": quantity
                    };

                    common.post(settings.uri + "cart?u=" + encodeURIComponent(userId), function () {
                        alert("Item added to cart.");
                    }, function () {
                        alert("Error while adding item to cart.");
                    }, cartItem, auth.token);
                };
            }

        }, function () {
            alert("Error while retrieving catalog.");
        }, auth.token);

        document.getElementById("logout").onclick = function () {
            window.localStorage.removeItem("auth");
            window.location = "/index.html";
        };
    }, function () {
        window.location = "/index.html";
    });

};