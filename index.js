const connectToMongoose = require('./db'); // if this connects to MongoDB
const express = require('express');
var cors = require('cors')

connectToMongoose();
const app = express();
const port = 5000;

app.use(cors())
app.use(express.json())

app.use("/api/home", require("./routes/home"))
app.use("/api/category", require("./routes/category"))
app.use("/api/basics", require("./routes/basics"))
app.use("/api/auth", require("./routes/auth"))

app.get('/', (req, res) => {
  res.send('Hello, Backend running!');
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});