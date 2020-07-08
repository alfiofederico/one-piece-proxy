const express = require('express');
const request = require('request');
const baseApiUrl = 'https://onepiececover.com';

const getDataFromApi = (requestUrl, res) => {
  return request({ url: requestUrl }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.status(500).send({
        type: 'error',
        message: error.message,
        stack: error.stack
      });
    } else {
      return res.status(200).send(body);
    }
  });
};

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  return res.status(200).send({ type: 'success', message: 'It works!' });
});

app.get('/api/chapters/', (req, res) => {
  const urlPath = req.path;
  const requestUrl = `${baseApiUrl}${urlPath}`;
  return getDataFromApi(requestUrl, res);
});

app.get('/api/chapters/:number', (req, res) => {
  const urlPath = req.path;
  const requestUrl = `${baseApiUrl}${urlPath}`;
  return getDataFromApi(requestUrl, res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
