module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductSize'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        size: {
            type: dataTypes.STRING(45),
            allowNull: false
        },

        // foreign keys

        id_product: {
            type: dataTypes.BIGINT(10).UNSIGNED,
        }
    };
    let config = {
        tableName: 'product_size',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const ProductSize = sequelize.define(alias,cols,config);

    return ProductSize

}