
exports.up = async (knex, Promise) => {
    await knex.schema.createTable('users', (table) => {
        table.increments('id').notNullable();
        table.string('name').notNullable();
        table.string('email', 100).unique().notNullable();
        table.string('mobile', 15).unique().notNullable();
        table.string('password').notNullable();
      });
};

exports.down = async (knex, Promise) => {
    const dropTable = await knex.schema.dropTable('users');
      return dropTable;
};
