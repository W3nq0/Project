const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path'); // Импортируем модуль path для работы с путями
const { promisify } = require('util'); // Импорт функции promisify из модуля util
const repository = require('../../Repository/index.js');

const writeFileAsync = promisify(fs.writeFile); // Преобразование функции writeFile в асинхронный стиль

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
    
            const resultDir = path.resolve(__dirname, '../../Result'); // Путь к папке Result
            const mergedDataPath = path.join(resultDir, 'mergedData.json');
            const differencePath = path.join(resultDir, 'difference.json');
    
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
