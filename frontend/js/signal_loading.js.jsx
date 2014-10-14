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

  componentDidMount: function() {
    Pusher.log = function(message) {
      if (window.console && window.console.log) {
        window.console.log(message);
      }
    };

    var pusher = new Pusher('1a68a96c8fde938fa75a');
    objectId = this.props.currentProfile.objectId
    var channel = pusher.subscribe('6hFe9lVtbS');
    var thiss = this;
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
  },

  //<div style={{backgroundColor:'#ebf1f7',height:'100%',paddingTop:10}}> 
  render: function() {
    return (
      <div style={{background:'linear-gradient(#dae8ff,#dae8ff)', backgroundImage: 'radial-gradient(circle at center center,#fff,#dff1fd 900px)',height:'100%',paddingTop:10}}> 
        <div className="signal-card" style={{
            width:500,textAlign:'center',display:'block',marginRight:'auto',
            marginLeft:'auto',marginTop:0,height:200
          }}>
          <div className="loading-pulse" style={{display:'block',marginRight:'auto',marginLeft:'auto',marginTop:70}}></div>
          <div id="#mining_job_count" style={{color:'#1ca3fd', fontWeight:'bold',marginTop:-10,marginLeft:-200,
                                              fontSize:32, fontFamily:'Proxima-Nova'}}>
            {this.state.count + " people found."}
          </div>
          <div style={{float:'right',marginTop:-48,marginRight:55}}>
            <h6 style={{marginBottom:3, fontWeight:'bold'}}>John Doe - &nbsp;
              <span style={{fontWeight:500, fontStyle:'italic'}}>Vp Sales</span></h6> 
            <h6 style={{marginTop:0,textAlign:'left'}}>Acme Corp.</h6> 
          </div>
        </div>
      </div>
    )
  },
});
