const xlsx = require('xlsx');
const path = require('path');

class GeneratorExcel {
    static async generate() {
        try {
            const resultDif = path.resolve(__dirname, '../../Repository/bd/DifferenceData'); 
            const resultMer = path.resolve(__dirname, '../../Repository/bd/MergedData'); 
            const resultAdr = path.resolve(__dirname, '../../Repository/bd/AdressesData'); 
            const dataDir = path.resolve(__dirname, '../../Data');

            const mergedData = require(path.join(resultMer, 'mergedData.json'));
            const differences = require(path.join(resultDif, 'difference.json'));
            
            const mergedWorkbook = xlsx.utils.book_new();
            const mergedWorksheet = xlsx.utils.json_to_sheet(mergedData);
            xlsx.utils.book_append_sheet(mergedWorkbook, mergedWorksheet, "Merged Data");
            
            const mergedFileName = path.join(resultAdr, 'AdressesExcel.xlsx');
            xlsx.writeFile(mergedWorkbook, mergedFileName);
    
            console.log(`Файл Excel с объединенными данными успешно создан: ${mergedFileName}`);

            const mergedFileNameData = path.join(dataDir, 'AdressesExcel.xlsx');
            xlsx.writeFile(mergedWorkbook, mergedFileNameData);
    
            console.log(`Файл Excel с объединенными данными успешно создан в папке Data: ${mergedFileNameData}`);
    
            const differenceWorkbook = xlsx.utils.book_new();
            const differenceWorksheet = xlsx.utils.json_to_sheet(differences);
            xlsx.utils.book_append_sheet(differenceWorkbook, differenceWorksheet, "Difference Data");
    
            const diffFileName = path.join(resultDif, 'difference.xlsx');
            xlsx.writeFile(differenceWorkbook, diffFileName);
    
            console.log(`Файл Excel с разницей данных успешно создан: ${diffFileName}`);
    
            return { mergedFileName, diffFileName };
        } catch (error) {
            console.error('Ошибка при создании файлов Excel:', error.message);
            throw new Error('Ошибка при создании файлов Excel');
        }
    }
}

module.exports = GeneratorExcel;
