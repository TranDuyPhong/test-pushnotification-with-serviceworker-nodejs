const express = require('express');
const bodyParser = require('body-parser');
const webPush = require('web-push');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

const publicVapidKey = 'BP8xdy2-qfPrIBmEe9_l8J8vJmQyqGB8dOkvrozglsHXF3IK-840yRoKUdJvt8-B7zLG8v-nUmktHlig96_AS10';
const privateVapidKey = 'DsgrTBEuIcXy19sRQwgvLuoYenBpn5uCiJxUqxGVwww';

webPush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

app.post('/subcribe', (req, res) => {
    const subcription = req.body;

    res.status(201).json({});

    const payload = JSON.stringify({
        title: 'Push Test'
    });

    webPush.sendNotification(subcription, payload);
});

const PORT = 7000;

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});