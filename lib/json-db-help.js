const chalk = require("chalk");

module.exports.dbHelp = function () {
    console.log(`Available Commands:`);
    console.log(`${chalk.cyan('help')}    : print help`)
    console.log(`${chalk.cyan('version')} : print jsonb-db version`)
    console.log(`${chalk.cyan('connect')} : start session with json-db (run command inside project directory)`)
    console.log(`${chalk.cyan('install')} : install json-db inside a project`);
    console.log(`${chalk.cyan('db.collections()')}: print avalable collections in DB`);
    console.log(`${chalk.cyan('db.collection(collectionName)')} : manipulate collection`);
    console.log(`${chalk.cyan('db.createCollection(collectionName,data)')} : create collection with data`);
    console.log(`${chalk.cyan('db.createCollection(collectionName)')} : create empty collection`);
    console.log(`${chalk.cyan('db.dropCollection(collectionName)')} : delete collection`);
    console.log(`${chalk.cyan('db.collection(collectionName).find(criteria)')}: find items in a DB ,leave criteria empty to find all items`);
    console.log(`${chalk.cyan('db.collection(collectionName).find(criteria).query')}: query readable data `);
    console.log(`${chalk.cyan('db.collection(collectionName).find(criteria).table()')}: format output into a table `);
    console.log(`${chalk.cyan('db.collection(collectionName).find(criteria).pretty()')}: format json output into a nice look `);
    console.log(`${chalk.cyan('db.collection(collectionName).insert(value)')}: insert object into a table or creeate collection with one data `);
    console.log(`${chalk.cyan('db.collection(collectionName).insertMany(values)')}: insert array of object into a table or create collection with many data `);
    console.log(`${chalk.cyan('db.collection(collectionName).update(criteria,value)')}: update item inside a collection `);
    console.log(`${chalk.cyan('db.collection(collectionName).remove(criteria)')}: remove(delete) item from  a collection `);

}
