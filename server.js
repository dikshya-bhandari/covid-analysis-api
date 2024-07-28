const express = require("express");
const morgan = require("morgan");
const routes = require("./routes");
const bodyParser = require("body-parser");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all domains
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

app.use(morgan("dev"));
app.use("/api", routes);

app.use("*", (req, res) => {
  res.json({ success: false, message: "bad request" });
});

app.listen(PORT, () => {
  console.log("Listening on PORT ", PORT);
});
