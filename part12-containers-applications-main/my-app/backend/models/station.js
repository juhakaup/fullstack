'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Station extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate({ Journey }) {
    //   this.belongsTo(Journey, { foreignKey: 'departureStationId'});
    //   this.belongsTo(Journey, { foreignKey: 'returnStationId'});
    // }
  }
  Station.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nameFin: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      nameSwe: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      nameEng: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      addressFin: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      addressSwe: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      cityFin: {
        type: DataTypes.TEXT,
      },
      citySwe: {
        type: DataTypes.TEXT,
      },
      operator: {
        type: DataTypes.TEXT,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      locationX: {
        type: DataTypes.DECIMAL(9,6),
        allowNull: false
      },
      locationY: {
        type: DataTypes.DECIMAL(8,6),
        allowNull: false
      }
    }, 
    {
      sequelize,
      modelName: 'Station',
      tableName: 'stations',
      underscored: true,
      timestamps: false
    });
  return Station;
}