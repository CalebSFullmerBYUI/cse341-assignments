const express = require("express");
const fs = require('fs');
const router = express.Router();

let userCart = [];


router.get("/add_product", (req, res, next) => {
    res.render("pages/addProduct", {
        title: "Add Product"
    })
});

router.get("/remove_product", (req, res, next) => {
    res.render("pages/removeProduct", {
        title: "Remove Product"
    })
});


module.exports = router;