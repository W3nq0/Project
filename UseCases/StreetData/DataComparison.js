const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const repository = require('../../Repository/index.js');

const writeFileAsync = promisify(fs.writeFile);

class FileManager {
    static async getDiff() {
        try {
            const streetsData = await repository.getLinksForRequest();
            console.log('Данные из API NCA:', streetsData);

            const oldExcelData = await repository.getOldExcel();
            console.log('Данные из Excel:', oldExcelData);

            const formattedOldExcelData = oldExcelData.map(row => ({
                id: row.id,
                name: row.name,
                region: row.region,
                district: row.district,
                city: row.city
            }));

            const difference = streetsData.filter(newItem => {
                return !formattedOldExcelData.some(oldItem => {
                    return oldItem.id === newItem.id &&
                        oldItem.name === newItem.name &&
                        oldItem.region === newItem.region &&
                        oldItem.district === newItem.district &&
                        oldItem.city === newItem.city;
                });
            });

            if (difference.length === 0) {
                console.log('Ничего не изменилось.');
                return 'Изменений нет';
            }

            const resultDif = path.resolve(__dirname, '../../Repository/bd/DifferenceData/difference.json');
            const resultMer = path.resolve(__dirname, '../../Repository/bd/MergedData/mergedData.json');

            const mergedDataPath = path.join(resultMer, 'mergedData.json');
            const differencePath = path.join(resultDif, 'difference.json');

            const jsonString = JSON.stringify(streetsData, null, 2);
            await writeFileAsync(mergedDataPath, jsonString);

            const differenceJsonString = JSON.stringify(difference, null, 2);
            await writeFileAsync(differencePath, differenceJsonString);

            console.log('Данные успешно сохранены в файл', mergedDataPath);
            console.log('Разница сохранена в файл', differencePath);

            return difference;
        } catch (error) {
            console.error('Ошибка:', error);
            return null;
        }
    }
}

module.exports = FileManager;
