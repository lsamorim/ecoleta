import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('Points', table => {
        table.increments('Id').primary();
        table.string('Image').notNullable();
        table.string('Name').notNullable();
        table.string('Email').notNullable();
        table.string('Whatsapp').notNullable();
        table.decimal('Latitude').notNullable();
        table.decimal('Longitude').notNullable();
        table.string('City').notNullable();
        table.string('Uf').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('Points');
}