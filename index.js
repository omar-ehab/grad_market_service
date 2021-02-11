const express = require('express');
const bodyParser = require('body-parser');
const market_routes = require("./routes/market");

const app = express();


// Syn the database ...........

/*
const {sequelize} = require("./models/index");

sequelize.sync().then(()=>{
    console.log("\n [+] Successfully connected to database ....\n");
}).catch(err => {
    console.log("\n [!] Couldn't connect to database <<<============\n\n" + err + "\n");
});
*/


// HTTP behavior configuration .........

const http_port = 4444;

app.use(bodyParser.json());
app.use(market_routes);



// CONNECTING TO HTTP SERVER .........

app.listen(http_port, () => {
    console.log("\n [+] HTTP server is listening on port " + http_port + "\n");
}).on('error', (err) =>{
    console.log("\n [!] Couldn't connect to http server <<<=================\n\n" + err + "\n");
});


