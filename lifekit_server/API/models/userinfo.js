/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userinfo', {
    userid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    access_token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    access_token_expiration: {
      type: DataTypes.DATE,
      allowNull: true
    },
    last_lat: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    last_lng: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    tableName: 'userinfo'
  });
};
