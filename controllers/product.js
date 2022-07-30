const Category = require("../models/category");
const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log("Hello Body", req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    // res.status(400).send("Create product failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listProducts = async (req, res) => {
  console.log("I am here in list Products");
  const productList = await Product.find().sort({ createdAt: -1 }).exec();
  res.json(productList);
};

exports.getProductCategory = async (req, res) => {
  const category = await Category.findById({ _id: req.params.slug }).exec();

  res.json(category);
};

// exports.list = async (req, res) => {
//   const list = await Category.find().sort({ createdAt: -1 }).exec();
//   res.json(list);
// };

// exports.read = async (req, res) => {
//   const category = req.params.slug;
//   const read = await Category.findOne({ slug: category }).exec();
//   res.json(read);
// };

// exports.update = async (req, res) => {
//   const category = req.params.slug;
//   const { name } = req.body;
//   console.log("slug back", category);
//   console.log("name back", name);
//   try {
//     const update = await Category.findOneAndUpdate(
//       { slug: category },
//       { slug: slugify(name), name: name },
//       { new: true }
//     );
//     res.json(update);
//   } catch {
//     res.status(400).send("Create Update failed");
//   }
// };

// exports.remove = async (req, res) => {
//   categoryId = req.params.slug;
//   try {
//     const removeCategory = await Category.findOneAndDelete(
//       { slug: categoryId },
//       {
//         new: true,
//       }
//     ).exec();
//     res.json(removeCategory);
//   } catch {
//     res.status(400).json({
//       error: "Unable to Delete",
//     });
//   }
// };
