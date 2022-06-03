require('dotenv').config();
const functions = require('firebase-functions');

// since in node, can't use es6 import module functionality
const express = require('express');
const cors = require('cors');
const config = functions.config().env;
const stripe = require('stripe')(config.stripe.secret);
//API

//App Config
const app = express();

//Middlewares
app.use(cors({ origin: 'https://clone-stripe.web.app/' }));
app.use(express.json());

//API Routes
app.get('/', (req, res) => res.status(200).send('hello world'));

app.post('/payments/create', async (req, res) => {
  const total = req.query.total;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'usd',
  });
  res.status(201).send({
    clientSecret: paymentIntent,
  });
});
// Listen Command
exports.api = functions.https.onRequest(app);
