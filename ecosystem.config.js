const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

module.exports = {
  apps: [
    {
      name: "covidanalysis.api",
      script: "./server.js",
      autorestart: true,
      // watch: process.env.NODE_ENV == 'development' ? ['src', '*.js', '*.ts', '.env'] : false,
      watch_delay: 5000,
      ignore_watch: ["node_modules", "assets", "docs", ".git"],
      max_memory_restart: process.env.APP_MEMORY_LIMIT || "2G",
    },
    // {
    //   name: "covidanalysis.worker",
    //   script: "./worker.js",
    //   autorestart: true,
    //   // watch: process.env.NODE_ENV == 'development' ? ['src', '*.js', '*.ts', '.env'] : false,
    //   watch_delay: 5000,
    //   ignore_watch: ["node_modules", "assets", "docs", ".git"],
    //   max_memory_restart: process.env.APP_MEMORY_LIMIT || "2G",
    // },
  ],
};
