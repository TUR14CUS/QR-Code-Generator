import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
      message: 'Type in your URL: ',
      name: 'URL',
    },
  ])
  .then((answers) => {
    const url = answers.URL;

    // Create QR code image
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('qr_image.png'));

    // Write URL to message.txt
    fs.writeFile('message.txt', url, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
