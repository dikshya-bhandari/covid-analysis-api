const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: "https://21e382275324416abe2c8acb45a04fc7.us-central1.gcp.cloud.es.io:443",
  auth: {
    apiKey: "R0hsYS1wQUJfbUV3THI4YV9WclA6dnhOZ1BuTDVSUUN0Z201WWVpaXNMQQ==",
  },
});

module.exports = client;
