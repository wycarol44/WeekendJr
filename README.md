# WEB103 Project 2 - WeekendJr

Submitted by: **Ying Wang**

About this web app:

**WeekendJr** is a web application that helps families discover kid-friendly events and activities in their area. Users can browse a curated list of events, including playground activities, story hours, library programs, and community gatherings. Event information is stored in a PostgreSQL database and served through a Node.js backend.

Time spent: **8** hours

## Required Features

The following **required** functionality is completed:

* [x] **The web app uses only HTML, CSS, and JavaScript without a frontend framework**
* [x] **The web app is connected to a PostgreSQL database, with an appropriately structured database table for the list items**

  * [x] **NOTE: Walkthrough includes a view of the Render dashboard demonstrating that the PostgreSQL database is available**
  * [x] **NOTE: Walkthrough includes a demonstration of the table contents using SQL queries**

The following **optional** features are implemented:

* [x] The user can search for items by a specific attribute

The following **additional** features are implemented:

* [x] Event cards display images and detailed descriptions
* [x] Events are sorted by ID and loaded dynamically from the database
* [x] Responsive layout for desktop and mobile devices
* [x] Organized backend structure with controllers and database configuration files

## Database Schema

The Events table contains the following fields:

| Column      | Type               |
| ----------- | ------------------ |
| id          | SERIAL PRIMARY KEY |
| name        | VARCHAR(255)       |
| category    | VARCHAR(100)       |
| ageGroup    | VARCHAR(100)       |
| minAge      | INTEGER            |
| maxAge      | INTEGER            |
| time        | TIMESTAMP          |
| address     | TEXT               |
| zip         | VARCHAR(10)        |
| latitude    | DECIMAL(10,7)      |
| longitude   | DECIMAL(10,7)      |
| image       | TEXT               |
| description | TEXT               |
| organizer   | VARCHAR(255)       |

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src="assets/walkthrough.gif" title="Video Walkthrough" alt="Video Walkthrough" />

GIF created with Kap

## Notes

One challenge was designing a database schema that could support multiple event categories while storing location, age range, and organizer information in a structured way. Another challenge was connecting the frontend to the PostgreSQL database and ensuring data was seeded correctly before rendering events on the page.

## License

Copyright 2026 Ying Wang

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at:

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
