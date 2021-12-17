module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        email: {
            type: dataTypes.STRING(100),
            primaryKey: true,
            allowNull: false,
        },
        first_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        image_path: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
        
    };
    let config = {
        tableName: 'users',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const User = sequelize.define(alias,cols,config);

    return User

}