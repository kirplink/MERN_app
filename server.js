const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const passport = require("passport");

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");

mongoose
	.connect(process.env.MONGODB_URI || "mongodb://localhost/merndb")
	.then(() => console.log("MongoDB Connected"))
	.catch(err => console.log(err));

require("./config/passport")(passport);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ secret: "iloveschotchscotchscotchscotch" }));
app.use(passport.initialize());
app.use(passport.session());

require("./routes/api/userAuth")(app, passport);

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
	//set static folder
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dir, "client", "build", "index.html"));
	});
}

app.listen(port, () =>
	console.log(`Server started at http://localhost:${port}`)
);
