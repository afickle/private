/**
 * Created by lcj on 2016/3/11. hhhhhhhhhh
 */
var http = require('http');

var fs = require('fs');

var path = require('path');

var mime = require('mime');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var cache = {};
// comments json file
var COMMENTS_FILE = path.join(__dirname, 'comments.json');

console.log(COMMENTS_FILE)

function send404(response){
    response.writeHead(404,{'Content-Type': 'Text/plain'});
    response.write('Error 404: resource not found.');
    response.end();
}

function sendFile(response,filePath,fileContents){
    response.writeHead(
        200,
        {"content-type":mime.lookup(path.basename(filePath))}
    );
    response.end(fileContents);
}

function serverStatic(response,cache,absPath){
    if (cache[absPath]) {
        sendFile(response,absPath,cache[absPath]);
    }else {
        fs.exists(absPath,function(exists){
            if(exists){
                fs.readFile(absPath, function (err,data) {
                    if(err){
                        send404(response);
                    }else{
                        cache[absPath] = data;
                        sendFile(response,absPath,data);
                    }
                });
            }else{
                send404(response);
            }
        });
    }
}

var server = http.createServer(function(request , response) {
    var filePath = false;

    if (request.url == '/'){
        filePath = 'views/index.html';
    }else{
        filePath =  request.url;
    }

    var absPath = './' + filePath;
    serverStatic(response,cache,absPath);
});

 server.listen(8090,function() {
     console.log("Server listen on port 8090.");
 });