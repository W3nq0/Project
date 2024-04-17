const FileManagerGetDiff = require('./FileManager/getDiff');
const FileManagerGetStreet = require('./FileManager/getStreet');
const GeneratorExcel = require('./StreetService/GeneratorExcel');
const AddressCache = require('./StreetsManager/AddressesCache.js');
const FileReader = require('./StreetsManager/fileReader.js');

class UseCases {
    constructor(filePath) {
        this.parseAndStoreData(filePath);
        this.fileManagerDiff = new FileManagerGetDiff();
        this.fileManagerStreet = new FileManagerGetStreet();
        this.generatorExcel = new GeneratorExcel();
        this.cacheAddresses = new AddressCache();
    }

    async parseAndStoreData(filePath) {
        try {
            const fileReader = new FileReader(filePath);
            this.streetsData = await fileReader.readStreetsFromJSON();
            console.log('Данные успешно прочитаны и сохранены в сторе класса UseCases');
        } catch (error) {
            console.error('Ошибка при чтении файла и сохранении данных:', error.message);
            throw error;
        }
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
        return this.streetsData;
    }

    async checkAddressesForStreet(streetName) {
        return await this.cacheAddresses.checkAddressesForStreet(streetName);
    }
}

module.exports = (filePath) => new UseCases(filePath);
