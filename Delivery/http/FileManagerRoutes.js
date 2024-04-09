// Delivery/http/FileManagerRoutes.js
const archiver = require('archiver');
const express = require('express');
const router = express.Router();
const Street = require('../../UseCases/UseCases');

router.get('/downloadExcel', async (req, res) => {
    try {
        const streetInstance = new Street();
        const { mergedFileName, diffFileName } = await streetInstance.generateExcel();

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

module.exports = router;
