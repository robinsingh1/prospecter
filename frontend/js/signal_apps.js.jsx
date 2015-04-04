
//var ReactScriptLoaderMixin = require('../lib/react_script_loader.min.js').ReactScriptLoaderMixin;

module.exports = React.createClass({
  getInitialState: function() {
    return {
      pressSignal: ""
    }
  },

  launchModal: function(e) {
    if($(e.target).parent().text().trim() == 'Hiring') {
      $('#createHiringSignalModal').modal()
    } else if($(e.target).text().trim() == 'Funding') {
      this.props.setCurrentPressSignal("Funding", "BfeCJW0YK6")
      $('#createCompanyMiningJobModal').modal() 
    } else if($(e.target).text().trim() == 'Title') {
      $('#createProspectProfileModal').modal()
    } else if($(e.target).text().trim() == 'Territory') {
      $('#createTerritoryStrategyModal').modal()
    } else if($(e.target).text().trim() == 'Company') {
      $('#createCompanyMiningJobModal').modal() 
    } else if($(e.target).text().trim() == 'SMB') {
      this.comingSoon()
    } else if($(e.target).text().trim() == 'Awards') {
      this.props.setCurrentPressSignal("Awards", "xYI8bAh39b")
      $('#createPressSignalModal').modal()       // Press Signal Modal
    } else if($(e.target).text().trim() == 'Social') {
      this.comingSoon()
    } else if($(e.target).text().trim() == 'Product') {
      this.props.setCurrentPressSignal("Product News", "jwfmvkrnQw")
      $('#createPressSignalModal').modal()
    } else if($(e.target).text().trim() == 'M&A') {
      this.props.setCurrentPressSignal("M&A", "rXTD2ZeW6D")
      $('#createPressSignalModal').modal()
    } else if($(e.target).text().trim() == 'Contracts') {
      this.props.setCurrentPressSignal("Contract News", "PEWk9hDbzf")
      $('#createPressSignalModal').modal()
    } else if($(e.target).text().trim() == 'Personnel') {
      this.props.setCurrentPressSignal("Personnel", "UGNDEb6Sy7")
      $('#createPressSignalModal').modal()
    }
  },

  /*
  comingSoon(): function() {
    console.log("lol")
    //TODO - add messenger that says coming soon
  },
  */

  render: function() {
    return (
      <div className="signal-gradient-bg col-md-12" style={{textAlign:'center',paddingTop:0}}>
        <div style={{marginBottom:25,paddingTop:20,paddingBottom:20}}>
          <h3 style={{display:'none',fontWeight:'bold',color:'white',fontSize:14}}>
            Create Signal Strategy
          </h3>
          <div style={{display:"inline-block"}}>
          <div className="strategy-app" onClick={this.launchModal}> 
            <i className="fa fa-globe signal-icon" />
            <h5 style={{fontSize:11,fontWeight:'bold'}}>Territory</h5>
          </div>
              <h5 style={{fontSize:11,fontWeight:'bold'}} className="lp-text">Territory</h5>
          </div>
          <div style={{display:"inline-block"}}>
          <div className="strategy-app" onClick={this.launchModal}> 
            <i className="fa fa-suitcase signal-icon" />
            <h5 style={{fontSize:11,fontWeight:'bold'}}>Hiring</h5>
          </div>
              <h5 style={{fontSize:11,fontWeight:'bold'}} className="lp-text">Hiring</h5>
          </div>
          <div style={{display:"inline-block"}}>
            <div className="strategy-app" onClick={this.launchModal}> 
              <i className="fa fa-institution signal-icon" />
            <h5 style={{fontSize:11,fontWeight:'bold'}}>Funding</h5>
            </div>
              <h5 style={{fontSize:11,fontWeight:'bold'}} className="lp-text">Funding</h5>
          </div>
          <div style={{display:"inline-block"}}>
            <div className="strategy-app" onClick={this.launchModal}> 
              <i className="fa fa-map-marker signal-icon" />
            <h5 style={{fontSize:11,fontWeight:'bold'}}>SMB</h5>
            </div>
              <h5 style={{fontSize:11,fontWeight:'bold'}} className="lp-text">SMB</h5>
          </div>
          <div style={{display:"inline-block"}}>
            <div className="strategy-app" onClick={this.launchModal}> 
              <i className="fa fa-trophy signal-icon" />
            <h5 style={{fontSize:11,fontWeight:'bold'}}>Awards</h5>
            </div>
              <h5 style={{fontSize:11,fontWeight:'bold'}} className="lp-text">Awards</h5>
          </div>
          <div style={{display:"inline-block"}}>
            <div className="strategy-app" onClick={this.launchModal}> 
              <i className="fa fa-twitter signal-icon" />
              <h5 style={{fontSize:11,fontWeight:'bold'}}>Twitter</h5>
            </div>
              <h5 style={{fontSize:11,fontWeight:'bold'}} className="lp-text">Twitter</h5>
          </div>
          <div style={{display:"inline-block"}}>
            <div className="strategy-app" onClick={this.launchModal}> 
              <i className="fa fa-cubes signal-icon" />
              <h5 style={{fontSize:11,fontWeight:'bold'}}>Product</h5>
            </div>
              <h5 style={{fontSize:11,fontWeight:'bold'}} className="lp-text">Product</h5>
          </div>
          <div style={{display:"inline-block"}}>
            <div className="strategy-app" onClick={this.launchModal}> 
              <i className="fa fa-plus-circle signal-icon" />
              <h5 style={{fontSize:11,fontWeight:'bold'}}>{"M&A"}</h5>
            </div>
              <h5 style={{fontSize:11,fontWeight:'bold'}} className="lp-text">{"M&A"}</h5>
          </div>
          <div style={{display:"inline-block"}}>
            <div className="strategy-app" onClick={this.launchModal}> 
              <i className="fa fa-file-text signal-icon" />
              <h5 style={{fontSize:11,fontWeight:'bold'}}>Contracts</h5>
            </div>
              <h5 style={{fontSize:11,fontWeight:'bold'}} className="lp-text">Contracts</h5>
          </div>
          <div style={{display:"inline-block"}}>
            <div className="strategy-app" onClick={this.launchModal}> 
              <i className="fa fa-user-plus signal-icon" />
              <h5 style={{fontSize:11,fontWeight:'bold'}}>Personnel</h5>
            </div>
              <h5 style={{fontSize:11,fontWeight:'bold'}} className="lp-text">Personnel</h5>
          </div>
          <div style={{display:"inline-block"}}>
            <div className="strategy-app" onClick={this.launchModal}> 
              <i className="fa fa-user signal-icon" />
              <h5 style={{fontSize:11,fontWeight:'bold'}}>Title</h5>
            </div>
              <h5 style={{fontSize:11,fontWeight:'bold'}} className="lp-text">Title</h5>
          </div>
          <div style={{display:"inline-block"}}>
            <div className="strategy-app" onClick={this.launchModal}> 
              <i className="fa fa-building signal-icon" />
              <h5 style={{fontSize:11,fontWeight:'bold'}}>Company</h5>
            </div>
              <h5 style={{fontSize:11,fontWeight:'bold'}} className="lp-text">Social</h5>
          </div>
        </div>

        <SignalAmCharts />

      </div>
    )
  }
});

var SignalAmCharts = React.createClass({
  componentDidMount: function() {
var chartData1 = [];
var chartData2 = [];
var chartData3 = [];
var chartData4 = [];

generateChartData();

function generateChartData() {
  var firstDate = new Date();
  firstDate.setDate(firstDate.getDate() - 500);
  firstDate.setHours(0, 0, 0, 0);

  for (var i = 0; i < 500; i++) {
    var newDate = new Date(firstDate);
    newDate.setDate(newDate.getDate() + i);

    var a1 = Math.round(Math.random() * (40 + i)) + 100 + i;
    var b1 = Math.round(Math.random() * (1000 + i)) + 500 + i * 2;

    var a2 = Math.round(Math.random() * (100 + i)) + 200 + i;
    var b2 = Math.round(Math.random() * (1000 + i)) + 600 + i * 2;

    var a3 = Math.round(Math.random() * (100 + i)) + 200;
    var b3 = Math.round(Math.random() * (1000 + i)) + 600 + i * 2;

    var a4 = Math.round(Math.random() * (100 + i)) + 200 + i;
    var b4 = Math.round(Math.random() * (100 + i)) + 600 + i;

    chartData1.push({
      date: newDate,
      value: a1,
      volume: b1
    });
    chartData2.push({
      date: newDate,
      value: a2,
      volume: b2
    });
    chartData3.push({
      date: newDate,
      value: a3,
      volume: b3
    });
    chartData4.push({
      date: newDate,
      value: a4,
      volume: b4
    });
  }
}

var chart = AmCharts.makeChart("chartdiv", {
  type: "stock",
  "theme": "none",
  pathToImages: "http://www.amcharts.com/lib/3/images/",
  color: "#FFFFFF",
  "lineColor": "#fbd51a",

  dataSets: [{
      title: "yoyo",
      fieldMappings: [{
        fromField: "value",
        toField: "value"
      }, {
        fromField: "volume",
        toField: "volume"
      }],
      dataProvider: chartData1,
      categoryField: "date"
    },

    {
      title: "second data set",
      fieldMappings: [{
        fromField: "value",
        toField: "value"
      }, {
        fromField: "volume",
        toField: "volume"
      }],
      dataProvider: chartData2,
      categoryField: "date"
    },

    {
      title: "third data set",
      fieldMappings: [{
        fromField: "value",
        toField: "value"
      }, {
        fromField: "volume",
        toField: "volume"
      }],
      dataProvider: chartData3,
      categoryField: "date"
    },

    {
      title: "fourth data set",
      fieldMappings: [{
        fromField: "value",
        toField: "value"
      }, {
        fromField: "volume",
        toField: "volume"
      }],
      dataProvider: chartData4,
      categoryField: "date"
    }
  ],

  panels: [{

      showCategoryAxis: false,
      title: "Value",
      percentHeight: 70,
      color:"#fff",

      stockGraphs: [{
        id: "g1",
        lineColor: "#fff",
        fillColors: "#fff",
        textColors: "#fff",
        color:"#fff",
          fillAlphas: 0.1,
          lineColor: "#fff",
          //fillColors: "#fff",
          //negativeLineColor: "#db4c3c",
          //negativeFillColors: "#db4c3c",
          useDataSetColors: false,
        borderColor:"#fff",
        valueField: "value",
        comparable: true,
        compareField: "value",
        balloonText: "[[title]]:<b>[[value]]</b>",
        compareGraphBalloonText: "[[title]]:<b>[[value]]</b>"
      }],

      stockLegend: {
        periodValueTextComparing: "[[percents.value.close]]%",
        periodValueTextRegular: "[[value.close]]",
        color:"#fff"
      }
    },

    {
      title: "Volume",
      percentHeight: 30,
      color: "#fff",
      fillColor:"#fff",
      stockGraphs: [{
        valueField: "volume",
        type: "column",
        showBalloon: false,
        fillAlphas: 0.5,
        lineColor:"#fff",
        fillColor:"#fff",
          useDataSetColors: false,
      }],


      stockLegend: {
        periodValueTextRegular: "[[value.close]]",
        color:"#fff"
      }
    }
  ],

  chartScrollbarSettings: {
    graph: "g1"
  },

  chartCursorSettings: {
    valueBalloonsEnabled: true,
        fullWidth:true,
        cursorAlpha:0.1,
         valueLineBalloonEnabled:true,
         valueLineEnabled:true,
         valueLineAlpha:0.5
  },

  periodSelector: {
    position: "left",
    periods: [{
      period: "MM",
      selected: true,
      count: 1,
      label: "1 month"
    }, {
      period: "YYYY",
      count: 1,
      label: "1 year"
    }, {
      period: "YTD",
      label: "YTD"
    }, {
      period: "MAX",
      label: "MAX"
    }]
  },
  legend: {
    bulletType: "round",
    equalWidths: false,
    valueWidth: 120,
    useGraphSettings: true,
    color: "#FFFFFF"
  },

  dataSetSelector: {
    position: "left"
  }
});
  $("#chartdiv").css({
    color:"white",
    "font-family":"proxima-nova"
  })

  $("input").css({
    "background-color": "rgba(0,0,0,0)",
    "border": "1px solid white",
    "border-radius": "5px"
  })

  },

  render: function() {
    return (
      <div id="chartdiv" style={{width:"100%", height:350}}> </div>
    )
  }

})

/*
 
        <table>
          <tr>
            <td> <div className="strategy-app"> </div> </td>
            <td> <div className="strategy-app"> </div> </td>
            <td> <div className="strategy-app"> </div> </td>
            <td> <div className="strategy-app"> </div> </td>
          </tr>
        </table>
*/
