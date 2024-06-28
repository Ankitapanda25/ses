const fs = require('fs');
const csv = require('csv-parser');

async function readCsv() {
  const data = [];
  const readStream = fs.createReadStream('test.csv');
  readStream.pipe(csv())
    .on('data', (row) => {
      const name = row['Name'].trim();
      const email = row['Email'].trim();
      data.push({ name, email });
    })
    .on('end', () => {
      readStream.close();
    });

  await new Promise(resolve => readStream.on('close', resolve));
  return data;
}

module.exports = readCsv;