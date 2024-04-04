const { DataTypes, Model } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'User'
    });
  }

  static associate(models) {
    this.hasMany(models.Contact, { foreignKey: 'userId' });
    this.hasMany(models.SpamReport, { foreignKey: 'userId' });
  }
}


module.exports = User;
