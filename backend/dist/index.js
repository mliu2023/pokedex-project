"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
require("dotenv").config(".env");
const app = (0, express_1.default)();
const port = 8080; // Default port to listen on.
let db;
// Middleware.
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
}));
app.use(body_parser_1.default.urlencoded({ extended: false }));
// Route definitions
app.get("/emails", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = db.collection("emails");
    const result = yield collection.find({}).toArray();
    return res.json(result);
}));
app.post("/emails", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = db.collection("emails");
    const newEmail = { email: req.body.email };
    try {
        yield collection.insertOne(newEmail);
        return res.json(newEmail);
    }
    catch (e) {
        return res.status(500).send();
    }
}));
app.get("/emails/:emailID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emailID = req.params.emailID;
    const collection = db.collection("emails");
    try {
        const result = yield collection.findOne({ "_id": new mongodb_1.ObjectId(emailID) });
        return res.json(result);
    }
    catch (e) {
        return res.status(404).send(`no email found with id ${emailID}`);
    }
}));
app.patch("/emails/:emailID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emailID = req.params.emailID;
    const data = req.body;
    const collection = db.collection("emails");
    try {
        const result = yield collection.updateOne({ "_id": new mongodb_1.ObjectId(emailID) }, { $set: data });
        return res.json(result);
    }
    catch (e) {
        return res.status(404).send(`no email found with id ${emailID}`);
    }
}));
app.delete("/emails/:emailID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emailID = req.params.emailID;
    const collection = db.collection("emails");
    try {
        const result = yield collection.deleteOne({ "_id": new mongodb_1.ObjectId(emailID) });
        return res.json(result);
    }
    catch (e) {
        return res.status(404).send(`no email found with id ${emailID}`);
    }
}));
app.get("/pokemon", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = db.collection("pokemon");
    const result = yield collection.find({}).toArray();
    return res.json(result);
}));
app.post("/pokemon", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = db.collection("pokemon");
    const newPokemon = {
        name: req.body.name,
        image: req.body.image,
        stats: req.body.stats,
        types: req.body.types,
    };
    try {
        yield collection.insertOne(newPokemon);
        return res.json(newPokemon);
    }
    catch (e) {
        return res.status(500).send();
    }
}));
app.get("/pokemon/:pokemonID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pokemonID = req.params.pokemonID;
    const collection = db.collection("pokemon");
    try {
        const result = yield collection.findOne({ "_id": new mongodb_1.ObjectId(pokemonID) });
        return res.json(result);
    }
    catch (e) {
        return res.status(404).send(`no pokemon found with id ${pokemonID}`);
    }
}));
app.patch("/pokemon/:pokemonID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pokemonID = req.params.pokemonID;
    const data = req.body;
    const collection = db.collection("pokemon");
    try {
        const result = yield collection.updateOne({ "_id": new mongodb_1.ObjectId(pokemonID) }, { $set: data });
        return res.json(result);
    }
    catch (e) {
        return res.status(404).send(`no pokemon found with id ${pokemonID}`);
    }
}));
app.delete("/pokemon/:pokemonID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pokemonID = req.params.pokemonID;
    const collection = db.collection("pokemon");
    try {
        const result = yield collection.deleteOne({ "_id": new mongodb_1.ObjectId(pokemonID) });
        return res.json(result);
    }
    catch (e) {
        return res.status(404).send(`no pokemon found with id ${pokemonID}`);
    }
}));
// ... add more endpoints here!
// Start the Express server.
function start() {
    const client = new mongodb_1.MongoClient(process.env.ATLAS_URI);
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
//# sourceMappingURL=index.js.map