const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editting: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  console.log(req.user, 'asdasdas');
  // di udemynya sendiri bisa menggunakan Magic Assocaiation karena terbuat dari relasi database antara user dengan product
  // req.user
  // .createProduct({
  //   title,
  //   price,
  //   imageUrl,
  //   description,
  // })
  Product.create({
    title,
    price,
    imageUrl,
    description,
    userId : req.user.id
  })
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.editting || true;
  if (!editMode) {
    res.redirect("/");
  }

  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      if (!product) {
        res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/edit-product",
        editting: editMode,
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, price, imageUrl, description } = req.body;
  Product.findByPk(productId)
    .then((prod) => {
      prod.title = title;
      prod.price = price;
      prod.description = description;
      prod.imageUrl = imageUrl;

      // ini akan meneruskan promise dengan then ke 2
      return prod.save();
    })
    .then((result) => {
      console.log(result);
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((prod) => {
      return prod.destroy();
    })
    .then((result) => {
      console.log(result);
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "All Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
