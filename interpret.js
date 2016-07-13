//Usage: node interpret.js [filename] [flags]
var fs = require("fs");
var l = require("./tools/logs");

var args = process.argv.slice(2);
if (!args[0]) {
  l.error("Error: missing filename arguments.");
  process.exit(1);
}
//argument-ifier
var options = {};
var fileToCompile = args[0].replace(/STAR/,"★");
for (var i = 1; i < args.length; i++) { //skipping filename-to-compile by starting at 1
  if (args[i].indexOf("-")===0) {
    if(i+1===args.length || args[i+1].indexOf("-")===0) {
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

var constants = JSON.parse(fs.readFileSync("./lib/tokens.json"));
var tokens = JSON.parse(fs.readFileSync("./lib/tokens.json"));
tokens = [...constants, ...tokens];
//Let's start the actual interpreter stuff!

var f = fs.readFileSync(fileToCompile).toString("utf-8"); //file
var preamble = fs.readFileSync("./lib/preamble.js").toString("utf-8");
var cdf = "";                                             //file compiled
var arrf = f.split("\n");
arrf = arrf.map((currLine, index) => {
  return processify(currLine);
});
cdf = preamble + "\n" + arrf.join("\n");

var nfn = fileToCompile.replace(/★/g,"");
fs.writeFile(nfn, cdf, function(err) {
    if(err) {
        l.error(err);
    }
    l.log("File compiled and saved, saved as " + nfn);
});

function exists(path) {
  try {
    fs.accessSync(path, fs.F_OK);
  } catch(err) {
    return false;
  }
  return true;
}



function processify(text) {
  if (text==="") return "";
  var ret = "";
  var hold = [...text];
  var oparen = 0;
  for (var i = 0;  i < hold.length; i++) {
    var currChar = hold[i];
    for (var t = 0; t < tokens.length; t++) {
      if (currChar === tokens[t].token) {
        ret += tokens[t].to;
        oparen += (tokens[t].parens ? tokens[t].parens : 0);
      }
    }
  }
  return ret + ")".repeat(oparen) + ";";
}
