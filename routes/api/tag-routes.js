const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint
//http://localhost:3001/api/tags/
router.get("/", async (req, res) => {
  // find all tags
  try {
    // be sure to include its associated Product data
    const tags = await Tag.findAll({ include: [Product] });
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json(error);
  }
});

//http://localhost:3001/api/tags/:id
router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  try {
    const tag = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include: [Product],
    });

    if(!tag) {
      res.status(404).json({message: `Tag not found`})
    }

    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json(error);
  }
});

//http://localhost:3001/api/tags/
router.post("/", async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update a tag's name by its `id` value
//http://localhost:3001/api/tags/:id
router.put("/:id", async (req, res) => {
  try {
    const [rowsAffected, [updatedTag]] = await Tag.update(
      { tag_name: req.body.tag_name },
      {
        where: { id: req.params.id },
        returning: true, // Get the updated tag object
      }
    );

    if (rowsAffected === 0) {
      return res.status(404).json({ message: "Tag not found" });
    }

    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

//http://localhost:3001/api/tags/:id
router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.destroy({ where: { id: req.params.id } });
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;