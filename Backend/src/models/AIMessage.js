module.exports = {
  Question: "string",
  Answer: "string",
  CreatedDate: {
    type: "string",
    default: () => new Date().toString(),
  },
  has_a: {
    type: "relationship",
    target: "AIChat",
    relationship: "HAS_A",
    direction: "in",
    eager: true, // <-- eager load this relationship
  },
};
