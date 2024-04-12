const axios = require('axios');

class Requests {
    async sendAddressRequest(address) {
        try {
            const response = await axios.get(`http://localhost:3003/api/aress/list?address=${address}`);
            return response.data !== "server is not available" ? response.data : null;
        } catch (error) {
            console.error(`Ошибка при запросе адреса ${address}: ${error.message}`);
            return null;
        }
    }
}

module.exports = Requests;
