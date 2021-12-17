module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductCart'; 
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        price: {
            type: dataTypes.DECIMAL(3, 1),
            allowNull: false
        },
        quantity: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        total: {
            type: dataTypes.DECIMAL(3, 1),
            allowNull: false
        },

        // foreign keys

        id_shopping_cart: {
            type: dataTypes.BIGINT(10).UNSIGNED,
        },
        id_product: {
            type: dataTypes.BIGINT(10).UNSIGNED,
        },
        id_product_size : {
            type: dataTypes.BIGINT(10).UNSIGNED,
        }
    };
    let config = {
        tableName: 'product_cart',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const ProductCart = sequelize.define(alias,cols,config);

    return ProductCart

}