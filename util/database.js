const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node-complete-guides", "root", "Mysql123@", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
