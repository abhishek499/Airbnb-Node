import { QueryInterface, DataTypes } from 'sequelize';
import { query } from 'winston';

module.exports = {
  async up (queryInterface:QueryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE hotels
      ADD COLUMN rating Decimal(3,2) DEFAULT NULL,
      ADD COLUMN rating_count INT DEFAULT NULL;
    `)
  },

  async down (queryInterface:QueryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE hotels
      DROP COLUMN rating,
      DROP COLUMN rating_count;
    `);
  }
};
