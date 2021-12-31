module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductImage'; 
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        path: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        main: {
            type: dataTypes.TINYINT(1),
            allowNull: false
        },
    
        // foreign keys

        id_product: {
            type: dataTypes.BIGINT(10).UNSIGNED,
        }
    };
    let config = {
        tableName: 'product_image',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const ProductImage = sequelize.define(alias,cols,config);

    ProductImage.associate = function(models){
        ProductImage.hasMany(models.Product, {
            as: "productImage",
            foreignKey: "id_product"
        })
    }

    return ProductImage

}