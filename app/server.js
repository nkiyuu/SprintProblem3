var ws = require('websocket.io');


var server = ws.listen(3000, function () {
  console.log('\033[96m Server running at localhost:3000 \033[39m');
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