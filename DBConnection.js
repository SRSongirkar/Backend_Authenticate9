const Sequelize = require('sequelize');
const User = require('./Models/User');
const Contact = require('./Models/Contact');
const SpamReport = require('./Models/SpamReport');

const sequelize = new Sequelize('backendauthenticate9', 'backendauthenticate9_user', 'wAVLTKk7QgXYrwFe5QlH1U4WLHhgot0z', {
  dialect: 'postgres',
  host: 'dpg-co7e7a6v3ddc7394r9jg-a',
  port: 5432,
  logging: false // Disable logging SQL queries
});

// const sequelize = new Sequelize('your_database_url_here', {
//     dialect: 'postgres',
//     logging: false // Disable logging SQL queries
//   });

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
