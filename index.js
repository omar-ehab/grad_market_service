const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { sequelize } = require('./models');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();


const market_routes = require("./routes/market");

const PORT = process.env.SERVICE_PORT || 80;

const app = express();

const registerService = () => axios.put(`${process.env.APIGATEWAY_PROTOCOL}://${process.env.APIGATEWAY_HOST}:${process.env.APIGATEWAY_PORT}/register/${process.env.SERVICE_NAME}/${process.env.SERVICE_VERSION}/${PORT}`);





app.use(helmet());
app.use(cors());
app.use(express.json())


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

// app.listen(PORT,async ()  => {
//   console.log("\n [+] HTTP server is listening on port " + PORT + "\n");
//   await sequelize.sync({force: true})
// });

//database listen
app.listen(PORT, () => {

  registerService();
  setInterval(registerService, 25000);

  console.log(`server running at http://127.0.0.1:${PORT}`);
});


