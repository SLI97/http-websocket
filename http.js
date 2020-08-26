const net = require('net')

// 使用net模块创建服务器，返回的是一个原始的socket对象，与Socket.io的socket对象不同。
const server = net.createServer((socket) => {
    socket.on("data", (buffer) => {
        const str = buffer.toString()
            // console.log(str)

        const myData = "<h1>哈哈Hello</h1>"

        socket.write("HTTP/1.1 200 OK")
        socket.write("\r\n")
        socket.write(`Content-Length: ${Buffer.from(myData).length}`)
        socket.write("\r\n")
            // socket.write("Content-Type: text/html; charset=utf-8\r\n")
        socket.write("Content-Type: application/json; charset=utf-8\r\n")
        socket.write("\r\n")
        socket.write(myData);
        socket.end()
    })
})

server.on("connection", (socket) => {
    console.log("有人连接上了")
})

server.on("close", (socket) => {
    console.log("有人关闭了")
})

server.listen(3000, () => {
    console.log("your application is run at http://localhost:3000")
})