var ws = require('nodejs-websocket');

var server = ws.createServer(function(conn){
    console.log('connected');
    conn.on('text',function(str){
        console.log(str);
        //conn.sendText(str);//将接收道德str用sendText方法传给接收到的一个连接
        //boardcast(str);//调用广播方法将节后到的传给所有的浏览器

        var data = JSON.parse(str);
        switch (data.type){
            case 'chat':
                //boardcast(conn.nickname + '说:' + data.text);
                boardcast(JSON.stringify({name:conn.nickname,text:conn.nickname + '说:' + data.text}));
                break;                
            case 'setname':
                conn.nickname = data.name;
                //boardcast(data.name+'加入了房间');
                boardcast(JSON.stringify({text:data.name+'加入了房间',name:conn.nickname}));
                break;
        }
            
    });
    // setTimeout(function(){
    //     conn.sendText('来自服务端的消息!');
    // },3000);
    conn.on('close',function(){
        boardcast(JSON.stringify({name:conn.nickname,text:conn.nickname+'退出了房间'}));
    });
    conn.on('error',function(err){
        console.log(err);
    });
}).listen(2333);

/**
 * 这个connections是一个数组包含我们所有的连接
 */
//我们来写一个广播吧
function boardcast(str){
    server.connections.forEach((conn) => {
        conn.sendText(str);
    });
}