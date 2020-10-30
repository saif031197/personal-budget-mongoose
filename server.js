const { response } = require('express');
const express = require('express');
const app = express();
const port=4000;

app.use('/', express.static('public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const budget = {
}

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/budget', (req, resp, next) => {
    resp.sendFile(__dirname + '/budget.json')
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:4000')
});