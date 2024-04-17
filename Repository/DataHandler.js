const fs = require('fs');
const xlsx = require('xlsx');
const path = require('path');
const GetNca = require('./NcaAPI');


class WorkFiles {
    static getOldExcel() {
        const filePath = path.resolve(__dirname, '../Data/AdressesExcel.xlsx');
        if (!fs.existsSync(filePath)) {
            throw new Error('Файл AdressesExcel.xlsx не найден');
        }
        try {
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(sheet, { header: ["id", "name", "region", "district", "city"], range: 1 });
            return data;
        } catch (error) {
            throw new Error('Ошибка при чтении Excel файла');
        }
    }
    static async getLinksForRequest() {
        try {
            const jsonDataPath = path.resolve(__dirname, './bd/AdressesRequest/jest2.json');
            const jsonData = fs.readFileSync(jsonDataPath, 'utf8');
            const data = JSON.parse(jsonData);
            let allStreets = [];

            for (const entry of data) {
                const xmlLink = entry.link;
                const region = entry.region;
                const district = entry.district;
                const city = entry.city;
                const streetNames = await GetNca.getNcaStreets(xmlLink, region, district, city);

                allStreets = allStreets.concat(streetNames);
                console.log('\n');
            }

            return allStreets;
        } catch (error) {
            throw new Error('Ошибка при получении адресов:', error.message);
        }
    }
}

module.exports = WorkFiles;
