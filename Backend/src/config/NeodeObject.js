const Neode = require("neode");

// Import Neode and configure it with your Neo4j connection details
const instance = new Neode(
  "bolt://localhost:7687",
  "neo4j",
  "Qazwsx1234",
  true
);

instance.withDirectory(
  "C:/Users/Mohmmad/Documents/vsProject/web/Class2Code/Backend/src/models"
);

module.exports = instance;
