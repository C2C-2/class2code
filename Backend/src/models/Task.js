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
};
