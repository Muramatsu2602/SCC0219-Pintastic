const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose')

require('dotenv').config()

const routes = require('./routes/Routes');
const PintasticException = require('./models/exceptions/PintasticException');

const PORT = process.env.PORT || 8080;

// Create Express app
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof PintasticException) {
    return response.status(error.getHttpStatusCode()).json({
      'error': error.getBusinessError(),
    });
  }

  console.error(error);
  return response.status(500).end();
});

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser : true,
  useUnifiedTopology : true,
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
