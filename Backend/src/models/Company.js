module.exports = {
  CompanyName: "string",
  CompanyDescription: "string",
  Rate: "int",
  Domain: "string",
  IsDeleted: "boolean",
  CreateDate: {
    type: "string",
    default: () => new Date().toString(),
  },
};
