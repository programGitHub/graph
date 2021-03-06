const fse = require('fs-extra');
const path = require('path');

const dirs = {
  BUILD: './build',
  ROOT: './'
};

const MAIN_PACKAGE_PATH = path.resolve(dirs.ROOT, 'package.json');
const PACKAGE_PATH = path.resolve(dirs.BUILD, 'package.json');

async function createModulePackage() {
  const packageData = await fse.readFile(MAIN_PACKAGE_PATH, 'utf8');
  const {
    dependencies,
    devDependencies,
    name,
    peerDependencies,
    version
  } = JSON.parse(packageData);

  fse.writeFile(
    PACKAGE_PATH,
    JSON.stringify({
      dependencies,
      devDependencies,
      main: './index.js',
      module: './index.js',
      name,
      peerDependencies,
      private: false,
      repository: {
        type: 'git',
        url: 'https://github.com/programGitHub/graph.git'
      },
      version
    })
  );
}

async function run() {
  try {
    await createModulePackage();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
