// UseCases/index.js
const FileManagerGetDiff = require('./FileManager/getDiff');
const FileManagerGetStreet = require('./FileManager/getStreet');
const GeneratorExcel = require('./StreetService/GeneratorExcel');
const AddressService = require('./StreetsManager/getApi');

class UseCases {
    constructor() {
        this.fileManagerDiff = new FileManagerGetDiff();
        this.fileManagerStreet = new FileManagerGetStreet();
        this.generatorExcel = new GeneratorExcel();
        this.checkAddressesForStreet = new AddressService();
        this.maxHouseNumber = 1000;
        this.maxCorpusNumber = 2000;
        this.streets = [];
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
    async checkAddressesForStreet() {
        return await AddressService.checkAddressesForStreet()
    }
}

module.exports = UseCases;
