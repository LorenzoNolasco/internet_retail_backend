const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint
//http://localhost:3001/api/categories
router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});
//http://localhost:3001/api/categories/{enter id #}
router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!category) {
      return res.status(404).json({ message: `Category not found` });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
});
//http://localhost:3001/api/categories
router.post("/", async (req, res) => {
  // create a new category
  try {
    const category = await Category.findByPk(req.body.id);

    if (category) {
      return res.status(400).json({ message: `This id is taken` });
    }

    await Category.create(req.body);
    res.status(201).json({ message: `New Category successfully created` });
  } catch (error) {
    res.status(500).json({ error: `Error occurred while adding new category` });
  }
});
//http://localhost:3001/api/categories
router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    //checks if the id exist
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: `Category does not exist` });
    }

    await Category.update(req.body, {
      where: { id: req.params.id },
    });

    res
      .status(200)
      .json({ message: `Category found and successfully updated` });
  } catch (error) {
    res
      .status(500)
      .json({ error: `An error occured while attempting to update` });
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: `Category does not exist` });
    }

    await Category.destroy({ where: { id: req.params.id } });
    res
      .status(200)
      .json({ message: `Category found and successfully deleted` });
  } catch (error) {
    res
      .status(500)
      .json({ error: `An error occured while attempting to delete` });
  }
});

module.exports = router;
