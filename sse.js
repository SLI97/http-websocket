const net = require('net')
const fs = require('fs');
//
net.createServer((socket) => {
	socket.on("data", (buffer) => {
		const url = buffer.toString().split(" ")[1]
		if (url === '/sendMessage') {
			console.log("进来了")
			socket.write("HTTP/1.1 200 OK")
			// socket.write("\r\n")
			// socket.write("Connection: keep-alive")
			socket.write("\r\n")
			socket.write("Content-Type: text/event-stream")
			socket.write("\r\n")
			socket.write("SLI:97");
			socket.write("\r\n")
			socket.write(
				//事件一
				"data:" + new Date().toLocaleTimeString() + "\n\n" + //必须“\n\n”结尾
				//事件二
				": '这是注释！'" + "\n" +
				"event: myEve" + "\n" +
				"data:" + new Date().toLocaleString() + "\n\n"
			);
			// socket.s
			setInterval(function () {
				socket.write(
					"event: myEve" + "\n" +
					"data:" + new Date().toLocaleTimeString() + "\n\n" //必须“\n\n”结尾
				);
			}, 1000);

			// socket.end()
		} else if (url === "/") {
			fs.readFile('./index.html', function (err, content) {
				socket.write("HTTP/1.1 200 OK")
				socket.write("\r\n")
				socket.write("Content-Type: text/html; charset=utf-8")
				socket.write("\r\n")
				socket.write("\r\n")
				socket.write(content)
				// socket.end();
			});
		}
	})

}).listen(3333);

// var http = require('http');
// var fs = require('fs');
//
// http.createServer(function (req, res) {
// 	if(req.url === '/sendMessage') {
// 		res.writeHead(200, {
// 			"Content-Type": "text/event-stream" //设置头信息
// 		});
//
// 		setInterval(function () {
// 			res.write(
// 				//事件一
// 				"data:" + new Date().toLocaleTimeString() + "\n\n" + //必须“\n\n”结尾
// 				//事件二
// 				": '这是注释！'" + "\n" +
// 				"event: myEvent" + "\n" +
// 				"data:" + new Date().toLocaleString() + "\n\n"
// 			);
// 		}, 3000);
// 	} else {
// 		fs.readFile('./index.html', function (err, content) {
// 			res.writeHead(200, {'Content-Type': 'text/html'});
// 			res.end(content, 'utf-8');
// 		});
// 	}
//
// }).listen(3333);
