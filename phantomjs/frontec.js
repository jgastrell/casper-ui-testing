var page = require('webpage').create();
page.viewportSize = {width:1024,height:768};
page.clipRect = {top:0,left:0, width:1024, height:768};
var url = 'https://experimental.webgis.frontec.net/home';

console.log(page);
page.open(url, function() {

  page.evaluate(function() {
        document.getElementById("user").value = "molaa";
        document.getElementById("password").value = "Molaa_2016";
        document.getElementById("login").click();
        // page is redirecting.
    });
    page.onResourceReceived = function() {
    page.injectJs('https://experimental.webgis.frontec.net/home/molaa.nonCached.js');
};

  setTimeout(function(){
    // var bool = page.render('frontec.png');
    // console.log("se pudo renderear la pag? " + bool);
    console.log(document.URL);
    console.log(page.content);
    phantom.exit();
  },60000);

});
