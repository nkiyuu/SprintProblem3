'use strict';

var ws = new WebSocket('ws://localhost:3000');


$(function () {
  ws.onopen = function () {
    console.log('websocket opened');
  }; // Send the message 'Ping' to the server

  $('form').submit(function () {
    console.log("Form clicked");
    ws.send($('#m').val());
    // };
    $('#m').val('');
    return false;
  });
  ws.onmessage = function (msg) {
    var resp = JSON.parse(msg.data);
    $('#messages')
      .append($('<li>')
        .append($('<span class="message">').text(resp.text)));
  };
  ws.onerror = function (err) {
    console.log("err", err);
  };
  ws.onclose = function close() {
    console.log('disconnected');
  };
});
