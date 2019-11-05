const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'KilkalorFood',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    foodname: {
      type: Sequelize.STRING
    },
    foodkalor: {
      type: Sequelize.INTEGER
    },
    image: {
      type: Sequelize.STRING
    },
    // password: {
    //   type: Sequelize.STRING
    // },
    // created: {
    //   type: Sequelize.DATE,
    //   defaultValue: Sequelize.NOW
    // }
  },
  {
    timestamps: false
  }
)
