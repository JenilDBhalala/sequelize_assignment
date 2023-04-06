const sequelize = require('../db/config');
const { DataTypes } = require('sequelize');

const OrderDetail = sequelize.define(
    "orderdetail",
    {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    args: [true],
                    msg: 'product quantity must be integer value!'
                },
                min: {
                    args: [0],
                    msg: 'product quantity must be non-negative value!'
                },
                notNull: {
                    msg: 'Please enter product-quantity!'
                }
            }
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            reference: {
                model: 'products',
                key: 'id',
                onDelete: 'CASCADE'
            },
            primaryKey: true
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            reference: {
                model: 'orders',
                key: 'id',
                onDelete: 'CASCADE'
            },
            primaryKey: true
        }
    },
    {
        timestamps: false,
    }
);

module.exports = OrderDetail;