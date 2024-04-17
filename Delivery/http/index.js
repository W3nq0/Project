const express = require('express');
const bodyParser = require('body-parser');
const AllStreets = require('./allStreet');
const FileManager = require('./FileManager');
const CacheAddress = require('./checkAddress');
const createUseCases = require('../../UseCases/UseCases.js');
const path = require('path'); 

const app = express();
const port = 3000;

app.use(bodyParser.json());

const filePath = path.resolve(__dirname, '../../Data/AD.json');

const useCases = createUseCases(filePath);

app.use('/streets', AllStreets(useCases));
app.use('/files', FileManager(useCases));
app.use('/address', CacheAddress(useCases));

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
