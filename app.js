const express = require('express');
require('dotenv').config();
require('./db/config')


//import routes
const userRoutes = require("./routes/user.route");
const productRoutes = require("./routes/product.route");
const orderRoutes = require("./routes/order.route");
// const queryRoutes = require("./routes/query.route");

//associations
const User = require('./models/user.model');
const Product = require('./models/product.model');
const Order = require('./models/order.model');
const OrderDetail = require('./models/orderdetail.model');

Order.belongsToMany(Product, { through: OrderDetail });
Product.belongsToMany(Order, { through: OrderDetail });

User.hasMany(Order);
Order.belongsTo(User);


const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json())


app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
// app.use("/queries",queryRoutes);


app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
});


//server configuration
const port = process.env.PORT || 3001;
const host = process.env.HOST;

app.listen(port, () => {
    console.log(`app is listening on port http://${host}:${port}`);
})



