import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.chucknorris.io/jokes/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "random");

    const responseForCategories = await axios.get(API_URL + "categories");

    res.render("index.ejs", {
      content: JSON.stringify(response.data.value),
      data: responseForCategories.data,
    });
  } catch (error) {
    console.error("Error fetching the main page:", error);
    res.status(500).send;
  }
});

app.post("/submit", async (req, res) => {
  try {
    const category = req.body["categories"];

    const response = await axios.get(API_URL + `random?category=${category}`);

    const responseForCategories = await axios.get(API_URL + "categories");

    res.render("index.ejs", {
      content: JSON.stringify(response.data.value),
      data: responseForCategories.data,
    });
  } catch (error) {
    console.error("Error fetching joke from category:", error);
    res.status(500).send;
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
