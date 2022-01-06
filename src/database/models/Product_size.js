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
        timestamps: false,
        deletedAt: false
    }
    const ProductSize = sequelize.define(alias,cols,config);

    ProductSize.associate = function(models){

        //product---product_cart---productSize
        ProductSize.belongsToMany(models.Product, {
            as: "product_cart_size",
            through : "ProductCart",
            foreignKey: "id_product_size",
            otherKey: "id_product",
            timestamps: false,
        })

    }

    return ProductSize

}