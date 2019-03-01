const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const items = require("./routes/api/items");

const app = express();

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/merndb")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

//use routes
app.use("/api/items", items);

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
    //set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dir, "client", "build", "index.html"));
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at http://localhost:${port}`));

