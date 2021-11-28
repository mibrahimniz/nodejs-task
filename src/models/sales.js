const Sequelize = require('sequelize');
const db = require('../config');

const Sale = db.define('sales', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    userName: Sequelize.STRING,
    amount: Sequelize.DECIMAL,
    date: Sequelize.DATE
});

module.exports = Sale;