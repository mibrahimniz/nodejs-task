const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const salesRoute = require('./routes/salesRoute');
const db = require('./config');
const sale = require('./models/sales');
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', salesRoute);

app.listen(process.env.PORT || '3000', async() => {
    console.log(`Server is listening on port:3000`);
    try {
        await db.authenticate();
        console.log('DB Connected...');
        await db.sync({});
    } catch (error) {
        console.log('Error while connecting to DB...');
    }
});