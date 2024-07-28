const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "currentDate.txt");

function formatDate(date) {
  date = date.toISOString().split("T")[0];
  return date.toString().slice(0, 10);
}

function readDateFromFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          resolve(new Date(2020, 0, 31));
        } else {
          reject(err);
        }
      } else {
        resolve(new Date(data.trim()));
      }
    });
  });
}

function writeDateToFile(filePath, date) {
  const formattedDate = formatDate(date);
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, formattedDate, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function incrementDate() {
  try {
    let currentDate = await readDateFromFile(filePath);
    let nextDate = new Date(currentDate.getTime() + 86400000);
    await writeDateToFile(filePath, nextDate);
    return formatDate(nextDate);
  } catch (error) {
    console.error("Error processing the date:", error);
  }
}

module.exports = incrementDate;
