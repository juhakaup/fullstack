'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Journey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Station }) {
      // define association here
      this.belongsTo( Station, { foreignKey: 'departureStationId'});
      this.belongsTo( Station, { foreignKey: 'returnStationId'});
    }
  }
  Journey.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    departure: {
      type: DataTypes.DATE,
      allowNull: false
    },
    return: {
      type: DataTypes.DATE,
      allowNull: false
    },
    departureStationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    departureStationName: {
      type: DataTypes.TEXT,
    },
    returnStationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    returnStationName: {
      type: DataTypes.TEXT,
    },
    distance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 10,
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 10,
      }
    }
  }, {
    sequelize,
    modelName: 'Journey',
    tableName: 'journeys',
    underscored: true,
    timestamps: false
  });
  return Journey;
};