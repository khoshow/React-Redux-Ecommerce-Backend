const Category = require("../models/category");
const Sub = require("../models/sub")
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
    // res.json(await new Category({ name, slug: slugify(name) }).save());
  } catch (err) {
    console.log(err);
    res.status(400).send("Create category failed");
  }
};

exports.list = async (req, res) => {
  const list = await Category.find().sort({ createdAt: -1 }).exec();
  res.json(list);
};

exports.read = async (req, res) => {
  const category = req.params.slug;
  const read = await Category.findOne({ slug: category }).exec();
  res.json(read);
};

exports.update = async (req, res) => {
  const category = req.params.slug;
  const { name } = req.body;
  console.log("slug back", category);
  console.log("name back", name);
  try {
    const update = await Category.findOneAndUpdate(
      { slug: category },
      { slug: slugify(name), name: name },
      { new: true }
    );
    res.json(update);
  } catch {
    res.status(400).send("Create Update failed");
  }
};

exports.remove = async (req, res) => {
  categoryId = req.params.slug;
  try {
    const removeCategory = await Category.findOneAndDelete(
      { slug: categoryId },
      {
        new: true,
      }
    ).exec();
    res.json(removeCategory);
  } catch {
    res.status(400).json({
      error: "Unable to Delete",
    });
  }
};


exports.getSubs = (req, res) => {
  Sub.find({ parent: req.params._id }).exec((err, subs) => {
    if (err) console.log(err);
    res.json(subs);
  });
};
