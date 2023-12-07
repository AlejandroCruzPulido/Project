const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");

db.sequelize.sync().then(() => {
  console.log("Database synchronized.");
});

app.use(function (req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return next();

  if (req.headers.authorization.indexOf('Basic ') === 0) {
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');

    req.body.email = email;
    req.body.password = password;

    return next();
  }

  jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    } else {
      req.user = user;
      req.token = token;
      next();
    }
  });
});

require("./routes/glasses.routes")(app);
require("./routes/directions.routes")(app);
require("./routes/buys.routes")(app);
require("./routes/contain.routes")(app);
require("./routes/users.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
