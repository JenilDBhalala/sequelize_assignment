const Product = require("../models/product.model");

module.exports = {

  addProduct: async (req, res, next) => {
    try {
      await Product.create(req.body.product);
      res.status(200).json({ message: "product added sucessfully" });
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },


  updateProduct: async (req, res, next) => {
    try {
      const [result] = await Product.update(req.body.product, {
        where: {
          id: req.params.productID,
        },
      });
      
      if (result) {
        res.status(200).json({ message: "product updated sucessfully" });
      } else {
        res.status(404).json({ message: "product not found!" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },


  deleteProduct: async (req, res, next) => {
    try {
      const result = await Product.destroy({
        where: {
          id: req.params.productID,
        },
      });
      if (result) {
        res.status(200).json({ message: "product deleted sucessfully" });
      } else {
        res.status(404).json({ message: "product not found!" });
      }
    } catch (error) {
      next(error);
    }
  },


  getProducts: async (req, res, next) => {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  },


  getProductByID: async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.productID);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "product not found!" });
      }
    } catch (error) {
      next(error);
    }
  }
};

