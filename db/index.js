const { Client } = require('pg');

const client = new Client({
  connectionString:
    process.env.DATABASE_URL || 'postgresql://localhost/BTC_historic_rates',
});

client.connect();

module.exports = client;
