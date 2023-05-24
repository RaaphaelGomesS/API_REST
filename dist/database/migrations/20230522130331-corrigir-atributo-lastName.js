"use strict";module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('alunos', 'lastName', 'last_name');
  },
  down() {},
};
