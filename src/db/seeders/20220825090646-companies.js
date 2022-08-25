const path = require('path');
const fs = require('fs').promises;

module.exports = {
  async up(queryInterface, Sequelize) {
    const companies = (
      await fs.readFile(path.join(__dirname, './listing_status.csv'), 'utf-8')
    )
      .split('\n')
      .map((el) => el.split(','))
      .map((el) => ({
        symbol: el[0],
        name: el[1],
        exchange: el[2],
        assetType: el[3],
        ipoDate: el[4],
        delistingDate: el[5],
        activeStatus: el[6],
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    await queryInterface.bulkInsert('Companies', companies);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Companies', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
