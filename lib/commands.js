const chalk = require("chalk");
const figlet = require("figlet");
const fs = require("fs");
const exec = require("child_process").exec;
const help = require('./json-db-help');
const clear = require("clear");
module.exports.exec = function (jsondb) {

    process.argv.forEach((command, index, array) => {
        args = array.slice(3);
        if (command == 'help') {
            return help.dbHelp();
        }

        if (command == 'connect') {

            if (fs.existsSync(`package.json`)) {

                try {
                    require(`${process.cwd()}/node_modules/json-db/lib/json-db`);
                    return new jsondb();

                } catch (e) {
                    console.log(e);
                    console.log(`${chalk.red('[*] No json-db  installed in this project,installing it by typing : json install or npm install json-db')} `);

                }

            } else {
                console.log(`${chalk.red('[*] run command inside a nodejs project')} `);
            }


        }

        if (command == 'version' || (array.length == 2 && command.includes('node.exe'))) {
            clear();
            console.log(chalk.yellow(figlet.textSync('Json-CLI', { horizontalLayout: "full" })));
            const txt = `Json CLI: 0.1.0
            Node: ${ process.version}
            OS: ${ process.platform}

            Json-db < InMemory Database >:
             ...
            usage type: json help `;

            return console.log(txt);
        }

        if (command == "install") {
            if (fs.existsSync(`package.json`)) {

                try {
                    require(`${process.cwd()} / node_modules / json - db`);
                    console.log(chalk.green("json-db already installed in this project,to start session ,type :json connect "));
                } catch (e) {
                    exec("npm install ../json-db", (err, stdout, stderr) => {
                        console.log("Installing database...");
                        console.log(stdout);
                        console.log(stderr);
                        if (err != null) {
                            console.log(chalk.red(err));
                        } else {
                            console.log("successfully installed");
                        }

                    })

                }

            } else {
                console.log(chalk.red("[*] run command inside a nodejs project"));
            }
        }
    });
}