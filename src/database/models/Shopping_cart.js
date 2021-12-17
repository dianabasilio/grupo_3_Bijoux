module.exports = (sequelize, dataTypes) => {
    let alias = 'ShoppingCart'; 
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        status: {
            type: dataTypes.STRING(100),
            allowNull: false
        },

        shop_date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        method_pay: {
            type: dataTypes.STRING(100),
            allowNull: false
        },

        // foreign keys

        email: {
            type: dataTypes.STRING(100)
        }

    };
    let config = {
        tableName: 'shopping_cart',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const ShoppingCart = sequelize.define(alias,cols,config);

    return ShoppingCart
}