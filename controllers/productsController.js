const Product = require("../model/Product");

const getAllProducts = async (req, res) => {
  const products = await Product.find();
  if (!products) return res.status(204).json({ message: "there is no data" });
  res.json(products);
};

const addNewProduct = async (req, res) => {
  if (
    !req?.body?.name ||
    !req?.body?.brand ||
    !req?.body?.stock ||
    !req.body.price
  ) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const result = await Product.create({
      name: req.body.name,
      brand: req.body.brand,
      status: req.body.stock > 0 ? 1 : 0,
      stock: req.body.stock,
      price: req.body.price,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getAllProducts,addNewProduct };
