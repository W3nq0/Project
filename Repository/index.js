const GetNca = require('./Nca');
const WorkFiles = require('./FileExLink');
const Requests = require('./Requests');


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
    async sendAddressRequest() {
        return await Requests.sendAddressRequest();
    }
}

module.exports = Repository;
