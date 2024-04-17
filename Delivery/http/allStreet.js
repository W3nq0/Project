const express = require('express');
const router = express.Router();

module.exports = (useCases) => {
    router.get('/getStreets', async (req, res) => {
        try {
            const streetsData = await useCases.getStreets();
            res.json(streetsData);
        } catch (error) {
            console.error('Ошибка:', error.message);
            res.status(500).json({ error: 'Ошибка при получении списка улиц' });
        }
    });

    router.get('/getDiff', async (req, res) => {
        try {
            const diffData = await useCases.getDiff();
            res.json(diffData);
        } catch (error) {
            console.error('Ошибка:', error.message);
            res.status(500).json({ error: 'Ошибка при получении разницы данных' });
        }
    });

    return router;
};
