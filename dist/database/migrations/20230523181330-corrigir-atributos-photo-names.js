"use strict";module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('photos', 'original_name', 'originalname');
    await queryInterface.renameColumn('photos', "file_name", "filename");
  },
  down() {},
};

