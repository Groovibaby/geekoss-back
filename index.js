const express = require("express");
const app = express();
const apiRouter = require("./routes");
const port = process.env.PORT || 5000;
const cors = require("cors");

// Autorise les requêtes CORS venant de https://www.geekoss.fr
app.use(cors({
  origin: 'https://www.geekoss.fr'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.listen(port, (err) => {
  if (err) {
    throw new Error("Something bad happened...");
  }
  console.log(`Server is running on ${port}`);
});
