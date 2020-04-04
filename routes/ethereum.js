const express = require('express');
const router = express.Router();
const db = require('../db');

var schedule = require('node-schedule');

//Coinbase PRO - Public API
const CoinbasePro = require('coinbase-pro');
const publicClient = new CoinbasePro.PublicClient();

// Initial Seeding of dB
// router.get('/seedDB', async (req, res, next) => {
//   try {
//     //Make API call here
//     const products = await publicClient.getProductHistoricRates('ETH-USD', {
//       granularity: 86400,
//     });

//     //Once we have the data, add it to the db
//     for (arr of products) {
//       const data = await db.query(
//         'INSERT INTO ETH_historic_rates (time, low, high, open, close, volume) VALUES ($1, $2, $3, $4, $5, $6)',
//         [arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]]
//       );
//     }

//     // API returns 300 days
//     return res.json({ result: data });
//   } catch (e) {
//     return next(e);
//   }
// });

//Automate API calls to once a day
//I want to make API call everyday at 5AM
var j = schedule.scheduleJob('0 5 * * *', () => {
  console.log('Updating the dB for today', new Date());
  //Seed dB once a day with new data for today

  //Not sure if this route can be accessed outside of scheduler
  //I hope not or someone could add duplicates to dB
  router.get('/getToday', async (req, res, next) => {
    try {
      console.log('Making API call now');
      //Make API call here
      const products = await publicClient.getProductHistoricRates('ETH-USD', {
        granularity: 86400,
      });

      //Latest it has is yesterdays data
      var arr = products[0];
      //Update dB once a day, 5AM P?
      const data = await db.query(
        'INSERT INTO ETH_historic_rates (time, low, high, open, close, volume) VALUES ($1, $2, $3, $4, $5, $6)',
        [arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]]
      );

      // API returns 300 days
      return res.json({
        result: data,
      });
    } catch (e) {
      return next(e);
    }
  });
});

//Sort time DSC - DEFAULT
router.get('/sortByTimeDesc', async (req, res, next) => {
  try {
    const result = await db.query(
      'SELECT * FROM ETH_historic_rates ORDER BY time DESC'
    );

    return res.json({ data: result.rows });
  } catch (e) {
    return next(e);
  }
});

//Sort time ASC
router.get('/sortByTimeAsc', async (req, res, next) => {
  try {
    const result = await db.query(
      'SELECT * FROM ETH_historic_rates ORDER BY time ASC'
    );

    return res.json({ data: result.rows });
  } catch (e) {
    return next(e);
  }
});

//Sort High DSC
router.get('/sortByHighDesc', async (req, res, next) => {
  try {
    const result = await db.query(
      'SELECT * FROM ETH_historic_rates ORDER BY high DESC'
    );

    return res.json({ data: result.rows });
  } catch (e) {
    return next(e);
  }
});

//Sort High ASC
router.get('/sortByHighAsc', async (req, res, next) => {
  try {
    const result = await db.query(
      'SELECT * FROM ETH_historic_rates ORDER BY high ASC'
    );

    return res.json({ data: result.rows });
  } catch (e) {
    return next(e);
  }
});

//Sort Low DSC
router.get('/sortByLowDesc', async (req, res, next) => {
  try {
    const result = await db.query(
      'SELECT * FROM ETH_historic_rates ORDER BY low DESC'
    );

    return res.json({ data: result.rows });
  } catch (e) {
    return next(e);
  }
});

//Sort Low ASC
router.get('/sortByLowAsc', async (req, res, next) => {
  try {
    const result = await db.query(
      'SELECT * FROM ETH_historic_rates ORDER BY low ASC'
    );

    return res.json({ data: result.rows });
  } catch (e) {
    return next(e);
  }
});

//Sort Open DSC
router.get('/sortByOpenDesc', async (req, res, next) => {
  try {
    const result = await db.query(
      'SELECT * FROM ETH_historic_rates ORDER BY open DESC'
    );

    return res.json({ data: result.rows });
  } catch (e) {
    return next(e);
  }
});

//Sort Open ASC
router.get('/sortByOpenAsc', async (req, res, next) => {
  try {
    const result = await db.query(
      'SELECT * FROM ETH_historic_rates ORDER BY open ASC'
    );

    return res.json({ data: result.rows });
  } catch (e) {
    return next(e);
  }
});

//Sort Close DSC
router.get('/sortByCloseDesc', async (req, res, next) => {
  try {
    const result = await db.query(
      'SELECT * FROM ETH_historic_rates ORDER BY close DESC'
    );

    return res.json({ data: result.rows });
  } catch (e) {
    return next(e);
  }
});

//Sort Close ASC
router.get('/sortByCloseAsc', async (req, res, next) => {
  try {
    const result = await db.query(
      'SELECT * FROM ETH_historic_rates ORDER BY close ASC'
    );

    return res.json({ data: result.rows });
  } catch (e) {
    return next(e);
  }
});

//Sort Volume DSC
router.get('/sortByVolumeDesc', async (req, res, next) => {
  try {
    const result = await db.query(
      'SELECT * FROM ETH_historic_rates ORDER BY volume DESC'
    );

    return res.json({ data: result.rows });
  } catch (e) {
    return next(e);
  }
});

//Sort Volume ASC
router.get('/sortByVolumeAsc', async (req, res, next) => {
  try {
    const result = await db.query(
      'SELECT * FROM ETH_historic_rates ORDER BY volume ASC'
    );

    return res.json({ data: result.rows });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
