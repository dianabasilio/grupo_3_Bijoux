module.exports = (sequelize, dataTypes) => {
    let alias = 'Product'; 
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        name_product: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL(3, 1),
            allowNull: false
        },

        // foreign keys

        id_category: {
            type: dataTypes.BIGINT(10).UNSIGNED,
        }
    };
    let config = {
        tableName: 'products',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Product = sequelize.define(alias,cols,config);

    return Product

}    