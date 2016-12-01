var fs = require('fs');
var ws = require('websocket.io');


var server = ws.listen(3000, function () {
  console.log('\033[96m Server runnin　\033[39m');
});


// クライアントからの接続イベントを処理
server.on('connection', function (socket) {
  // クライアントからのメッセージ受信イベントを処理
  socket.on('message', function (data) {

    // 受信したメッセージを全てのクライアントに送信する
    server.clients.forEach(function (client) {
      client.send(JSON.stringify({
        success: true,
        type: 'message',
        text: data
      }));
      // 受信メッセージがpingのときpongを返す
      if(data == 'bot ping' || data == 'bot　ping'){
        replyPong(client);
      }
    });
  });
});

function replyPong(client) {
  client.send(JSON.stringify({
    success: true,
    type: 'bot',
    text: 'pong'
  }));
}

function dispHtml(req){
    fs.readFileSync('./index.html', 'utf-8', function(err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.write('not found!');
            return res.end();
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
}