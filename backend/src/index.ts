import express from "express";
import { Db, MongoClient, ObjectId } from "mongodb";
import bodyParser from "body-parser";
import cors from "cors";
require("dotenv").config(".env");

const app = express();
const port = 8080; // Default port to listen on.
let db: Db;

// Middleware.
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));

// Route definitions

app.get("/emails", async (req, res) => {
  const collection = db.collection("emails");
  const result = await collection.find({}).toArray()
  return res.json(result);
});

app.post("/emails", async (req, res) => {
  const collection = db.collection("emails");
  const newEmail = { email: req.body.email };
  try {
    await collection.insertOne(newEmail);
    return res.json(newEmail);
  } catch (e) {
    return res.status(500).send();
  }
});

app.get("/emails/:emailID", async (req, res) => {
  const emailID = req.params.emailID;
  const collection = db.collection("emails");
  try {
    const result = await collection.findOne({ "_id": new ObjectId(emailID) });
    return res.json(result);
  } catch (e) {
    return res.status(404).send(`no email found with id ${emailID}`);
  }
});

app.patch("/emails/:emailID", async (req, res) => {
  const emailID = req.params.emailID;
  const data = req.body;
  const collection = db.collection("emails");
  try {
    const result = await collection.updateOne({ "_id": new ObjectId(emailID) }, { $set: data });
    return res.json(result);
  } catch (e) {
    return res.status(404).send(`no email found with id ${emailID}`);
  }
});

app.delete("/emails/:emailID", async (req, res) => {
  const emailID = req.params.emailID;
  const collection = db.collection("emails");
  try {
    const result = await collection.deleteOne({ "_id": new ObjectId(emailID) });
    return res.json(result);
  } catch (e) {
    return res.status(404).send(`no email found with id ${emailID}`);
  }
});

app.get("/pokemon", async (req, res) => {
  const collection = db.collection("pokemon");
  const result = await collection.find({}).toArray();
  return res.json(result);
});

app.post("/pokemon", async (req, res) => {
  const collection = db.collection("pokemon");
  const newPokemon = {
    name: req.body.name,
    image: req.body.image,
    stats: req.body.stats,
  };
  try {
    await collection.insertOne(newPokemon);
    return res.json(newPokemon);
  } catch (e) {
    return res.status(500).send();
  }
});

app.get("/pokemon/:pokemonID", async (req, res) => {
  const pokemonID = req.params.pokemonID;
  const collection = db.collection("pokemon");
  try {
    const result = await collection.findOne({ "_id": new ObjectId(pokemonID) });
    return res.json(result);
  } catch (e) {
    return res.status(404).send(`no pokemon found with id ${pokemonID}`);
  }
});

app.patch("/pokemon/:pokemonID", async (req, res) => {
  const pokemonID = req.params.pokemonID;
  const data = req.body;
  const collection = db.collection("pokemon");
  try {
    const result = await collection.updateOne({ "_id": new ObjectId(pokemonID) }, { $set: data });
    return res.json(result);
  } catch (e) {
    return res.status(404).send(`no email found with id ${pokemonID}`);
  }
});

app.delete("/pokemon/:pokemonID", async (req, res) => {
  const pokemonID = req.params.pokemonID;
  const collection = db.collection("pokemon");
  try {
    const result = await collection.deleteOne({ "_id": new ObjectId(pokemonID) });
    return res.json(result);
  } catch (e) {
    return res.status(404).send(`no pokemon found with id ${pokemonID}`);
  }
});

// ... add more endpoints here!

// Start the Express server.
function start() {
  const client = new MongoClient(process.env.ATLAS_URI);
  client
    .connect()
    .then(() => {
      console.log("Connected successfully to server");
      db = client.db("database");
      app.listen(port, () => {
        console.log(`server started at http://localhost:${port}`);
      });
    })
    .catch((err) => {
      console.log("error connecting to mongoDB!", err);
    });
}

start();