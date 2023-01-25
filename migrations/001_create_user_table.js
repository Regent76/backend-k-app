export const up = async function(knex) {
    await knex.schema.createTable('user', function(table) {
        table.increments('userId').primary();
        table.string('email');
        table.unique('email');
        table.string('fullname');
        table.string('password');
    });
};

export const down = async function(knex) {
    await knex.schema.dropTable('user');
};
