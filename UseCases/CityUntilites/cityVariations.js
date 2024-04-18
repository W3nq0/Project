const xlsx = require('xlsx');

class CityVariationsLogic {

    async getCityVariations(excelFilePath) {
        try {
            const workbook = xlsx.readFile(excelFilePath);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const jsonData = xlsx.utils.sheet_to_json(sheet);

            const allVariations = [];
            const pgtVariations = [];

            jsonData.forEach(row => {
                const cityName = row['City'];

                if (cityName) {
                    allVariations.push(cityName); 
                    allVariations.push(`г. ${cityName}`); 
                    allVariations.push(`г ${cityName}`);
                }

                const pgtName = row['PGT'];

                if (pgtName) {
                    pgtVariations.push(pgtName);
                    pgtVariations.push(`пгт ${pgtName}`); 
                    pgtVariations.push(`пгт. ${pgtName}`);
                }
            });

            const mergedVariations = [...allVariations, ...pgtVariations];

            return mergedVariations;
        } catch (error) {
            throw new Error('Ошибка при чтении Excel файла');
        }
    }
}

module.exports = CityVariationsLogic;
