const express = require('express');
const router = express.Router();
const UseCases = require('../../UseCases/UseCases.js');
const path = require('path');

router.get('/setCache', async (req, res) => {
    try {
        const filePath = path.join(__dirname, '../../Data/AD.json'); 
        const useCases = new UseCases(filePath); 
        const streetsData = await useCases.readStreetsFromJSON();
        let totalSuccessfulRequests = 0;
        for (let street of streetsData) {
            const successfulRequestsCount = await useCases.checkAddressesForStreet(street);
            totalSuccessfulRequests += successfulRequestsCount;
        }
        res.json({ totalSuccessfulRequests });
    } catch (error) {
        res.status(500).json({ error: "Ошибка при получении адресов" });
    }
});

module.exports = router;
