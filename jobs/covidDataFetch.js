const client = require("../elasticSetup");
const incrementDate = require("../utils/currentDateMapper");
const countryCodes = require("./../constants/countryCodes");

const INDEX = "covid-analysis-data";

module.exports = async function () {
  const todayDate = await incrementDate();

  const isoCodes = countryCodes.map((x) => x.iso);
  fetch(`https://covid-api.com/api/reports?date=${todayDate}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const apiRes = data.data;
      const covidData = isoCodes.map((iso) => {
        const isoData = apiRes.filter((x) => x.region.iso == iso);
        const output = isoData.reduce(
          (ac, cV) => {
            return {
              confirmed: ac.confirmed + cV.confirmed,
              deaths: ac.deaths + cV.deaths,
              recovered: ac.recovered + cV.recovered,
              confirmed_diff: ac.confirmed_diff + cV.confirmed_diff,
              deaths_diff: ac.deaths_diff + cV.deaths_diff,
              recovered_diff: ac.recovered_diff + cV.recovered_diff,
              active: ac.active + cV.active,
              active_diff: ac.active_diff + cV.active_diff,
              fatality_rate: ac.fatality_rate + cV.fatality_rate,
            };
          },
          {
            confirmed: 0,
            deaths: 0,
            recovered: 0,
            confirmed_diff: 0,
            deaths_diff: 0,
            recovered_diff: 0,
            active: 0,
            active_diff: 0,
            fatality_rate: 0,
          }
        );
        output["fatality_rate"] =
          (output["fatality_rate"] &&
            output["fatality_rate"] / isoData.length) ||
          0;
        output["fatality_rate"] = output["fatality_rate"].toFixed(5);

        output["iso"] = iso;
        output["name"] = countryCodes.filter((x) => x["iso"] == iso)[0]["name"];
        return output;
      });
      const datatoUpload = {
        date: todayDate,
        allData: covidData,
      };
      client
        .index({
          index: INDEX,
          body: datatoUpload,
        })
        .then((res) => {
          console.log("Fetched data for date: ", todayDate);
        })
        .catch((err) => {
          console.log("Fetching data failed for date: ", todayDate, err);
        });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
