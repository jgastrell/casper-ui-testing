// casper.options.verbose = true;
// casper.options.logLevel = 'debug';
var mainUrl = 'https://experimental.webgis.frontec.net/home';
var options = casper.cli.options;

casper.userAgent('Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36');
casper.test.begin('Molaa Login Page', function(test){

  casper.start(mainUrl,function(){
    this.echo("cargando url");
  });

  casper.then(function() {
    test.comment('Setting viewport');
    casper.viewport(1366, 768);
  });

  casper.waitForResource('molaa.nonCached.js', function(){

    this.wait(10000);
    test.comment('Capturing initial screen');
    casper.capture('test.png',{top:0,left:0,width:500,height:500});
    // test.assertExists('#user', 'User input is present');
    // test.assertExists('#password', 'Password input is present');
    // test.assertExists(
    //   {type: 'xpath', path: '//input[@id="user"]' },
    //   'the user input element exists'
    // );
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

casper.then(function(){
  casper.waitForSelector("input#user",
      function success() {
        test.comment('encontro input user');
          // this.fill('input#user',{
          //   'user': options.user
          // }, false);
          // this.sendKeys("input#user", options.user);
          // this.evaluate(function(user){
          //   document.querySelector('input[id="user"]').value = user;
          // }, options.user);
      },
      function fail() {
          test.assertExists("input#user");
  });
});
  casper.then(function(){
    casper.waitForSelector("input#password",
        function success() {
          test.comment('encontro input password');
            // this.sendKeys("input#password", options.password);
            // this.fill('input#password',{
            //   'password' : options.password
            // }, false);
            // this.evaluate(function(pass){
            //   document.querySelector('input[id="password"]').value = pass;
            // }, options.password);
        },
        function fail() {
            test.assertExists("input#password");
    });
  });
  casper.then(function(){
    casper.waitForSelector("button#login",
      function success() {
          test.assertExists("button#login");
          //document.$('#login').click();
          // this.click('#login');
          //  document.getElementById("login").click()
        //  document.querySelector("button[id='login']").click();

        // document.querySelector('#login').click();



      },
      function fail() {
          test.assertExists("button#login");
        });
  });


casper.then(function(){
  var domjs = casper.evaluate(function(user,pass){
    document.querySelector('input[id="user"]').value = user;
    document.querySelector('input[id="password"]').value = pass;
    var result = document.querySelector('#login').click();
    // this.wait(120000);
    return result;
  }, options.user,options.password);
  console.log("mi domjs es: " + domjs);
});


  casper.then(function(){
    casper.wait(120000);
    casper.waitForUrl('https://experimental.webgis.frontec.net/ambientacion',
      function success(){
        console.log("se cargo la pag");
      }, function fail(){
        console.log("nonono se cargo la pag");
      },120000);
  });
  // casper.then(function(){
  //   casper.wait(120000);
  //   casper.waitForSelector("div#map", function success(){
  //     test.assertExists("div#map");
  //   }, function fail(){
  //     test.assertExists("div#map");
  //   });
  // },120000);
// casper.then(function(){
//   casper.waitForSelector("button#layer_213",
//         function success() {
//           this.wait(20000);
//             test.assertExists("button#layer_213");
//             this.click("button#layer_213");
//         },
//         function fail() {
//             test.assertExists("button#layer_213");
//     });
// });
//


casper.then(function(){
  casper.waitForUrl('https://experimental.webgis.frontec.net/ambientacion',
    function success(){
      console.log("se cargo la pag");
    }, function fail(){
      console.log("nonono se cargo la pag");
    },120000);
});

casper.then(function(){
  // casper.waitForSelector("body#desktop",function(){
  //   test.assertExists("body#desktop");
  // },
  // function(){
  //   test.assertExists("body#desktop");
  // });
  this.evaluate(function(){
    // var myTxt = document.querySelector('.desktop');
    // console.log("!@#!@#! myTxt es: " + myTxt);
    // return myTxt;
    var myTxt = $('body').html();
    console.log("!@#!@#! myTxt es: " + myTxt);
    //return $('body.desktop');
  });

  //this.echo(js.all[0].outerHTML);
});

  //casper.then(function(){
    //this.sendKeys('input[id=user]', '');
    // this.sendKeys('input[id=password]', '');
    // this.click("#login");
    // this.echo('Evaluating script');
    //this.evaluate(function(user, pass){
      // window.$('input#user').val(user);
      // window.$('input#password').val(pass);
  //     window.$('button#layer_213').click();
  //   }, '', '');
  // });
  //
  //   this.waitForSelector(
  //     '#map',
  //     function(){this.echo('Map is here, login OK');},
  // casper.then(function() {
  //     function(){this.echo('Timeout');},
  //     180000
  //   )
  // });

  // casper.then(function(){
  //   test.assertUrlMatch(this.getCurrentUrl(), 'https://experimental.webgis.frontec.net/home');
  // });

  require('utils').dump(casper.steps.map(function(step) {
      return step.toString();
  }));

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
