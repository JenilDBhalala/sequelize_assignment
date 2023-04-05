const Sequelize = require('sequelize');
const envConfigs = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];

let sequelize;
if (config.url) {
  sequelize = new Sequelize(config.url, {
    //otherwise it will display logs for queries it running behind
    logging: false,
    pool: {
      max: 0,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

//testing if the connection is OK or not
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

//drop table if already exists and create new one
sequelize.sync()
    .then(() => console.log('database synced'))
    .catch((err) => console.log(err.message))

module.exports = sequelize;
