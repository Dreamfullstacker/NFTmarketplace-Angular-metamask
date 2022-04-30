const fs = require('fs');

// path can differ depend on Angular CLI version
const browserConfigPath = 'node_modules/@angular-devkit/build-angular/src/webpack/configs/browser.js';

fs.readFile(browserConfigPath, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  const result = data.replace(/node: false/g, 'node: {crypto: true, stream: true}');

  fs.writeFile(browserConfigPath, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});