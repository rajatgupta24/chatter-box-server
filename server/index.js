const path           = require('path');
const fs             = require('fs');
const markdownpdf    = require("markdown-pdf");

let inFile  = path.join(__dirname, 'db', 'new.md');
let outFile = path.join(__dirname, 'db', 'new.pdf');
 
fs.createReadStream(inFile)
  .pipe(markdownpdf())
  .pipe(fs.createWriteStream(outFile))
