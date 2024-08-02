# Node.js API for Material Query Engine

This Node.js project is designed to recurrently fetch day-to-day COVID-19 datasets, interact with Elasticsearch and provide endpoints for getting those datasets from date ranges as well as specific date.


## Methodology

1. Initially, I tried the different APIs provided in the https://documenter.getpostman.com/view/10724784/SzYXWz3x . I found (i) https://covid-api.com/api/regions and (ii) https://covid-api.com/api/reports?date=&q=&iso=&region_name=&region_province= to be APIs of the interest. 

2. I used API (i) to get the entire list of regions which we will be focusing. The API provided unique code(iso) and the region name. 

3. I used API (ii) to get the report for a specific date. The API returned entire metrics of a specific date for all the regions.

4. I am running /worker.js to run recurrent jobs of calling API (ii) increasing the date by a day everyday. I am using node-cron library for this purpose. The last fetched dates are maintained in the file utils/currentDate.txt.

5. I am running /server.js to make the two endpoints /getDatafromDateRange and 
/getDatafromDate.

6. The both processes are running in parallel using node pm2 service which is a process manager FOR node.js

NOTE: I have already fetched data between 2020-02-01 and 2020-09-15 at the time of submission of this assignment. The job runs once a day everyday and the data will continue to insert into elasticsearch for the subsequent days after 2020-09-15 using the recurrent jobs

## Installation

### `npm install`

It installs all the necessary dependencies needed in the react app

### `npm run start:prod`
Starts the nodejs server in production


## Endpoints

### /getDatafromDateRange

- **Method:** `POST`
- **Description:** Gets COVID-19 data from Elasticsearch within a given date range. The date difference between end date and start date should be a maximum of 60 days to make the graph clumsy

### /getDatafromDate

- **Method:** `POST`
- **Description:** Gets COVID-19 data from Elasticsearch for a specific date.

## Getting Started

### Prerequisites

- Node.js installed
"# covid-analysis-api" 
