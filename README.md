# CCA_PROJECT
From the commandline:
-Clone project
- Type "npm install" to install dependencies
- Go to client/src
- Type "bower install" to install all dependencies for client

How to Run Project:
- From main folder type "Grunt" to start your project
- For Server Unit testing type "Mocha"

Please setup your local mongoDB and have the project point to your local Database. It will prevent you from touching the production data

After having local mongoDB setup
- Go to server/mongoConnection
- Search for "var mongoEnv = config.mongoProductionHost;" and change "config.mongoProductionHost" to "config.mongodbHost"

Create fake data for local mongoDB
- Go back to main folder
- Go to test/connectionTest.js
- 
