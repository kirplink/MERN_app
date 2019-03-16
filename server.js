const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const passport = require("passport");
const routes = require("./routes");

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");

// Define middleware here
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ secret: "letsgoflyakite" }));
app.use(passport.initialize());
app.use(passport.session());

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
	//set static folder
	// ... other app.use middleware
	app.use(express.static(path.join(__dirname, "client", "build")));

	// ...
	// Right before your app.listen(), add this:
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "client", "build", "index.html"));
	});
}

//connect to mongdb
mongoose
	.connect(process.env.MONGODB_URI || "mongodb://localhost/travelappDB")
	.then(() => console.log("MongoDB Connected"))
	.catch(err => console.log(err));

require("./config/passport")(passport);

// routes
require("./routes/api/userAuth")(app, passport);
app.use(routes);

// Start the API server
app.listen(PORT, function() {
	console.log(`Server started at http://localhost:${PORT}`);
});
