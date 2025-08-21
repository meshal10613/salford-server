const express = require("express");
const cors = require("cors");
const port = process.env.port || 5000;
const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.get("/", async(req, res) => {
    res.send("Server is running...");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});