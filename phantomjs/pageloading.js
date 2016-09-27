var page = require('webpage').create();
page.open('https://experimental.webgis.frontec.net/home',function(status){

  if(status==='success'){
    console.log('Status es: ' + status);
  };

  window.setTimeout(function () {
           page.render('example5.png');
       }, 10000);

  phantom.exit();
});
