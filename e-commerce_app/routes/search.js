const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();

let productsArray = JSON.parse(fs.readFileSync(path.join(__dirname, "../products.json")));


router.get("/", (req, res, next) => {
    res.render("pages/search", {
        title: "Search Page",
        products: productsArray
    })
});


router.post("/request", (req, res, next) => {
    // Refresh products from JSON file in case a change has been made.
    productsArray = JSON.parse(fs.readFileSync(path.join(__dirname, "../products.json")));

    const incomingData = [];
    req.on('data', (data) => {
        incomingData.push(data);
    });

    req.on('end', () => {
        let data = Buffer.concat(incomingData).toString();

        console.log("Handled search request.");
        res.redirect('/');
    });
});


module.exports = router;