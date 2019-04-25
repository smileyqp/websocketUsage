var ws = require('nodejs-websocket');

var server = ws.createServer(function(conn){
    console.log('connected');
    conn.on('text',function(str){
        console.log(str);
    });
    setTimeout(function(){
        conn.sendText('来自服务端的消息!');
    },3000);
}).listen(2333);