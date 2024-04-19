const app = require('./Delivery/Index');
const port = 3000;

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
