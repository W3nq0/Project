const express = require('express');
const bodyParser = require('body-parser');
const AllStreets = require('./StreetEndpointHandler.js');
const FileManager = require('./ExcelDownloadHandler.js');
const CacheAddress = require('./CacheUpdater.js');
const CityVariations = require('./VariationsHandler.js');
const createUseCases = require('../../UseCases/UseCases.js');
const path = require('path');
const app = express();

app.use(bodyParser.json());

const filePath = path.resolve(__dirname, '../../Data/AD.json');
const useCases = createUseCases(filePath);

app.use('/streets', AllStreets(useCases));
app.use('/files', FileManager(useCases));
app.use('/address', CacheAddress(useCases));
app.use('/variations', CityVariations(useCases));

module.exports = app;
