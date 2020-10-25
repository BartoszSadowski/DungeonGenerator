const fs = require('fs-extra');
const path = require('path');

const srcDir = path.join(__dirname, '/src/imgs');
const resDir = path.join(__dirname, '/dist/imgs');

async function copyFiles() {
    await fs.ensureDir(resDir);

    const files = await fs.readdir(srcDir);

    await Promise.all(files.map(fileName => fs.copy(
        path.join(srcDir, fileName),
        path.join(resDir, fileName)
    )));
}

copyFiles();
