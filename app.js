const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
// to set view engine, there is many view engine => pug,handlebars,ejs
app.set("view engine", "ejs");

//to set view location in where is it
app.set("views", "views");
const sequelize = require("./util/database");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const { get404 } = require("./controllers/error");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

app.use((req, res, next) => {
  // to set req.user agar datanya terdapat data user yang  nantinya di gunakan pada relation product
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404);

// One to Many
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

// One to Many
User.hasOne(Cart);
Cart.belongsTo(User);

// Many to Many
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// belonging to one user
Order.belongsTo(User);
// Many => One to Many
User.hasMany(Order);

// Many to many bisa bisa kita tidak panggil balikannya yang sama case di atas
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  // .sync({force : true})
  .sync()
  .then((res) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Nizar", email: "test@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
