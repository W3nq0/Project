const FileManagerGetDiff = require('./StreetData/DataComparison.js');
const FileManagerGetStreet = require('./StreetData/StreetDataFetcher.js');
const GeneratorExcel = require('./StreetService/GeneratorExcel');
const AddressCache = require('./CacheService/AddressesCache.js');
const FileReader = require('./CacheService/fileReader.js');
const Variations = require('./CityUntilites/сityVariations.js')

class UseCases {
    constructor(filePath) {
        this.parseAndStoreData(filePath);
        this.fileManagerDiff = new FileManagerGetDiff();
        this.fileManagerStreet = new FileManagerGetStreet();
        this.generatorExcel = new GeneratorExcel();
        this.cacheAddresses = new AddressCache();
        this.cityVariationsLogic = new Variations();
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

    async getCityVariations(excelFilePath) {
        return await this.cityVariationsLogic.getCityVariations(excelFilePath);
    }
}


module.exports = (filePath) => new UseCases(filePath);
