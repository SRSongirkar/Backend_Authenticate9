const Sequelize = require('sequelize');
const User = require('./User');
const Contact = require('./Contact');
const SpamReport = require('./SpamReport');

const sequelize = new Sequelize('postgres', 'postgres', 'admin', {
  dialect: 'postgres',
  host: 'localhost',
  port: 7039,
  logging: false // Disable logging SQL queries
});

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connectToDatabase();


const models = {
  User: User.init(sequelize, Sequelize),
  Contact: Contact.init(sequelize, Sequelize),
  SpamReport: SpamReport.init(sequelize, Sequelize),
};

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

const db = {
  ...models,
  sequelize
};

module.exports = db;
