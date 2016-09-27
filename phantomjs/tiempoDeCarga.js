var page = require('webpage').create(),
system = require('system'),
t, address;

if(system.args.length===1){
  console.log('Uso: tiempoDeCarga.js <alguna URL>');
  phantom.exit();
}

t = Date.now();
address = system.args[1];
page.open(address, function(status){

  if(status !=='success'){
    console.log('fail');
  } else {
    t = Date.now() - t;
    console.log('cargando ' + system.args[1]);
    console.log('tiempo de carga ' + t + ' mseg');
  }
  phantom.exit();
});
