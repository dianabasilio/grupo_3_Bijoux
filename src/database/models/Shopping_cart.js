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

    ShoppingCart.associate = function(models){

        ShoppingCart.hasMany(models.User, {
            as: "users_shopping_cart",
            foreignKey: "email"
        }),

        //product----product_cart----shopping_cart
        ShoppingCart.belongsToMany(models.Product, {
            as: "product_shopping_cart",
            through : "ProductCart",
            foreignKey: "id_shopping_cart",
            otherKey: "id_product",
            timestamps: false,
        })
    };

    return ShoppingCart
}