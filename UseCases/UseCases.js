
const FileManagerGetDiff = require('./FileManager/getDiff');
const FileManagerGetStreet = require('./FileManager/getStreet');
const GeneratorExcel = require('./StreetService/GeneratorExcel');

class UseCases {
    constructor() {
        this.fileManagerDiff = new FileManagerGetDiff();
        this.fileManagerStreet = new FileManagerGetStreet();
        this.generatorExcel = new GeneratorExcel();
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
}

module.exports = UseCases;
