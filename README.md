# CCA_PROJECT
Make sure you do have nodejs and grunt already installed globally

From the command line:
- Clone the project
- Type "npm install" to install dependencies
- Go to client/src
- Type "bower install" to install all dependencies for client

How to Run Project:
- The current port for the project is 80, which is for the production site. You need to change it back to 8080 for the project to run locally.
- Go to server.js, search for "var port = process.env.PORT || 80", and change "80" to "8080"
- From main folder type "Grunt" to start your project
- For Server Unit testing type "Mocha"

Please setup your local mongoDB and have the project point to your local Database. It will prevent you from touching the production data

After having local mongoDB setup
- Go to server/mongoConnection.js
- Search for "var mongoEnv = config.mongoProductionHost;" and change "mongoProductionHost" to "mongodbHost"

Create fake data for local mongoDB
- Go back to main folder
- Go to test/connectionTest.js
- Search for "var collection = require('../server/config').testCollectionName"
- Change "testCollectionName" to "collectionName"
- Uncomment 'Should generate 2000 items' test
- Run the test on command line and you will have data populated for the project
- Remember to change "collectionName" back to "testCollectionName" and comment out "Should generate 2000 items" tests when you are DONE 

Before push your project to Git:
- Change mongoEnv back to "mongoProductionHost" to ensure that the project will point to the production mongodb again.
