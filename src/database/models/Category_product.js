module.exports = (sequelize, dataTypes) => {
    let alias = 'CategoryProduct'; 
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false
        },

        category: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        path: {
            type: dataTypes.STRING(255),
            allowNull: false
        }
    };
    let config = {
        tableName: 'category_product',
        timestamps: false,
        deletedAt: false
    }
    const CategoryProduct = sequelize.define(alias,cols,config);

    CategoryProduct.associate = function(models){
        // una categoria de productos tiene muchos productos
        CategoryProduct.hasMany(models.Product, {
            as: "category_product",
            foreignKey: "id_category"
        });
    }

    return CategoryProduct

}