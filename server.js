const express = require('express');
const fs = require('fs');
const Papa = require('papaparse');
const path = require('path');
const csvFilePath = 'src/assets/data.csv';

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.urlencoded({extended: false}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/data', function (req, res) {
    const csv = fs.readFileSync(csvFilePath, 'utf8');
    const parsed = Papa.parse(csv);
    res.send(parsed.data);
});

app.post('/data', function (req, res) {
    const data = Papa.unparse(req.body);
    try {
        fs.writeFileSync(csvFilePath, data, 'utf8');
        res.send();
    } catch (error) {
        res.status(403).end();
    }
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

let port = Number(process.env.PORT || 8081);
app.listen(port, function () {
    console.log('Server running at localhost:' + port);
});
