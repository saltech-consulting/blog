# Custom charts using c3.js

A short tutorial.

[C3.js](http://c3js.org/) provides a cool layer over [D3.js](https://d3js.org/) that lets you draw charts in a easy way.

## Setup

* In the harness you what the charts to be displayed go to the ```Scripts & Styles``` tab. 
* Add a script, set its type to ```js```, for its name select d3 (D3.js is included by default in Pega). 
* Click the + button to add a new script, set its type to ``js``` in the name field type ```c3```. 
* Click the crosshair button. Select the contect you what to add the file to and click ```Create and Open```.
* On the Edit File tab click ```Upload file```, and select the bundled javascript file provided by C3 (can be downloaded from [here](https://github.com/c3js/c3/releases/tag/v0.4.18)).
* Upload the c3.css file to the pega instace (via ```Records > Technical > Text File```)
* Include the css file in the skin (```Skin > Included Styles > Additional style sheets```). 

## Drawing the chart

For this you will need a section, that can run custom html and js.
* Create a section, on the ```HTML``` tab de-select ```Auto-generated HTML```, select ```Specialty component```, de-select ```Omit extra spaces```.
* Write the following to ```HTML source```

```HTML
<div id="chart"></div>
<script>

var options = {
  name: "D_CustomersLinkedToContacts", // replace this with the name of the data page that will provide the data for the chart
  callback: callbackFunc, // this will be called when the data is received from the server with the data as the first parameter
};

// retieve the data from the DataPage
pega.api.ui.actions.getDataPage(options);

function callbackFunc(resultJSON){
  // transform the data so it can be shown via the charting library
  // customise this to your needs
  var parsed = resultJSON.pxResults.map(function(result){
    return [result.pxPages.CONTACT.pyFirstName + " " + result.pxPages.CONTACT.pyLastName, Number(result.pySummaryCount[0])]
  })
  // render the chart
  renderChart(parsed)
}
  
function renderChart(data){
  var chart = c3.generate({
    bindto: '#chart',
    data: {
      columns: data,
      type : 'donut'
    }
	});
}  

</script>
```

This should be sufficient to include a custom chart to your Pega application using C3.js.
