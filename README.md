# Exosite Chrome-Only Demo Project
This project uses Exosite's websocket API to fetch the last five temperature readings recorded for a simulated device. These readings are displayed to the user along with a input field to allow new sensor readings to be added manually.

The readings are stored on the Exosite platform and should display consistantly across multiple browser instances.

## To Run
Clone the repo and open the `index.html` file in Chrome.

## Helper Classes

### WebSocketConnection
Including this JS file gives you a global `WebSocketConnection` object with one public method:

  * `connect(handler)`: takes an optional handler method which is passed the parsed JSON websocket payload. Returns a promise which is resolved with the `socket` after the connection is established and authenticated.

```
WebSocketConnection.connect((msg) => console.log('received ->', msg)).then(function(socket) {
  //get last known values
  socket.send(JSON.stringify({"calls": [{"id": 2, "procedure": "read", "arguments": [{"alias": "temperature"}, {"limit": 5}]}]}));
}).catch(function(reason) {
  console.log('Handle rejected promise ('+reason+') here.');
});
```

###TableWriter
Not a very reusable component. Include the js file to have a global `TableWriter` object on which you can call:

  * `update(temps)`: takes an array of temperatures (e.g. [[1458189860, 7]]), clears out the table and re-renders it with the provided list.

###FiveTempHistoryGraph
This is the ideal reusable component for displaying temperature history. It's not very customizable or flexible (and only marginally useful), but if you are doing this demo - this is your guy.

  * `drawChart(temps)`: takes an array of temperatures (e.g. [[1458189860, 7]]) and graphs them nicely.

## Next Steps

  * double check spelling
  * discuss the right way to graph the data - the time format in the PDF (03:01:00) seems like it won't work well if the sensor isn't reporting often
  * talk with the team about what could possibly be reusable here
  * consider refactoring HTML to use something like React Components for reuse
  * leverage a build tool like webpack for development
  * create a deployment process which minifies/uglifies/optimizes
