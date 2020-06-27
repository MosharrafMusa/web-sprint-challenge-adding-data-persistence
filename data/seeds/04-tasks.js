exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("tasks")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("tasks").insert([
        {
          description: "make trello cards",
          completed: true,
          notes: "list contributors",
          project_id: 1,
        },
        {
          description: "create repo",
          completed: true,
          notes: "set owners",
          project_id: 1,
        },
        {
          description: "design db",
          completed: false,
          notes: "create 4 tables",
          project_id: 1,
        },
        {
          description: "create two repos",
          completed: true,
          notes: "",
          project_id: 2,
        },
        {
          description: "make trello cards",
          completed: true,
          notes: "",
          project_id: 2,
        },
        {
          description: "make github repo",
          completed: false,
          notes: "add owners",
          project_id: 3,
        },
      ]);
    });
};
