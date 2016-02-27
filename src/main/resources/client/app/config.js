var apiversion = 'v1';
var serverDomain=  'https://ysongtest.herokuapp.com/';
var devServerDomain=  'http://localhost:9000';

var prod = true;

module.exports = {
    apibase: ( prod ? serverDomain :devServerDomain ) + "/api/" + apiversion
}