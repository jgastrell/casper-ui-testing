
casper.options.verbose = true;
casper.options.logLevel = 'debug';
var mainUrl = 'https://staging.webgis.frontec.net/home';

var options = casper.cli.options;

casper.userAgent('Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36');

casper.test.begin('Molaa Login Page', function(test){

  casper.start(mainUrl);

  casper.then(function() {
    test.comment('Setting viewport');
    casper.viewport(1366, 768);
  });

  casper.waitForResource('molaa.nonCached.js', function(){
    casper.wait(10000,function(){
      test.comment('Capturing initial screen');
      casper.capture('test.png',{top:0,left:0,width:500,height:500});
    });
  },180000);

  casper.then(function(){
    test.comment('Asserting basics');
    test.assert(this.getCurrentUrl() == mainUrl, 'URL OK');
    test.assertHttpStatus(200, 'Site is UP');
    test.comment('Checking inputs');
    test.assertExists("input#user");
    test.assertExists("input#password");
    test.assertExists("button#login");
  });

  casper.waitForSelector("input#user",
      function success() {
          this.sendKeys("input#user", options.user);
      },
      function fail() {
          test.assertExists("input#user");
  });

  casper.waitForSelector("input#password",
      function success() {
          this.sendKeys("input#password", options.password);
      },
      function fail() {
          test.assertExists("input#password");
  });

  casper.waitForSelector("button#login",
      function success() {
          test.assertExists("button#login");
          this.click("button#login");
          // this.wait(120000);
          // test.assertExists("div#map");
      },
      function fail() {
          test.assertExists("button#login");
  });

  casper.on('remote.message', function(message) {
    this.echo('remote message caught: ' + message);
  });
  casper.on("resource.error", function(resourceError) {
    this.echo("Resource error: " + "Error code: "+resourceError.errorCode+" ErrorString: "+resourceError.errorString+" url: "+resourceError.url+" id: "+resourceError.id, "ERROR");
  });

  casper.on("page.error", function(msg, trace) {
     this.echo("Error: " + msg, "ERROR");
   });

  casper.run(function(){
    test.done();
  });
});
