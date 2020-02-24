const reply = require("repl");
const chalk = require("chalk");
const figlet = require("figlet");
const fs = require("fs");

try {
    jsonDb = require(`${process.cwd()}/node_modules/jsonb-db/lib/jsonb-db`);
} catch (e) {
    return;
}


class Jsondb {

    constructor() {
        const replSever = reply.start({
            prompt: `jsonb>`,
            useColors: true,
            useGlobal: false,

        });

        replSever.context.db = {};

        replSever.context.db.collections = () => jsonDb.collections();

        replSever.context.db.collection = (collection) => ({
            find: (criteria) => (new class {
                constructor() {
                    this.query = jsonDb.collection(collection).find(criteria);
                    return this;
                }
                take(takerow) {
                    this.query.length = takerow;
                    return this;
                }
                skip(skiprow) {
                    this.query = this.query.slice(skiprow);
                    return this;
                }
                /**convert array to object
                *@return { Object }  object
                */
                toObject() {
                    return Object.assign({}, this.query)
                }
                /**
                 * format output into pretty readable json fomart 
                 */
                pretty() {
                    console.table(JSON.stringify(this.query, null, 4));
                    return this.query.length + " rows  fetched";
                }

                /**@description format  output into tabular form  */
                table() {
                    console.table(this.query);
                    return this.query.length + " rows  fetched";
                }
            }),
            count: () => jsonDb.collection(collection).find({}).length,
            insert: (value) => jsonDb.collection(collection).insert(value),
            insertMany: (values) => jsonDb.collection(collection).insertMany(values),
            update: (criteria, value) => jsonDb.collection(collection).update(criteria, value),
            remove: (criteria) => jsonDb.collection(collection).remove(criteria),
        });

        replSever.context.db.createCollection = (collection, data) => jsonDb.createCollection(collection, data);

        replSever.context.db.updateCollection = (oldCollection, newCollection) => jsonDb.updateCollection(oldCollection, newCollection);

        replSever.context.db.dropCollection = (collection) => jsonDb.dropCollection(collection);

        replSever.context.pwd = process.cwd();

        replSever.context.ls = fs.readdirSync("./", { encoding: 'utf8' })

        replSever.on('exit', () => {
            console.log(chalk.green("Goodbye"));
            process.exit();
        });


    }

}

module.exports = Jsondb;





