export const up = async function(knex) {
    await knex.schema.createTable('author', function(table) {
        table.increments('authorId').primary();
        table.string('name');
    });
};

export const down = async function(knex) {
    await knex.schema.dropTable('author');
};
