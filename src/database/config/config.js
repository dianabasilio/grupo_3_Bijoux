module.exports = {
  "development": {
    "username": "admin",
    "password": 12345678,
    "database": "database_development",
    "host": "bijoux.cjsgnbio4rra.us-east-1.rds.amazonaws.com",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
