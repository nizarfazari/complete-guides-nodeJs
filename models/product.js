const db = require("../util/database");
const Cart = require("./cart");

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      // untuk mencegah sql injection jadinya menggunakan syntax spt ini
      "INSERT INTO tbl_products (title, price, imageUrl, description ) VALUES ( ?, ?, ?, ?)",
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static fetchAll() {
    return db.execute("SELECT * FROM tbl_products");
  }

  static findById(id) {
    return db.execute("SELECT * FROM tbl_products WHERE tbl_products.id = ?", [id]);
  }

  static deleteById(id) {}
};
