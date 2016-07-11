//Usage: node interpret.js [filename] [flags]
var fs = require("fs");
var colors = require("colors"); //100% necessary.
var l = require("./tools/logs");

var args = process.argv.slice(2);
if (!args[0]) {
  l.error("Error: missing filename arguments.");
  process.exit(1);
}
//argument-ifier
var options = {}
var fileToCompile = args[0].replace(/STAR/,"★");
for (var i = 1; i < args.length; i++) { //skipping filename-to-compile by starting at 1
  if (args[i].indexOf("-")===0) {
    if(i+1==args.length || args[i+1].indexOf("-")===0) {
      options[args[i].slice(1)] = null;
    } else {
      options[args[i].slice(1)] = args[i+1];
    }
  }
}

if(!exists(fileToCompile)) {
  l.error(fileToCompile + " could not be found or is not a compile-able file.");
  process.exit(1);
}
if (/\.★js$/.test(fileToCompile) === false) {
  l.warn("You should really use .★js as the file name, it looks really cool.");
}

function exists(path) {
  try {
    fs.accessSync(path, fs.F_OK);
  } catch(err) {
    return false;
  }
  return true;
}
