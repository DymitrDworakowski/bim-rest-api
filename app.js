const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get('/contact', (req, res) => {
 res.send('<h1>Contact page</h1>');
});
app.get('/contact/:id', (req, res) => {
 res.send(`<h1>Contact</h1> Параметр: ${req.params.id}`);
});

const express = require('express');
const router = express.Router();
// визначимо домашній роутер
router.get('/', (req, res) => {
res.send('Це головний роутер');
});
// визначимо роутер about
router.get('/about', (req, res) => {
res.send('About');
});
module.exports = router;

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

