/**
 * The chart below creates a scatter graph. The docs for chartjs have different chart/graph types you can easily plug in by replacing the "new Chart" code on line 54
 *                https://www.chartjs.org/docs/latest/
 * 
 * Instructions:
 * 
 *      1. Are your coordinates formatted as a string (like the strCoords variable below)? 
 *         Then simply paste them over the strCoords values below and open graphing.html in the browser. 
 * 
 *      2. Are your coordinates formatted as an array of objects with x and y properties? Example: [ {x: 12, y: 34 }, { x: 22, y: 0 } ]
 *         Then set the coords array to your data and DO NOT call the getArrayOfCoordObjs() method. 
 * 
 * Notes:
 *      ** If you want the graphed flipped, set 'yAxes.ticks.reverse' to true. (see comment and object below)
 *         If you do not want it flipped, Set 'yAxes.ticks.reverse' to false. (see comment and object below)
 * 
 *      ** If the graph isn't showing up correctly, open up the dev tools and drag the dev tools window bigger/smaller to adjust the size of the graph.
 *         Sometimes the graph becomes clear when the dev tools are open, making the graph smaller.
 * 
 */
let strCoords = `
  122,142,119,137,111,145,132,136,108,139,163,145,115,136,159,144,117,145,154,143,114,144,106,138,139,140,114,136,150,144,154,137,149,136,106,137,115,142,138,140,116,136,138,139,158,144,133,145,165,140,157,136,127,136,130,137,133,136,108,139,122,143,143,137,149,145,150,140,108,142,131,136,122,136,159,142,158,141,132,136,150,142,150,143,110,137,106,143,143,138,127,138,107,141,154,144,127,143,164,136,150,138,135,144,106,141,106,141,127,140,130,141,135,143,131,145,134,136,142,136,110,137,127,138,163,142,106,136,122,138,127,141,127,144,138,144,158,136,149,136,118,139,108,142,130,139,143,137,140,136,122,144,142,142,127,140,147,145,109,143,163,142,114,143,138,145,130,139,151,136,156,136,114,145,127,138,162,144,157,145,122,139,108,139,162,145,122,140,127,136,114,145,159,145,106,142,150,139,109,138,157,145,167,138,106,139,143,139,154,137,155,136,116,141,127,144,122,145,135,137,130,139,122,142,106,142,142,140,164,136,150,144,116,141,122,144,117,140,156,145,138,136,130,138,154,143,106,136,150,144,138,137,143,145,111,136,118,136,164,141,127,144,135,137,159,137,138,141,167,137,135,142,122,137,127,143,150,138,122,141,109,143,163,145,143,139,122,137,140,140,106,145,165,136,146,143,158,141,130,143,138,142,130,138,150,141,154,140,156,136,124,140,117,136,166,145,115,136,167,138,148,145,139,136,159,144,135,145,118,145,155,136,127,145,157,141,114,144,106,140,141,136,122,143,131,136,167,145,130,140,138,142,165,145,140,136,117,136,115,136,134,136,154,138,131,136,143,144,159,144,162,136,126,140,122,145,159,142,150,136,149,145,138,143,125,140,135,143,143,144,122,143,123,140,146,144,163,136,142,143,130,138,130,140,147,145,118,139,162,144,114,145,130,140,139,140,142,143,138,138,134,141,130,142,150,138,106,141,134,144,143,145,106,145,114,136,119,145,162,143,122,139,159,141,130,144,167,145,143,137,116,145,143,139,127,137,158,141,134,141,122,144,133,145,150,141,116,136,167,136,163,136,127,140,117,140,119,136,135,145,110,137,122,136,134,136,162,136,130,143,135,141,164,141,141,141,135,145,154,139,154,142,138,142,122,145,117,136,132,145,106,143,163,145,154,142,164,145,115,145,154,138,159,143,133,141,150,137,127,141,167,137,119,138,155,145,135,144,116,141,106,143,159,137,154,143,106,139,165,136,127,139,149,136,106,136,106,142,150,136,130,142,164,145,115,142,138,138,133,145,163,136,162,144,115,142,122,141,164,145,130,143,164,141,135,143,135,144,123,140,166,139,127,142,131,145,155,145,162,143,154,139,111,136,143,145,154,141,167,145,154,144,110,144,149,145,118,145,109,138,157,141,130,144,159,142,126,140,107,140,109,143,106,144,155,136,167,138,138,144,166,136,165,136,127,143,138,144,117,145,141,140,135,137,146,143,106,144,106,139,130,142,159,143
`

let coords = [];
getArrayOfCoordObjs(strCoords);
console.log(coords);


/**
 * Sets string of coordinates to an array of objects
 * with x and y properties. Example: [ {x: 12, y: 34 }, { x: 22, y: 0 } ]
 */
function getArrayOfCoordObjs(strCoords) {
  let oneSet = { x: 0, y: 0 };
  let inc = 0;
  coords = strCoords.split(',').map(Number).map(c => {
    if (inc === 0) {
      oneSet.x = c;
      inc++;
      return "remove";
    }
    else if (inc === 1) {
      oneSet.y = c;
      inc = 0;
      return JSON.parse(JSON.stringify(oneSet));
    }
  }).filter(c => c !== "remove");
}

let ctx = document.getElementById('myChart');

// Replace below for a different type of chart
new Chart(ctx, {
  type: 'scatter',
  data: {
    datasets: [{
      label: 'Scatter Dataset',
      data: coords // ** Example of what coords looks like: [{ x: 12, y: 34 }, { x: 22, y: 0 }] **
    }]
  },
  options: {
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom'
      }],
      //// *** Use this to flip the graph. Set 'reverse' to false if you don't want it flipped!! **
      yAxes: [{
        ticks: {
          reverse: true,
        }
      }]
    }
  }
});
