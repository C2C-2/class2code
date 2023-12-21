module.exports = {
  TeamName: "string",
  IsDeleted: "boolean",
  CreateDate: {
    type: "string",
    default: () => new Date().toString(),
  },
  TeamRole: "string",
};
