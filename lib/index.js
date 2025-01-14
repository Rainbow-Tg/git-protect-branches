
const fs = require("fs");
const p = require("path");

function install(dir = '.husky',outerDir='') {
    fs.copyFileSync(p.join(__dirname, '../pre-push.sh'), p.join(dir, 'pre-push'));
    fs.copyFileSync(p.join(__dirname, '../pre-checkout.sh'), p.join(dir, 'pre-checkout'));
    fs.copyFileSync(p.join(__dirname, '../preHooks.js'), p.join(outerDir, 'preHooks.js'));
}

exports.install = install;
