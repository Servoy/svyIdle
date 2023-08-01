var AdmZip = require('adm-zip');

// creating archives
var zip = new AdmZip();

zip.addLocalFolder("./META-INF/", "/META-INF/");
zip.addLocalFolder("./dist/servoy/svyidle/", "/dist/servoy/svyidle/");

zip.writeZip("svyidle.zip");