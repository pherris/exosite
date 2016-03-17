"use strict";
// TempHistoryGraph api - public method is drawChart which you pass the temps
// to draw
var TempHistoryGraph = (() => {
  var chart, data, options = {
    title: 'Temp',
    curveType: 'function',
    legend: { position: 'bottom' }
  };

  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(() => { chart = new google.visualization.LineChart(document.getElementById('curve_chart')); });

  //TODO: memoize with library
  window.onresize = function(event) {
    if (!chart || !data || !options) {
      return;
    }
    chart.draw(data, options);
  };

  return {
    drawChart: drawChart
  };

  function drawChart(temps) {
    chart.draw(google.visualization.arrayToDataTable([['timestamp', 'temperature']].concat(temps)), options);
  }
})();
