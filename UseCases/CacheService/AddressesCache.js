const Repository = require('../../Repository/index.js');

class AddressesCache {
    constructor() {
        this.requests = new Repository();
    }

    async checkAddressesForStreet(streetName) {
        const maxHouseNumber = 1;
        const maxCorpusNumber = 20;
        let successfulRequestsCount = 0;

        for (let houseNumber = 1; houseNumber <= maxHouseNumber; houseNumber++) {
            let foundAddressWithoutCorpus = false;
            for (let corpusNumber = 0; corpusNumber <= maxCorpusNumber; corpusNumber++) {
                const address = `${streetName} ${houseNumber}${corpusNumber > 0 ? ' ' + corpusNumber : ''}`;
                const responseData = await this.requests.sendAddressRequest(address);
                if (responseData) {
                    successfulRequestsCount++;
                    foundAddressWithoutCorpus = true;
                } else {
                    if (foundAddressWithoutCorpus) {
                        continue;
                    }
                }
            }
        }
        return successfulRequestsCount;
    }
}

module.exports = AddressesCache;
