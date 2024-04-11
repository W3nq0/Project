const fs = require('fs');

class AddressService {
    readStreetsFromJSON(filePath) {
        try {
            const data = fs.readFileSync(filePath);
            this.streets = JSON.parse(data);
        } catch (error) {
            console.error(`Ошибка при чтении файла: ${error.message}`);
            throw error;
        }
    }

    async checkAddressesForStreet(streetName, filePath) {
        try {
            if (!this.streets.length) {
                this.readStreetsFromJSON(filePath);
            }
            let successfulAddressesCount = 0; 
            for (let houseNumber = 1; houseNumber <= this.maxHouseNumber; houseNumber++) {
                let foundAddressWithoutCorpus = false;
                for (let corpusNumber = 0; corpusNumber <= this.maxCorpusNumber; corpusNumber++) {
                    const address = `${streetName} ${houseNumber} ${corpusNumber > 0 ? corpusNumber : ''}`;
                    const response = await axios.get(`https://api.maps.by/api/address/list?address=${address}`);
                    if (response.data !== "server is not available") {
                        successfulAddressesCount++; 
                        foundAddressWithoutCorpus = true;
                    } else {
                        if (foundAddressWithoutCorpus) {
                            continue;
                        }
                    }
                }
            }
            return successfulAddressesCount; 
        } catch (error) {
            console.error(`Ошибка при проверке адреса ${address}: ${error.message}`);
            throw error;
        }
    }
}

module.exports = AddressService;
