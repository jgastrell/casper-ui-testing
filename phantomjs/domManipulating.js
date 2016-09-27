// var page = require('webpage').create();
// console.log('The default user agent is ' + page.settings.userAgent);
// page.settings.userAgent = 'SpecialAgent';
// page.open('https://experimental.webgis.frontec.net/home', function(status) {
//   if (status !== 'success') {
//     console.log('Unable to access network');
//   } else {
//     var ua = page.evaluate(function() {
//       return document.getElementById('user').textContent;
//     });
//     console.log(ua);
//   }
//   phantom.exit();
// });


'use strict';
var page = require('webpage').create();
// console.log('The default user agent is ' + page.settings.userAgent);
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36';
var ua;
page.onError = function (msg, trace) {
    console.log(msg);
    trace.forEach(function(item) {
        console.log('  ', item.file, ':', item.line);
    });
};

var url = 'https://experimental.webgis.frontec.net/home';
var url2 = 'https://www.google.com';
console.log("taraaan");
page.open(url, function(status) {
  console.log("taraaan 2");
  console.log(page.url);
  page.includeJs("https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function(){

    console.log("taraaan 3");
    page.evaluate(function() {
      var myTxt = $('body').html();
      this.echo("!@#!@#! myTxt es: " + myTxt);
      //  console.log();
    });
  });
  phantom.exit();
});
