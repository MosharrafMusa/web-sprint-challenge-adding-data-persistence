exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("projects")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("projects").insert([
        {
          name: "Guidr App",
          description: "help choose destination",
          completed: false,
        },
        {
          name: "Celebrity App",
          description: "guess celebrity deaths",
          completed: true,
        },
        { name: "Eatr App", description: "where to eat", completed: false },
      ]);
    });
};
