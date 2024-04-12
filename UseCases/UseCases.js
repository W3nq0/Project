// UseCases/index.js
const FileManagerGetDiff = require('./FileManager/getDiff');
const FileManagerGetStreet = require('./FileManager/getStreet');
const GeneratorExcel = require('./StreetService/GeneratorExcel');
const AddressCache = require('./StreetsManager/AddressesCache.js');
const FileReader = require('./StreetsManager/fileReader.js');

class UseCases {
    constructor(filePath) {
        this.fileManagerDiff = new FileManagerGetDiff();
        this.fileManagerStreet = new FileManagerGetStreet();
        this.generatorExcel = new GeneratorExcel();
        this.cacheAddresses = new AddressCache();
        this.checkAddress = new FileReader(filePath);
    }

    async getStreets() {
        return await FileManagerGetStreet.getStreets();
    }
    async getDiff() {
        return await FileManagerGetDiff.getDiff();
    }

    async generateExcel() {
        return await GeneratorExcel.generate();
    }
    async readStreetsFromJSON() {
        return await this.checkAddress.readStreetsFromJSON(); 
    }

    async checkAddressesForStreet(streetName) {
        return await this.cacheAddresses.checkAddressesForStreet(streetName); 
    }
}

module.exports = UseCases;
