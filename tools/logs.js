var cs = true;
try {
  var colors = require("colors");
} catch(err) {
  console.log("You don't use colors, that makes me sad.");
  cs = false;
}

function error(t) {
  console.log((cs ? String(t).red : t));
}
function log(t) {
  console.log((cs ? String(t).green : t));
}
function warn(t) {
    console.log((cs ? String(t).yellow : t));
}

module.exports = {error, log, warn};
