#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const p = require("path");
const h = require("./");
function help(code) {
    console.log(`Usage:
    gbp install [dir] (default: .husky)
    `);
    process.exit(code);
}
const [, , cmd, ...args] = process.argv;
const ln = args.length;
const [x, y] = args;
const cmds = {
    install: () => {
        if (ln > 1) {
            help(2);
        } else {
            h.install(x);
            const { execSync } = require('child_process');
            try {
                execSync(`chmod ug+x ${x || '.husky'}/*`);
            } catch (err) {
                console.warn('Warning: Failed to set execute permissions on hook files');
            }
        }
    },
    ['-v']: () => console.log(require(p.join(__dirname, '../package.json')).version),
};
try {
    cmds[cmd] && cmds[cmd]()
} catch (e) {
    console.error(e);
}
