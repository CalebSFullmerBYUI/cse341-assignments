const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();

let products = JSON.parse(fs.readFileSync(path.join(__dirname, "../products.json")));

router.get("/", (req, res, next) => {
    res.render("pages/product", {
        title: "Product"
    })
});


module.exports = router;