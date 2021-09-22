const express = require('express');
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


app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
})
