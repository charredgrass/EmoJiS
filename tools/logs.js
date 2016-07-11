function error(t) {
  console.log(String(t).red);
}
function log(t) {
  console.log(String(t).green);
}
function warn(t) {
    console.log(String(t).yellow);
}

module.exports = {error, log, warn};
