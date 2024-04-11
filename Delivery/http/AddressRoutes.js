const express = require('express');
const path = require('path');
const router = express.Router();
const AddressService = require('../../UseCases/UseCases');

const filePath = path.join(__dirname, '../../Data/AddressesStreet.json');
const addressService = new AddressService(filePath);

router.get('/api/cacheSetter', async (req, res) => {
    try {
        let totalSuccessfulAddresses = 0;
        for (let street of addressService.streets) {
            totalSuccessfulAddresses += await addressService.checkAddressesForStreet(street);
        }

        res.json({ totalSuccessfulAddresses });
    } catch (error) {
        res.status(500).json({ error: "Ошибка при получении адресов" });
    }
});

module.exports = router;
