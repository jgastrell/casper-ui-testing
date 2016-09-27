var webPage = require('webpage');
var page = webPage.create();

page.open('https://experimental.webgis.frontec.net/home');
page.onLoadFinished = function(status) {
  console.log('Status: ' + status);
  page.render('sarasa.png');
  phantom.exit();
};
