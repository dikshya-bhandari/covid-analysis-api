const client = require("./elasticSetup");

const INDEX = "covid-analysis-data";

const getDatefromDateRange = (data) =>
  new Promise((resolve, reject) => {
    const { startDate, endDate } = data;
    console.log(startDate, endDate);
    const query = {
      index: INDEX,
      size: 65,
      body: {
        query: {
          range: {
            date: {
              gte: startDate,
              lte: endDate,
              format: "yyyy-MM-dd",
            },
          },
        },
      },
    };

    client
      .search(query)
      .then((res) => {
        resolve(res.hits.hits);
      })
      .catch((err) => {
        reject(err);
      });
  });

const getDatefromDate = (data) =>
  new Promise((resolve, reject) => {
    const { date } = data;
    const query = {
      index: INDEX,
      body: {
        query: {
          term: {
            date: date,
          },
        },
      },
    };

    client
      .search(query)
      .then((res) => {
        resolve(res.hits.hits);
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = {
  getDatefromDateRange,
  getDatefromDate,
};
