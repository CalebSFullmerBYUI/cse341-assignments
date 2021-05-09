const express = require("express");
const fs = require('fs');
const router = express.Router();

let userCart = [];


router.get("/", (req, res, next) => {
    res.render("pages/cart", {
        title: "User Cart"
    })
});


module.exports = router;