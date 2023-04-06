const sequelize = require('../db/config');
const { DataTypes } = require('sequelize')

const Product = sequelize.define(
    'product',
    {
        productName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter product-name!'
                }
            },
            set(value) {
                this.setDataValue('productName', value.toLowerCase())
            }
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    args: [true],
                    msg: 'price must be integer value!'
                },
                min: {
                    args: [0],
                    msg: 'price must be non-negative value!'
                },
                notNull: {
                    msg: 'Please enter price!'
                }   
            }
        }
    },
    {
        timestamps: false
    }
);

module.exports = Product;