"use strict";
var TableWriter = (() => {
  var tBody = document.querySelector('[class=table-responsive] tbody');

  if (!tBody) {
    console.warn('no dom available matching selector \'[class=table-responsive] tbody\'');
  }

  //Public methods exposed
  return {
    update: update
  };

  //Private method
  function clearTable() {
    while (tBody.firstChild) {
      tBody.removeChild(tBody.firstChild);
    }
  }

  // takes an array of temperatures (e.g. [1458189860, 7]) and writes them to the
  // table - tight coupling with existing DOM here, would probably pull more of
  // that in here
  function update(temps) {
    if (!tBody) return;

    clearTable();

    temps.forEach((temp, idx) => {
      var newRow = tBody.insertRow(-1);
      var cellOne = newRow.insertCell();
      var text = document.createTextNode(idx + 1);
      cellOne.appendChild(text);

      var cellTwo = newRow.insertCell();
      var text = document.createTextNode(temp[0]);
      cellTwo.appendChild(text);

      var cellThree = newRow.insertCell();
      var text = document.createTextNode(temp[1]);
      cellThree.appendChild(text);
    });
  }
})();
