var apiversion = 'v1';
var serverDomain=  'http://localhost:9000';
var devServerDomain=  'http://localhost:9000';

var prod = false;

module.exports = {
    apibase: ( prod ? serverDomain :devServerDomain ) + "/api/" + apiversion
}