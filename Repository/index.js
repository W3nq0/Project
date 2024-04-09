// index.js

const GetNca = require('./GetNca');
const WorkFiles = require('./WorkFiles');

class Repository {
    static async getNcaStreets(xmlLink, region, district, city) {
        return await GetNca.getNcaStreets(xmlLink, region, district, city);
    }

    static getOldExcel() {
        return WorkFiles.getOldExcel();
    }

    static async getLinksForRequest() {
        return await WorkFiles.getLinksForRequest();
    }
}

module.exports = Repository;
