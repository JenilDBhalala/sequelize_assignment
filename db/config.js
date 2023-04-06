const Sequelize = require('sequelize');

let sequelize = new Sequelize(process.env.DEV_DATABASE_URL, {
    //otherwise it will display logs for queries it running behind
    logging: false,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

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