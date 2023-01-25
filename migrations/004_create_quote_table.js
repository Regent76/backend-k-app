export const up = async function(knex) {
    await knex.schema.createTable('quote', function(table) {
        table.increments('quoteId').primary();
        table.integer('authorId').unsigned().notNullable();
        table.string('quote');
        table.foreign('authorId').references('author.authorId')
    });
};

export const down = async function(knex) {
    await knex.schema.dropTable('quote');
};
