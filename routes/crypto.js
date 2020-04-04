const express = require('express');
const router = express.Router();
const db = require('../db');

//Coinbase PRO - Public API
const CoinbasePro = require('coinbase-pro');
const publicClient = new CoinbasePro.PublicClient();

// Initial Seeding of dB
// router.get('/seedDB', async (req, res, next) => {
//   try {
//     //Make API call here
//     const products = await publicClient.getProductHistoricRates('BTC-USD', {
//       granularity: 86400,
//     });

//     //Once we have the data, add it to the db
//     for (arr of products) {
//       const data = await db.query(
//         'INSERT INTO BTC_historic_rates (time, low, high, open, close, volume) VALUES ($1, $2, $3, $4, $5, $6)',
//         [arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]]
//       );
//     }

//     API returns 300 days
//     return res.json({ result: data });
//   } catch (e) {
//     return next(e);
//   }
// });

router.get('/getData', async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM BTC_historic_rates');

    return res.json({ data: result.rows });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
