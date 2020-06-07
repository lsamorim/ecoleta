import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('Items', table => {
        table.increments('Id').primary();
        table.string('Image').notNullable();
        table.string('Title').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('Items');
}