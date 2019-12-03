var querystring = require("querystring"), 
fs = require("fs"), 
formidable = require("formidable"); 
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());
const postsRoute = require('./routes/posts');

function start(response) { 
console.log("Request handler 'start' was called."); 

var body = '<html>'+  '<head>'+
'<title>' + 'File Upload by Grant Shoop' +  '</title>' +
'<meta http-equiv="Content-Type" '+ 'content="text/html; charset=UTF-8" />'+ 
'</head>'+ '<body>'+ '<center><h1>File Upload Page</h1></center>' +
'<center><p>Please find a png image and upload it to test out this page</p></center>' +
'<br><br><br>' +
'<center><form action="/upload" enctype="multipart/form-data" '+ 'method="post"></center>'+ 
'<center><input type="file" name="upload" multiple="multiple"></center>'+
'<br><br>' +
'<center><input type="submit" value="Upload file" /></center>'+ 
'</form>'+
'<br><br>' +
'<footer style="position: fixed; bottom: 0; justify-content: center; text-align: center; margin: 0 auto;">' + '<p>Grant Shoop 2019</p>' + '</footer>' +
 '</body>'+ 
 '</html>'; 

response.writeHead(200, {"Content-Type": "text/html"});
response.write(body); 
response.end(); 
 } 
 
 function upload(response, request) {
  app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  const course = {
    id: courses.length + 1, 
    name: req.body.name};
  courses.push(course);
  res.send(course);
});
console.log("Request handler 'upload' was called.");


var form = new formidable.IncomingForm(); 
console.log("about to parse");
form.parse(request, function(error, fields, files) { 
console.log("parsing done"); 



fs.rename(files.upload.path, "upload/test.png", function(error) { 
if (error)
{fs.unlinkSync("upload/test.png");
  fs.rename(files.upload.path, "upload/test.png"); 
 } 
}); 

response.writeHead(200, {"Content-Type": "text/html"});
response.write("received image:<br/>"); 
response.write("<center><img src='/show'/ style='width: 400px; height: 400px; object-fit: cover;'></center>"); 
response.end(); 
}); 
 } 

function show(response) {
console.log("Request handler 'show' was called."); 
response.writeHead(200, {"Content-Type": "image/png" });
fs.createReadStream("upload/test.png").pipe(response);  
} 


exports.upload = upload; 
exports.show = show;

