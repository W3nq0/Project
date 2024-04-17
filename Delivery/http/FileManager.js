const archiver = require('archiver');
const express = require('express');
const router = express.Router();

module.exports = (useCases) => {
    router.get('/downloadExcel', async (req, res) => {
        try {
            const { mergedFileName, diffFileName } = await useCases.generateExcel();

            const archive = archiver('zip', {
                zlib: { level: 9 } 
            });

            res.attachment('excel_files.zip');
            archive.pipe(res);

            archive.file(mergedFileName, { name: 'AdressesExcel.xlsx' });
            archive.file(diffFileName, { name: 'difference.xlsx' });

            archive.finalize();
        } catch (error) {
            console.error('Ошибка:', error.message);
            res.status(500).json({ error: 'Ошибка при генерации и скачивании файлов Excel' });
        }
    });

    return router;
};
