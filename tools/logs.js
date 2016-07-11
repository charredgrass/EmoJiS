function error(t) {
  console.log(String(t).red);
}
function log(t) {
  console.log(String(t).green);
}

module.exports = {error, log};
