const fs = require('fs');

class FileReader {
    constructor(filePath) {
        this.filePath = filePath;
    }

    readStreetsFromJSON() {
        try {
            const data = fs.readFileSync(this.filePath);
            const streets = JSON.parse(data);
            return streets;
        } catch (error) {
            console.error(`Ошибка при чтении файла: ${error.message}`);
            throw error;
        }
    }
}

module.exports = FileReader;
