const router = require("express").Router();
const { Category, Product, Tag, ProductTag } = require("../../models");

// The `/api/categories` endpoint
//http://localhost:3001/api/products/
router.get("/", async (req, res) => {
  // find all categories
  try {
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    }); // be sure to include its associated Products

    if (!products) {
      return res.status(404).json({ message: `List of products not found` });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

//http://localhost:3001/api/products/:id
router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });

    if (!product) {
      return res.status(404).json({ message: `Product not found` });
    }
    // be sure to include its associated Products
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

//http://localhost:3001/api/products/
router.post("/", async (req, res) => {
  // create a new category
  try {
    const productId = await Product.findByPk(req.body.id);

    if (productId) {
      return res.status(400).json({ message: `This id of '${req.body.id}' is taken` });
    }

    const newProduct = await Product.create(req.body).then((product) => {})
    res.status(201).json({ message: `Product created` });
  } catch (error) {
    res.status(500).json(error);
  }
});

//http://localhost:3001/api/products/:id
router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ messages: `Product not found` });
    }

    await Product.update(req.body, {
      where: { id: req.params.id },
    });

    res.status(200).json({ message: `Product updated` });
  } catch (error) {
    res.status(500).json(error);
  }
});

//http://localhost:3001/api/products/:id
router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: `Product not found` });
    }

    await Product.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: `Product deleted` });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
