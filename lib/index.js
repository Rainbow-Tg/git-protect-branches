
const fs = require("fs");
const p = require("path");

function install(dir = '.husky') {
    fs.copyFileSync(p.join(__dirname, '../pre-push.sh'), p.join(dir, 'pre-push'));
    fs.copyFileSync(p.join(__dirname, '../pre-checkout.sh'), p.join(dir, 'pre-checkout'));
}

exports.install = install;
