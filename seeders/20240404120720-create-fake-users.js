'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [{
        name: 'John Doe',
        email: 'john@gmail.com',
        role:'admin', 
        uuid: '8cceaece-7fdd-47dd-b74d-2df17777cb9c',
        createdAt:"2024-04-04T10:14:41.853Z",
        updatedAt: "2024-04-04T12:09:30.439Z"
       },{
        name: 'Jane Doe',
        email: 'jane@gmail.com',
        role:'admin', 
        uuid: '8cceaece-7fdd-47dd-b74d-2df17815cb9c',
        createdAt:"2024-04-04T10:14:41.853Z",
        updatedAt: "2024-04-04T12:09:30.439Z"
       }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
    */
    await queryInterface.bulkDelete('users', null, {});
  }
};
