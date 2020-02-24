#!/usr/bin/env node
try {
    require(`${process.cwd()}/node_modules/json-cli/lib/client`);
} catch (e) {
    require("./lib/client");
}

