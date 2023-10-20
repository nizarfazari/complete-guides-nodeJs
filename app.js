const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
// to set view engine, there is many view engine => pug,handlebars,ejs
app.set("view engine", "ejs");

//to set view location in where is it
app.set("views", "views");
const sequelize = require('./util/database')
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const { get404 } = require("./controllers/error");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404);

sequelize.sync().then(res => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
})

