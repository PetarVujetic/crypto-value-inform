const express = require('express');
const fetch = require('node-fetch');
const sendMail = require('./api/utils/sendEmail');
const app = express();
const notifRouter = require('./api/v1/routes/notifRouter');
const db = require('./config/db');
const dotenv = require('dotenv');
const Contact = require('./api/v1/models/Contact');
dotenv.config('../.env');
db();


const PORT = process.env.PORT || 8000;

//Middlewares
app.use(express.json())

//routes
app.use('/api/v1/', notifRouter);


function inform(coin) {
  fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${coin}`, {
    method: "GET",
    headers: {
      'Content-Type': 'appliction/json',
      'Accept-Encoding': 'deflate, gzip',
      'X-CMC_PRO_API_KEY': `${process.env.CRY_API_KEY}`
    },
  }).then(response => response.json())
    .then(async data => {

      const price = data.data.BTC.quote.USD.price;
      let contacts = await Contact.find({});

      for (const contact of contacts) {
        if (contact.coin == coin && contact.priceDown && (contact.priceDown == price || contact.priceDown > price)) {
          sendMail(contact, `The price of ${coin} has dropped below ${contact.priceDown}$!`);
          contact.priceDown = null;
          await contact.save();
          console.log(`Email sent to ${contact.email}`);
        }

        if (contact.coin == coin && contact.priceUp && (contact.priceUp == price || contact.priceUp < price)) {
          sendMail(contact, `The price of ${coin} is above ${contact.priceUp}$!`);
          contact.priceUp = null;
          await contact.save();
          console.log(`Email sent to ${contact.email}`);
        }

        if (!contact.priceDown && !contact.priceUp) await Contact.deleteOne({ id: contact.id });
      }

      console.log("Price:", price);
    })
}


setInterval(inform, 5000, 'btc');


app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
})
