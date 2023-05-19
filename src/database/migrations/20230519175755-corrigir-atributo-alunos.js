module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('alunos', 'Weight', 'weight');
  },
  down() {},
};
