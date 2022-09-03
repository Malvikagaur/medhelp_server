const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT;

const dbConfig = require("../medhelp_server/services/dbConfig");
dbConfig();

const Doctor = require("./models/doc");
const User = require("./models/user");


app.use(logger("dev"));
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

app.get("/", function(req, res){
    return res.send("This is appointment booking webapp");
});

const routes = require("./routes/com");
app.use("/api", routes);

app.listen(PORT, function (error) {
  if (error) {
    console.log("Error in starting the server");
  }

  console.log(`Server started successfully on port : ${PORT}`);
});