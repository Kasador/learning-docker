'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Galaxy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // https://sequelize.org/docs/v6/core-concepts/assocs/
      Galaxy.hasMany(models.Star);
    }
  }
  Galaxy.init({
    name: DataTypes.STRING,
    size: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Galaxy',
  });
  return Galaxy;
};