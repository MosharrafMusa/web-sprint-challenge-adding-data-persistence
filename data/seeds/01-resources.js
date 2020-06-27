exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("resources")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("resources").insert([
        { name: "Trello", description: "a board of todos" },
        { name: "GitHub", description: "storage of repos" },
        { name: "DB Designer", description: "db design creator" },
      ]);
    });
};
