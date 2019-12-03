var http = require("http"); 
var url = require("url"); 

function start(route, handle) { 
function onRequest(request, response) { 
var pathname = url.parse(request.url).pathname; 
console.log("Request for " + pathname + " received."); 
route(handle, pathname, response, request); 
 } 

 const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello World');
        res.end();
    }

    if (req.url === '/api/posts') {
        res.write(JSON.stringify([1, 2, 3]));
        res.send();
    }
});
 
 
http.createServer(onRequest).listen(8888); 
console.log("Server has started. Listening on Port 8888"); 
 } 
 
 exports.start = start