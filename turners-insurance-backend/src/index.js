const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());

const PORT = 3000;

app.use("/", (req, res) => {
  res.send("Server is running - / endpoint was hit yay!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
