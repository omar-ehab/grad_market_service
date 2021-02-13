const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();


const market_routes = require("./routes/market");

const PORT = process.env.PORT || 80;

const app = express();


app.use(helmet());
app.use(cors());
app.use(bodyParser.json());


//market routes
app.use('/markets', market_routes);

//404 error
app.use(async (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "not fount"
  });
});

//other errors handler
app.use((err, req, res) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    }
  });
});


// CONNECTING TO HTTP SERVER .........

app.listen(PORT, () => {
  console.log("\n [+] HTTP server is listening on port " + PORT + "\n");
});


