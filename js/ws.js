"use strict";
//websocket API - public methods are connect and handleEvents
var WebSocketConnection = (() => {
  var socket, eventCallback;

  return {
    connect: connect
  };

  function connect(handler) {

    var promise = new Promise(function(resolve, reject) {
      socket = new WebSocket("wss://m2.exosite.com/ws");
      socket.onopen = () => {

        // authenticate
        socket.send(JSON.stringify({"auth": {"cik":"7be18f09af4560ab9b2dd8a1f639da9794def993"}}));

        socket.onmessage = (event) => {
          var data = JSON.parse(event.data);
          if (handler) {
            handler(data);
          }
        };;

        //subscribe
        socket.send(JSON.stringify({
          "calls":
          [{
            "id": 100,
            "procedure": "subscribe",
            "arguments": [
              {"alias": "temperature"},
              {
                "since": null,
                "timestamp": 30000
              }
            ]
          }]
        }));

        resolve(socket);
      };
    });

    return promise;
  }
})();
