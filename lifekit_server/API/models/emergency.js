/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('emergency', {
    emergencyid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'userinfo',
        key: 'userid'
      }
    },
    user_nickname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    emergency_lat: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    emergency_lng: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    emergency_address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    started_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ended_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'emergency'
  });
};
