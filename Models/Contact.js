const { DataTypes, Model } = require('sequelize');

class Contact extends Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Contact'
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId' });
  }
}

module.exports = Contact;
