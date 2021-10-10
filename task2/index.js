const csvtojson = require('csvtojson');
var fs = require('fs');

const filename = `${__dirname}/csv/nodejs-hw1-ex1.csv`;

const readStream = fs.createReadStream(filename, { encoding: 'utf8' });

readStream.on('error', function (err) {
  console.log(err);
});

const writeStream = fs.createWriteStream(
  `${__dirname}/txt/result.txt`
)

csvtojson()
  .fromStream(readStream)
  .subscribe(
    (json) => {
      return new Promise((resolve, reject) => {
        writeStream.write(JSON.stringify(json) + '\n');
        resolve()
        writeStream.on('error', function (err) {
          console.log(err);
          reject(err);
        });
      })
    }
  );





