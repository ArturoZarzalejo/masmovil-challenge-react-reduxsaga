/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const logger = require('./logger');

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

app.post('/phones', function (req, res) {
  const phones = [
    {
        f: 1,
        brand: 'Apple',
        title: 'iPhone X',
        color: 'Silver',
        photo: 'https://d1eh9yux7w8iql.cloudfront.net/product_images/36834_d5c1e1d6-1a45-4bf0-bdef-64635a61b659.jpg',
        description: '64 GB, 5.8" Super Retina HD Display, 12 Mpx, Red 4G LTE',
        price: '899.99$',
    },
    {
        f: 2,
        brand: 'Samsung',
        title: 'Galaxy S9+',
        color: 'Lilac Purple',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSO8z59mszGwJWxQ5Di4K54n5BOjjjhkEruE5nQ2j1xfCxcAalUjG6m1zCDf_dTJYoibBWdnEs&usqp=CAc',
        description: '64 GB, 6.2â€ QHD Super AMOLED Display, 8MP Front Facing Camera, Red 4G LTE',
        price: '840.00$'
    },
    {
        f: 3,
        brand: 'LG',
        title: 'V30',
        color: 'Silver',
        photo: 'data:image/jpeg;base64,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',
        description: '64 GB, Dual 16MP/13MP Wide Rear Camera, 6.0" QHD+ FullVision, Red 4G LTE',
        price: '696.00$'
    },
    {
        f: 4,
        brand: 'Motorola',
        title: 'Moto e Plus 5th Gen',
        color: 'Blue',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRHB3ysj3WOj0a_cyuRYUtGH8-4iylRt4qoeFvzgtnULiLVdmN1RKyWKHKl4vAJ9n5e0qU1VxE&usqp=CAc',
        description: '32 GB, 6" Max Vision Display, Red 4G LTE',
        price: '225.00$'
    },
    {
      f: 5,
      brand: 'Apple',
      title: 'iPhone X',
      color: 'Silver',
      photo: 'https://d1eh9yux7w8iql.cloudfront.net/product_images/36834_d5c1e1d6-1a45-4bf0-bdef-64635a61b659.jpg',
      description: '64 GB, 5.8" Super Retina HD Display, 12 Mpx, Red 4G LTE',
      price: '899.99$',
  },
];
  res.send(phones);
});

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
