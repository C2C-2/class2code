module.exports = {
  TaskName: "string",
  TaskStatus: "string",
  StartDate: "string",
  EndDate: "string",
  Priority: "int",
  Comments: "string",
  IsMarked: "boolean",
  CreateDate: {
    type: "string",
    default: () => new Date().toString(),
  },
  has_a: {
    type: "relationship",
    target: "TaskStep",
    relationship: "HAS_A",
    direction: "out",
    eager: true,
  },
};
