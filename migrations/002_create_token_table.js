export const up = async function(knex) {
    await knex.schema.createTable('token', function(table) {
        table.increments('tokenId').primary();
        table.integer('userId').unsigned().notNullable();
        table.foreign('userId').references('user.userId')
        table.string('token').notNullable();
    });
};

export const down = async function(knex) {
    await knex.schema.dropTable('token');
};
