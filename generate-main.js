const fs = require('fs');
const path = require('path');

const template = fs
    .readFileSync(path.join(__dirname, './src/main.js'))
    .toString('utf-8');
const mainScript = fs
    .readFileSync(path.join(__dirname, './target/index.js'))
    .toString('utf-8');

const result = template.replace('$MAIN_SCRIPT', mainScript);

fs.writeFileSync(path.join(__dirname, './target/main.js'), result);
