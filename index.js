const express = require("express");
const cors = require("cors");
const colors = require("colors");

const dotenv = require("dotenv");
dotenv.config();

const dbConnect = require("./config/dbConnect");
dbConnect();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/recipes", require("./routes/Guest/allRecipeRoutes"));
app.use("/api/users", require("./routes/User/userRoutes"));
app.use("/api/users/recipe", require("./routes/User/userRecipeRoutes"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});
