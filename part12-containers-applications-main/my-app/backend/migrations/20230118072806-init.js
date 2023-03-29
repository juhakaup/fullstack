'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      name_fin: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      name_swe: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      name_eng: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      address_fin: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      address_swe: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      city_fin: {
        type: Sequelize.TEXT,
      },
      city_swe: {
        type: Sequelize.TEXT,
      },
      operator: {
        type: Sequelize.TEXT,
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      location_x: {
        type: Sequelize.DECIMAL(9,6),
        allowNull: false
      },
      location_y: {
        type: Sequelize.DECIMAL(8,6),
        allowNull: false
      }
    });

    await queryInterface.createTable('journeys', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      departure: {
        type: Sequelize.DATE,
        allowNull: false
      },
      return: {
        type: Sequelize.DATE,
        allowNull: false
      },
      departure_station_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'stations',
          key: 'id'
        }
      },
      departure_station_name: {
        type: Sequelize.TEXT,
      },
      return_station_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'stations',
          key: 'id'
        }
      },
      return_station_name: {
        type: Sequelize.TEXT,
      },
      distance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 10,
        }
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 10,
        }
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropAllTables();
  }
};