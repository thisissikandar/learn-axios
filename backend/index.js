import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/products", (req, res) => {
  const products = [
    {
      id: 1,
      name: "table wooden",
      price: 200,
    },
    {
      id: 2,
      name: "table glass",
      price: 250,
    },
    {
      id: 3,
      name: "table plastic",
      price: 300,
    },
    {
      id: 4,
      name: "table wooden",
      price: 400,
    },
    {
      id: 5,
      name: "table metal",
      price: 350,
    },
    {
      id: 6,
      name: "table Polyster",
      price: 280,
    },
  ];
  //   query parameter   api/products?search=metal
  if (req.query.search) {
    const filterProduct = products.filter((product) =>
      product.name.includes(req.query.search)
    );
    res.send(filterProduct);
    return;
  }
  setTimeout(() => {
    res.send(products);
  }, 3000);
});
app.listen(PORT, () => {
  console.log(`App Running port http://localhost:${PORT}`);
});
