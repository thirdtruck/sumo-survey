# Code exercise for Sumo.

## Installation (UNIX)

+ Install MySQL.
  + Create a user (with a password) and database for the app.
+ [Install Node.JS v0.10.46](https://docs.npmjs.com/getting-started/installing-node).
+ Clone this GitHub repository.
+ `cd` into the cloned repository's directory.
+ Edit the `development` section of `config/config.json` to use the MySQL user, password, and database you created earlier.
+ Run `npm install`.
+ Run `npm start`.
+ Open a web browser to [http://localhost:3000](http://localhost:3000) to access the app.

## Admin Account

You can access the _Admin_ section of the site with the following account info:

+ **User:** _sumo_
+ **Password:** _sumo_

## Requirements

+ Create a web app written in Node.JS using an Express based framework, SequelizeJS, and MySQL
+ Use Node.JS v0.10.46
+ Follow the ES5 JavaScript Style Guide located at: https://github.com/airbnb/javascript/tree/es5-deprecated
+ Use NPM to declare all dependencies so that we can run it in a test environment.
+ The app should allow an admin to enter survey questions with multiple choice answers.
+ When a guest visits the app in a browser it should present a random survey question to the guest and allow them to answer.
+ Avoid showing a previously answered question to the same guest.
+ Record answers and display the survey results in an admin interface.
+ Secure the admin interface from guests.
+ Make sure the UI is mobile browser friendly.
+ Provide a clear README with instructions on how to setup and run the app.
+ Create a github.com repository with the app that we can pull from and test.
+ Provide a link to your application running on a publicly accessible server with any credentials needed to fully test it.
