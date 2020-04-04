const express = require('express');
const router = express.Router();
const db = require('../db');
const fastcsv = require('fast-csv');
const fs = require('fs');
const ws = fs.createWriteStream(
  //Not sure how this would work for downloading from online
  '/Users/stephenchow/Downloads/test_coinbase-data_1.csv'
);

//For downloading CSV
const Pool = require('pg').Pool;
const client = new Pool({
  host: 'localhost',
  user: 'stephenchow',
  database: 'BTC_historic_rates',
  port: process.env.PORT,
});
const tableName = 'BTC_historical_rates';

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

//Sort time DSC - DEFAULT
router.get('/sortByTimeDesc', async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM BTC_historic_rates DESC');

    return res.json({ data: result.rows });
  } catch (e) {
    return next(e);
  }
});

//Sort time ASC
router.get('/sortByTimeAsc', async (req, res, next) => {
  try {
    const result = await db.query(
      'SELECT * FROM BTC_historic_rates ORDER BY time ASC'
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
      'SELECT * FROM BTC_historic_rates ORDER BY high DESC'
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
      'SELECT * FROM BTC_historic_rates ORDER BY high ASC'
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
      'SELECT * FROM BTC_historic_rates ORDER BY low DESC'
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
      'SELECT * FROM BTC_historic_rates ORDER BY low ASC'
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
      'SELECT * FROM BTC_historic_rates ORDER BY open DESC'
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
      'SELECT * FROM BTC_historic_rates ORDER BY open ASC'
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
      'SELECT * FROM BTC_historic_rates ORDER BY close DESC'
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
      'SELECT * FROM BTC_historic_rates ORDER BY close ASC'
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
      'SELECT * FROM BTC_historic_rates ORDER BY volume DESC'
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
      'SELECT * FROM BTC_historic_rates ORDER BY volume ASC'
    );

    return res.json({ data: result.rows });
  } catch (e) {
    return next(e);
  }
});

//Download CSV from dB
router.get('/download', async (req, res, next) => {
  try {
    client.connect((err, client, done) => {
      // error handling for the client instance connection
      if (err) throw err;
      // SQL string that selects all records from a table
      const sqlQuery = `SELECT * FROM BTC_historic_rates`;
      client.query(sqlQuery, (err, res) => {
        if (err) {
          console.log('client.query()', err.stack);
        }
        if (res) {
          const jsonData = JSON.parse(JSON.stringify(res.rows));
          //Gets to here and then stops
          console.log('\njsonData:', jsonData);
          // write the JSON data as a CSV file
          // log message when finished
          fastcsv
            .write(jsonData, { headers: true })
            .on('finish', function () {
              console.log(
                `Postgres table BTC_historic_rates exported to CSV file successfully.`
              );
            })
            .pipe(ws);
        }
        //Script not closing/ending when done
        done(console.log('Creating CSV from client.query() data'));
      });
    });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
