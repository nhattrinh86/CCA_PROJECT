# CCA_PROJECT
From the command line:
- Clone project
- Type "npm install" to install dependencies
- Go to client/src
- Type "bower install" to install all dependencies for client

How to Run Project:
- From main folder type #"Grunt" to start your project
- For Server Unit testing type #"Mocha"

Please setup your local mongoDB and have the project point to your local Database. It will prevent you from touching the production data

After having local mongoDB setup
- Go to server/mongoConnection
- Search for "var mongoEnv = config.mongoProductionHost;" and change "mongoProductionHost" to "mongodbHost"

Create fake data for local mongoDB
- Go back to main folder
- Go to test/connectionTest.js
- Search for "var collection = require('../server/config').testCollectionName"
- Change "testCollectionName" to "collectionName"
- Uncomment 'Should generate 2000 items' test
- Run the test again and you will have your data populated
- remember to change "collectionName" back to "testCollectionName" and comment out "Should generate 2000 items" test when you are DONE 

Before push your project to Git:
- Change mongoEnv back to "mongodbHost" to ensure that the project will point to the production mongodb again.
