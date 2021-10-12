const readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(line){
  process.stdout.write(reverseString(line));
})

function reverseString (str) {
  return str.split('').reverse().join('')
}