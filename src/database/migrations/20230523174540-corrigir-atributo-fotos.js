module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('photos', 'orignal_name', 'original_name');
  },
  down() {},
};
