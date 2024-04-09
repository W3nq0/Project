
const repository = require('../../Repository');

class FileManager {
    static async getStreets() {
        try {
            const streetsData = await repository.getOldExcel();

            if (streetsData && streetsData.length > 0) {
                console.log('Адреса успешно получены');
                return streetsData;
            } else {
                throw new Error('Не удалось получить адреса');
            }
        } catch (error) {
            console.error('Ошибка при получении адресов:', error.message);
            return null;
        }
    }
}

module.exports = FileManager;
