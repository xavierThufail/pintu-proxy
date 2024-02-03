const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*'
}))

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/supported-currencies', (req, res) => {
  axios('https://api.pintu.co.id/v2/wallet/supportedCurrencies')
    .then((response) => {
      return res.json(response.data);
    })
    .catch((err) => res.status(500).json({ type: 'error', message: err.message }))
});

app.get('/price-changes', (req, res) => {
  axios('https://api.pintu.co.id/v2/trade/price-changes')
    .then((response) => {
      return res.json(response.data);
    })
    .catch((err) => res.status(500).json({ type: 'error', message: err.message }))
});

app.get('/time', (req, res) => {
  res.json(Date.now());
})

app.get('/uiKlines', (req, res) => {
  const { symbol, interval, limit } = req.query;
  const url = `https://api.binance.com/api/v3/uiKlines?symbol=${symbol}&interval=${interval}&limit=${limit}`;

  axios(url)
    .then((response) => {
      const data = res.json(response.data);
      return data;
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ type: 'error', message: err.message })
    })
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));

module.exports = app;
