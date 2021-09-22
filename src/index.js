const express = require('express');
const fetch = require('node-fetch');

const app = express();
const notifRouter = require('./api/v1/routes/notifRouter');
const db = require('./config/db');
const dotenv = require('dotenv');
dotenv.config('../.env');
db();


const PORT = process.env.PORT || 8000;

//Middlewares
app.use(express.json())

//routes
app.use('/api/v1/', notifRouter);


function inform() {
  fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=1', {
    method: "GET",
    headers: {
      'Content-Type': 'appliction/json',
      'Accept-Encoding': 'deflate, gzip',
      'X-CMC_PRO_API_KEY': `${process.env.CRY_API_KEY}`
    },
  }).then(response => response.json())
    .then(data => {
      console.log("Success:", data.data[1].quote.price);
    })
}


setTimeout(inform, 5000);


app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
})
