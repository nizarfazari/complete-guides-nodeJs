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

app.use((req,res,next) => {
    User.findByPk(1).then((user) => {
        console.log(user, 'asdasds');
        req.user = user
        next()
    }).catch((err) => {
        console.log(err);
    });
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

sequelize
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
 
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
