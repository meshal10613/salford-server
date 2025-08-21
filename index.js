require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.port || 5000;
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');


const uri = `mongodb+srv://${process.env.VITE_USERNAME}:${process.env.VITE_PASSWORD}@meshal10613.mbbtx0s.mongodb.net/?retryWrites=true&w=majority&appName=meshal10613`;

// middleware
app.use(express.json());
app.use(cors());

app.get("/", async(req, res) => {
    res.send("Server is running...");
});

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const database = client.db("salford");
    const usersCollection = database.collection("users");
    const productsCollection = database.collection("products");

    // usersCollection


    // productsCollection
    
};

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});