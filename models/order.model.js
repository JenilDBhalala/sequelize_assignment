const sequelize = require('../db/config');
const { DataTypes } = require('sequelize')

const Order = sequelize.define(
    'order',
    {
        orderDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter order-date!'
                }
            },
        },
        expectedDeliveryDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter expected-delivery-date!'
                }
            },
        },
        orderStatus: {
            type: DataTypes.ENUM('Pending', 'Processing', 'Shipped', 'Delivered'),
            allowNull: false,
            defaultValue: 'Pending',
            validate: {
                notNull: {
                    msg: 'Please enter order-status!'
                }
            },
        },
        shippingAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter shipping address!'
                }
            },
            set(value) {
                this.setDataValue('shippingAddress', value.toLowerCase())
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            reference: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE'
        }
    },
    {
        timestamps: false
    }
);

// //custom validation
// Order.validate({
//     validateOrderDates() {
//         if (this.order_date >= this.expected_delivery_date) {
//             throw new Error('Expected delivery date must be after order placed date!')
//         }
//     }
// });

module.exports = Order;