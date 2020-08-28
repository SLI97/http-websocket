const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require("fs")

const server = http.createServer();
//通过request事件来响应request请求
server.on('request',function(req, res){
	const urlPath = url.parse(req.url).pathname;
	const qs = querystring.parse(req.url.split('?')[1]);
	if(urlPath === '/jsonp' && qs.callback){
		res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});
		let data = {
			name: "Monkey"
		};
		data = JSON.stringify(data);
		const callback = qs.callback+'('+data+');';
		res.end(callback);
	}
	else{
		res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
		fs.readFile("./jsonp.html",(err,content)=>{
			res.write(content)
			res.end()
		})
		// res.end('Hell World\n');
	}
});

server.listen('3060');
console.log('Server running!');
