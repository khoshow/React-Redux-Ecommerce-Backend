const Category = require("../models/category");
const Sub = require("../models/sub");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;

    const sub = await new Sub({ name, parent, slug: slugify(name) }).save();
    res.json(sub);
    // res.json(await new Sub({ name, slug: slugify(name) }).save());
  } catch (err) {
    console.log(err);
    res.status(400).send("Create sub failed");
  }
};

exports.list = async (req, res) => {
  const list = await Sub.find().sort({ createdAt: -1 }).exec();
  res.json(list);
};

exports.read = async (req, res) => {
  const sub = req.params.slug;
  const read = await Sub.findOne({ slug: sub }).exec();
  res.json(read);
};

exports.update = async (req, res) => {
  const sub = req.params.slug;
  const { name } = req.body;
  console.log("slug back", sub);
  console.log("name back", name);
  try {
    const update = await Sub.findOneAndUpdate(
      { slug: sub },
      { slug: slugify(name), name: name },
      { new: true }
    );
    res.json(update);
  } catch {
    res.status(400).send("Create Update failed");
  }
};

exports.remove = async (req, res) => {
  slug = req.params.slug;
  try {
    const removeSub = await Sub.findOneAndDelete(
      { slug },
      {
        new: true,
      }
    ).exec();
    res.json(removeSub);
  } catch {
    res.status(400).json({
      error: "Unable to Delete",
    });
  }
};
