const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const app = express();

const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
})
