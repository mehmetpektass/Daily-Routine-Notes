# My Daily Journal 📝

## Description

My Daily Journal is a simple web application built using Express.js and EJS that allows users to compose, view, and read daily journal entries. The application utilizes SQLite3 as the database to store journal entries. Users can navigate through different sections of the website such as home, about, contact, and compose new journal entries. Each journal entry consists of a title and body, which are stored in the database and displayed on the website.

## Installation and Using

1. Clone this repository to your local machine:
2. Navigate to the project directory.
3. Install dependencies by running:


```bash
const sqlite3 = require('sqlite3').verbose();
const express = require("express");
const bodyParser = require("body-parser");
const lodash = require("lodash");
...

1. Navigate to http://localhost:3000 in your web browser.
2. Explore different sections of the website such as home, about, contact, and compose.
3. Click on the "Compose" link to create a new journal entry by providing a title and body.
4. View existing journal entries on the home page and click on the "Read More" link to read the full entry.
5. Connect with the website owner by visiting the contact page.
```

```bash
cd /path/to/your/project

npm install sqlite3 express body-parser lodash ejs

node app.js

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.🚀
