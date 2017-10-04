/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('assister', {
    id: {
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
    emergencyid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'emergency',
        key: 'emergencyid'
      }
    },
    response: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    com: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'assister'
  });
};
