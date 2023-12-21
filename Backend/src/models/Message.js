module.exports = {
  MessageContent: "string",
  Date: {
    type: "string",
    default: () => new Date().toString(),
  },
  Sender: "int",
  IsDeleted: "boolean",
};
