const { DataTypes, Model } = require('sequelize');

class SpamReport extends Model {
  static init(sequelize) {
    return super.init({
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    }, {
      sequelize,
      modelName: 'SpamReport'
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId' });
  }
}

module.exports = SpamReport;
