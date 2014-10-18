/** @jsx React.DOM */

module.exports = React.createClass({
  // SignalLoading
  getInitialState: function() {
    return {
      count: '~',
      prospectName : '~',
      prospectTitle : '~',
      companyName : '~',
    }
  },

  initialize: function() {
    var thiss = this;
    var pusher = new Pusher('1a68a96c8fde938fa75a');
    objectId = this.props.currentProfile.objectId
    var channel = pusher.subscribe(objectId);
    channel.bind("my-event", function(data) {
      console.log(data)
      thiss.setState({
        count: data.count,
        prospectName: data.name,
        prospectTitle: data.title,
        companyName: data.company
      })
    });

    // Get Signal Report Count
    // Get Last PeopleSignal Found
    qry = { profile: appConfig.pointer('ProspectProfile',objectId) }
    $.ajax({
      url:'https://api.parse.com/1/classes/SignalReport',
      headers:appConfig.headers,
      data: {'where':JSON.stringify(qry),order:'-createdAt'},
      success: function(res) {
        //console.log(res)
        count = (res.results[0]) ? res.results[0].people_count : 0
        
        thiss.setState({count: count })
      },
    });
    $.ajax({
      url:'https://api.parse.com/1/classes/PeopleSignal',
      headers:appConfig.headers,
      data: {'where':JSON.stringify(qry),order:'-createdAt'},
      success: function(res) {
        //console.log(res)
        thiss.setState({
          prospectName: (res.results[0]) ? res.results[0].link_text : "",
          prospectTitle: (res.results[0]) ? res.results[0].title : "",
          companyName: (res.results[0]) ? res.results[0].company : ""
        })
      },
    });
  },

  componentDidMount: function() {
    Pusher.log = function(message) {
      if (window.console && window.console.log) {
        //window.console.log(message);
      }
    };

    this.initialize()
  },

  componentDidUpdate: function() {
  },

  componentWillReceiveProps: function() {
    this.setState({
      count: '~',
      prospectName : '~',
      prospectTitle : '~',
      companyName : '~',
    })
    this.initialize()
  },

  render: function() {
    // Show companies for hiring signals
    return (
      <div style={{background:'linear-gradient(#dae8ff,#dae8ff)', backgroundImage: 'radial-gradient(circle at center center,#fff,#dff1fd 900px)',height:'100%',paddingTop:10}}> 
        <div className="signal-card" style={{
            width:500,textAlign:'center',display:'block',marginRight:'auto',
            marginLeft:'auto',marginTop:0,height:200
          }}>

        <div className="loading-two-balls" style={{height:20,width:20}}>
          <div className="dot1" style={{color:'black'}}></div>
          <div className="dot2" style={{color:'black'}}></div>
        </div>
        <div id="" style={{color:'#1ca3fd', fontWeight:'bold',marginTop:-10,
                          marginLeft:-200, fontSize:32, fontFamily:'Proxima-Nova'}}>
            {this.state.count + " people found."}
          </div>
          <div style={{float:'right',marginTop:-48,marginRight:55}}>
            <h6 style={{marginBottom:3, fontWeight:'bold'}}>{this.state.prospectName} - &nbsp;
              <span style={{fontWeight:500, fontStyle:'italic'}}>
                {this.state.prospectTitle}</span></h6> 
            <h6 style={{marginTop:0,textAlign:'left'}}>
              {this.state.companyName}
            </h6> 
          </div>
        </div>
      </div>
    )
  },
});
