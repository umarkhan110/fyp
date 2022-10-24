const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const cors = require("cors");
mongoose.connect("mongodb://umar:khan@cluster0-shard-00-00.mxj00.mongodb.net:27017,cluster0-shard-00-01.mxj00.mongodb.net:27017,cluster0-shard-00-02.mxj00.mongodb.net:27017/fypdatabase?ssl=true&replicaSet=atlas-vsqdmj-shard-0&authSource=admin&retryWrites=true&w=majority").
    then(() => { console.log("Fyp Database is connected") })
    .catch((e) => { console.log(e + "It's not ok") });
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/', express.static('uploads'));
app.use("/fypc", require("./routes/fypclient.js"));
app.use("/fypsp", require("./routes/fypsp.js"));

if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
    
}

app.listen(PORT, () => { console.log("Port is listening  ") });