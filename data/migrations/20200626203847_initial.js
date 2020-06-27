exports.up = function (knex) {
  return knex.schema
    .createTable("resources", (tbl) => {
      tbl.increments();
      tbl.string("name").notNullable();
      tbl.text("description");
    })
    .createTable("projects", (tbl) => {
      tbl.increments();
      tbl.string("name").notNullable();
      tbl.boolean("completed").defaultTo(false).notNullable();
      tbl.text("description");
    })
    .createTable("project_resources", (tbl) => {
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      tbl
        .integer("resource_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("resources")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
    })
    .createTable("tasks", (tbl) => {
      tbl.increments();
      tbl.string("description", 255).notNullable();
      tbl.boolean("completed").defaultTo(false).notNullable();
      tbl.text("notes");
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("tasks")
    .dropTableIfExists("project_resources")
    .dropTableIfExists("projects")
    .dropTableIfExists("resources");
};
