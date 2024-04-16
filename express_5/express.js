const express = require("express");
const app = express();
const port = 5555;
const bodyParser = require("body-parser");

app.set("view engine", "hbs");
app.use(bodyParser.json());

const usersRoutes = require("./routes/users.js");
app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  res.render("index", {
    Title: "Galeria",
    Body: "Zdjęcia",
  });
});

app.listen(port, () => console.log(`Running on ${port}...`));
