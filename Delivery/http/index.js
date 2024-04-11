const express = require('express');
const bodyParser = require('body-parser');
const StreetRoutes = require('./StreetRoutes');
const FileManagerRoutes = require('./FileManagerRoutes');
const AddressRoutes = require('./AddressRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/streets', StreetRoutes);
app.use('/files', FileManagerRoutes);
app.use('/address', AddressRoutes);


app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

module.exports = app;
