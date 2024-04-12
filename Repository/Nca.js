const axios = require('axios');
const xml2js = require('xml2js');

class GetNca {
    static async getNcaStreets(xmlLink, region, district, city) {
        try {
            const response = await axios.get(xmlLink, {
                headers: {
                    'Referer': 'https://gzk.nca.by/'
                }
            });

            const parser = new xml2js.Parser({ explicitArray: false });
            const result = await parser.parseStringPromise(response.data);
            const streets = result.response && result.response.street ? result.response.street : [];
            return streets.map(street => ({
                id: street.$.id,
                name: street._,
                region: region,
                district: district,
                city: city
            }));
        } catch (error) {
            throw new Error('Не удалось получить данные из API NCA');
        }
    }
}

module.exports = GetNca;
