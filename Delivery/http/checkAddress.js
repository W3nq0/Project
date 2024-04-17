const express = require('express');
const router = express.Router();

module.exports = (useCases) => {
    router.get('/setCache', async (req, res) => {
        try {
            const streetsData = await useCases.readStreetsFromJSON();
            let totalSuccessfulRequests = 0;
            for (let street of streetsData) {
                const successfulRequestsCount = await useCases.checkAddressesForStreet(street);
                totalSuccessfulRequests += successfulRequestsCount;
            }
            res.json({ totalSuccessfulRequests });
        } catch (error) {
            console.error('Ошибка:', error.message);
            res.status(500).json({ error: "Ошибка при получении адресов" });
        }
    });

    return router;
};
