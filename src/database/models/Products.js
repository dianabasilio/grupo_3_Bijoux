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
        main_image: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        first_image: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        second_image: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        third_image: {
            type: dataTypes.STRING(100),
            allowNull: false
        },

        // foreign keys

        id_category: {
            type: dataTypes.BIGINT(10).UNSIGNED,
        }
    };
    let config = {
        tableName: 'products',
        timestamps: false,
        deletedAt: false
    }
    const Product = sequelize.define(alias,cols,config);

    Product.associate = function(models){
        // este producto pertenece a una categoria de producto
        Product.belongsTo(models.CategoryProduct, {
            as: "productsC",
            foreignKey: "id_category"
        }),

        //product---product_cart---productSize
        Product.belongsToMany(models.ProductSize, {
            as: "product_cart_productS",
            // aqui no estaba segura si se tenia que poner el nombre literal de la tabla o el nombre del modelo, como yo declare el modelo, entonces le puse el nombre del modelo
            through : "ProductCart",
            foreignKey: "id_product",
            otherKey: "id_product_size",
            timestamps: false,
        });

        //product----product_cart----shopping_cart
        Product.belongsToMany(models.ShoppingCart, {
            as: "product_shopping",
            through : "ProductCart",
            foreignKey: "id_product",
            otherKey: "id_shopping_cart",
            timestamps: false,
        });
    }

    return Product

}    