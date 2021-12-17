module.exports = (sequelize, dataTypes) => {
    let alias = 'CategoryProduct'; 
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
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
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const CategoryProduct = sequelize.define(alias,cols,config);

    return CategoryProduct

}