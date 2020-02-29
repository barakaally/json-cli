const reply = require("repl");
const chalk = require("chalk");
const figlet = require("figlet");
const fs = require("fs");

class JsonbCli {

    constructor(config = { db }) {

        try {
            const { JsonbDb } = require(`${process.cwd()}/node_modules/jsonb-db/index`);
            this.jsonbDb = new JsonbDb(config);
        } catch (e) {
            return console.log(e);
        }

        const replSever = reply.start({
            prompt: `jsonb>`,
            useColors: true,
            useGlobal: false,

        });

        replSever.context.db = {};
        replSever.context.db.collections = () => this.jsonbDb.dbCollections();

        replSever.context.db.collection = (collection) => {
            return {

                find: (criteria) => new class {

                    constructor(base) {
                        this.query = base.jsonbDb.dbCollection(collection).find(criteria);
                        return this;
                    }
                    take(rows) {
                        this.query.length = rows;
                        return this;
                    }
                    skip(rows) {
                        this.query = this.query.slice(rows);
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

                        return JSON.stringify(this.query, null, 4)
                    }

                    /**@description format  output into tabular form  */
                    table() {
                        console.table(this.query);
                        return this.query.length + " rows  fetched";
                    }
                    count() {
                        if (Array.isArray(this.query)) {
                            return this.query.length;
                        }
                        return 0;
                    }
                }(this),
                insert: (value) => this.jsonbDb.dbCollection(collection).insert(value),
                insertMany: (values) => this.jsonbDb.dbCollection(collection).insertMany(values),
                update: (criteria, value) => this.jsonbDb.dbCollection(collection).update(criteria, value),
                remove: (criteria) => this.jsonbDb.dbCollection(collection).remove(criteria),
            }
        };

        replSever.context.db.createCollection = (collection, data) => this.jsonbDb.createCollection(collection, data);

        replSever.context.db.updateCollection = (oldCollection, newCollection) => this.jsonbDb.updateCollection(oldCollection, newCollection);

        replSever.context.db.dropCollection = (collection) => this.jsonbDb.dropCollection(collection);

        replSever.context.pwd = process.cwd();

        replSever.context.ls = fs.readdirSync("./", { encoding: 'utf8' })

        replSever.on('exit', () => {
            console.log(chalk.green("Goodbye"));
            process.exit();
        });


    }

}

module.exports = JsonbCli;





