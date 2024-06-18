const express = require("express");
const app = express();
const port = 3000;

// Middleware untuk parsing JSON
app.use(express.json());

// Data kategori dan produk
let categories = [
  { id: 1, name: "Elektronik" },
  { id: 2, name: "Perabotan" },
];

let products = [
  { id: 1, name: "Laptop", category: "Elektronik" },
  { id: 2, name: "Meja", category: "Perabotan" },
];

// Route GET untuk daftar semua kategori
app.get("/categories", (req, res) => {
  res.json({
    message: "Success fetch categories",
    data: categories,
  });
});

// Route GET untuk detail kategori berdasarkan ID
app.get("/categories/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const category = categories.find((cat) => cat.id === id);

  if (category) {
    res.json({
      message: "Success fetch category",
      data: category,
    });
  } else {
    res.status(404).json({
      message: "Category not found",
    });
  }
});

// Route POST untuk menambahkan kategori baru
app.post("/categories", (req, res) => {
  const newCategory = {
    id: categories.length + 1,
    name: req.body.name,
  };
  categories.push(newCategory);
  res.status(201).json({
    message: "Category added",
    data: newCategory,
  });
});

// Route PUT untuk memperbarui kategori berdasarkan ID
app.put("/categories/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const category = categories.find((cat) => cat.id === id);

  if (category) {
    category.name = req.body.name;
    res.json({
      message: "Category updated",
      data: category,
    });
  } else {
    res.status(404).json({
      message: "Category not found",
    });
  }
});

// Route DELETE untuk menghapus kategori berdasarkan ID
app.delete("/categories/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = categories.findIndex((cat) => cat.id === id);

  if (index !== -1) {
    const deletedCategory = categories.splice(index, 1);
    res.json({
      message: "Category deleted",
      data: deletedCategory,
    });
  } else {
    res.status(404).json({
      message: "Category not found",
    });
  }
});

// Route GET untuk mencari produk berdasarkan nama
app.get("/products", (req, res) => {
  const name = req.query.name;
  const filteredProducts = products.filter((prod) =>
    prod.name.toLowerCase().includes(name.toLowerCase())
  );

  res.json({
    message: "Success fetch products",
    data: filteredProducts,
  });
});

// Route GET untuk mendapatkan produk dalam kategori tertentu dan mencari berdasarkan nama
app.get("/categories/:category/products", (req, res) => {
  const category = req.params.category;
  const name = req.query.name;
  let filteredProducts = products.filter((prod) => prod.category === category);

  if (name) {
    filteredProducts = filteredProducts.filter((prod) =>
      prod.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  res.json({
    message: "Success fetch products in category",
    data: filteredProducts,
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
