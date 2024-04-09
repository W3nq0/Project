const express = require('express');
const router = express.Router();
const Street = require('../../UseCases/UseCases');

router.get('/getStreets', async (req, res) => {
    try {
        const streetInstance = new Street();
        const streetsData = await streetInstance.getStreets();
        res.json(streetsData);
    } catch (error) {
        console.error('Ошибка:', error.message);
        res.status(500).json({ error: 'Ошибка при получении списка улиц' });
    }
});

router.get('/getDiff', async (req, res) => {
    try {
        const streetInstance = new Street();
        const diffData = await streetInstance.getDiff();
        res.json(diffData);
    } catch (error) {
        console.error('Ошибка:', error.message);
        res.status(500).json({ error: 'Ошибка при получении разницы данных' });
    }
});

module.exports = router;
