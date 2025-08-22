require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.port || 5000;
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


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

// Send a ping to confirm a successful connection
// await client.db("admin").command({ ping: 1 });
console.log("Pinged your deployment. You successfully connected to MongoDB!");

const database = client.db(`${process.env.VITE_USERNAME}`);
const usersCollection = database.collection("users");
const productsCollection = database.collection("products");

// usersCollection
app.get("/users", async(req, res) => {
    const result = await usersCollection.find().toArray();
    res.send(result);
});

app.get("/users/:email", async(req, res) => {
    const {email} = req.params;
    const result = await usersCollection.findOne({email});
    res.send(result);
});

app.post("/users", async(req, res) => {
    const data = req.body;
    const isEmail = await usersCollection.findOne({email: data.email});
    if(isEmail){
        return res.json({message: "user already created"})
    };
    const result = await usersCollection.insertOne(data);
    res.send(result);
});

// productsCollection
app.get("/products", async(req, res) => {
    const { feature } = req.query;
    if(feature){
        const result = await productsCollection.find().sort({ price: 1 }).limit(6).toArray();
        res.send(result);
        return;
    };
    const result = await productsCollection.find().toArray();
    res.send(result);
});

app.get("/products/:id", async(req, res) => {
    const {id} = req.params;
    const query = {
        _id: new ObjectId(id)
    };
    const result = await productsCollection.findOne(query);
    res.send(result);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});