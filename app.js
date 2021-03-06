const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const cryptoRoutes = require('./routes/crypto');
const cors = require('cors');

const BTCRoutes = require('./routes/bitcoin');
const ETHRoutes = require('./routes/ethereum');
const LTCRoutes = require('./routes/litecoin');

//Globals
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
//Issues when using Postman so trying url encoded
// app.use(bodyParser.urlencoded({ extended: true }));

app.use('/crypto/bitcoin', BTCRoutes);
app.use('/crypto/ethereum', ETHRoutes);
app.use('/crypto/litecoin', LTCRoutes);

app.use((req, res, next) => {
  var err = new Error('Not found');
  err.status = 404;
  return next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {},
  });
});

app.listen(PORT, () => {
  console.log(`Getting started on port ${PORT}`);
});
