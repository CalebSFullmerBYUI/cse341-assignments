const express = require("express");
const path = require("path");
const app = express();

const homeRoutes = require("./routes/home");
const searchRoutes = require("./routes/search");
const productRoutes = require("./routes/product");
const adminRoutes = require("./routes/admin");
const cartRoutes = require("./routes/cart");

// Set up app.
app.use(express.static(path.join(__dirname, "public")))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')

// Define routes.
.use("/cart", cartRoutes)
.use("/admin", adminRoutes)
.use("/product_details/:productID", productRoutes)
.use("/search", searchRoutes)
.use("/", homeRoutes)
.use((req, res, next) => {
    res.render("pages/404", {
        title: "404: Page Not Found"
    });
});

// Wait for input.
app.listen(process.env.PORT || 5000, () => {});