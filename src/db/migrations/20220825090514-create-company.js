module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      symbol: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      exchange: {
        type: Sequelize.STRING,
      },
      assetType: {
        type: Sequelize.STRING,
      },
      ipoDate: {
        type: Sequelize.STRING,
      },
      delistingDate: {
        type: Sequelize.STRING,
      },
      activeStatus: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Companies');
  },
};
