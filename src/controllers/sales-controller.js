const { v4 } = require('uuid');
const uuid = v4;
const db = require('../config');
const sales = require('../models/sales');

const addSales = async(req, res) => {
    let { userName, amount, date } = req.body;
    date = new Date(date).toDateString();
    const sale = {
        id: uuid(),
        userName,
        amount,
        date
    };
    try {
        const saleRecord = await sales.create(sale);
        return res.status(201).json(saleRecord);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Something went wrong, please try again' });
    }
};

const getSaleStats = async(req, res) => {
    const { filter } = req.params;
    if (filter === 'daily' || filter === 'Daily') {
        try {
            const stats = await db.query(`SELECT * FROM sales WHERE cast("date" as Date) = CURRENT_DATE`);
            const sum = stats[0].reduce((a, b) => a + Number(b.amount), 0);
            return res.status(200).json({ stats: sum });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Something went wrong, please try again' });
        }
    }
    if (filter === 'weekly' || filter === 'Weekly') {
        try {
            const stats = await db.query(`SELECT * FROM sales WHERE cast("date" as Date) <= CURRENT_DATE::Date AND cast("date" as Date) >= CURRENT_DATE -INTERVAL '6 DAYS'`);
            const sum = stats[0].reduce((a, b) => a + Number(b.amount), 0);
            return res.json({ stats: sum });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Something went wrong, please try again' });
        }
    }
    if (filter === 'monthly' || filter === 'Monthly') {
        try {
            const stats = await db.query(`SELECT * FROM sales WHERE cast("date" as Date) <= CURRENT_DATE::Date AND cast("date" as Date) >= CURRENT_DATE -INTERVAL '30 DAYS'`);
            const sum = stats[0].reduce((a, b) => a + Number(b.amount), 0);
            return res.status(200).json({ stats: sum });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Something went wrong, please try again' });
        }
    }
    return res.status(400).send({ message: 'Incorrect filter in parameter' })
}

module.exports = {
    addSales,
    getSaleStats
};