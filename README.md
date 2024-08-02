# Node.js API for Material Query Engine

This Node.js project is designed to recurrently fetch day-to-day COVID-19 datasets, interact with Elasticsearch and provide endpoints for getting those datasets from date ranges as well as specific date.

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
