const express = require('express');
const router = express.Router();
const path = require('path');

module.exports = (useCases) => {
    router.get('/cities-variations', async (req, res) => {
        try {
            const excelFilePath = path.resolve(__dirname, '../../Citys.xlsx');
            const variations = await useCases.getCityVariations(excelFilePath);

            res.json(variations);
        } catch (error) {
            console.error('Ошибка:', error);
            res.status(500).json({ error: error.message });
        }
    });
    return router;
};

