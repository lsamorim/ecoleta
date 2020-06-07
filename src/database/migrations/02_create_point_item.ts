import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('PointItem', table => {
        table.increments('Id').primary();
        
        table.integer('PointId')
            .notNullable()
            .references('Id')
            .inTable('Points');

        table.integer('ItemId')
            .notNullable()
            .references('Id')
            .inTable('Items');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('PointItem');
}