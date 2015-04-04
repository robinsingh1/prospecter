module.exports = React.createClass({
  render: function() {
    return (
      <div style={{height:400}}> 
        <Sidebar />
        <Feed />
      </div>
    )
  }
})

var Feed = React.createClass({
  render: function() {
    return (
      <div className="news-feed light-blue-gradient">
        <div>
          <div className="signal-card news-card">
          </div>
          <div className="signal-card pretty-blue-gradient-1 news-card-bottom"></div>
        </div>

      </div>
    )
  }
})

var Sidebar = React.createClass({
  componentDidMount: function() {

  },
  render: function() {
    return (
      <div className="feed-sidebar">
   <div style={{marginTop:20}}>
      <h6 style={{fontWeight:"bold",paddingBottom:0}}>
        <img src="build/img/home.png" className="" style={{height:20}}/>
        FEED </h6>
    </div>
    <div>
      <h6 style={{fontWeight:"bold"}}>
        <i className="fa fa-bolt" style={{paddingLeft:2}}/>&nbsp; RECOMMENDED </h6>
    </div>
    <div >
      <h6 style={{fontWeight:"bold"}}>
        <i className="fa fa-envelope" style={{paddingLeft:2}}/>&nbsp; INBOX
      </h6>
    </div>
    <div >
      <h6 style={{fontWeight:"bold"}}>
        <i className="fa fa-database" style={{paddingLeft:2}}/>&nbsp; CRM News
      </h6>
    </div>
    <div >
      <h6 style={{fontWeight:"bold"}}>
        <i className="fa fa-compass" style={{paddingLeft:2}}/>&nbsp;
        EXPLORE
      </h6>
    </div>
    <div >
      <h6 style={{fontWeight:"bold"}}>
        <i className="fa fa-newspaper-o" style={{paddingLeft:2}}/>&nbsp;
          Social News
      </h6>
      <div style={{marginLeft:35}}>
        <h6> <i className="fa fa-facebook-square" style={{paddingLeft:2}}/>&nbsp;
            Facebook News </h6>
        <h6> <i className="fa fa-twitter-square" style={{paddingLeft:2}}/>&nbsp;
            Twitter News </h6>
        <h6> <i className="fa fa-linkedin-square" style={{paddingLeft:2}}/>&nbsp;
            Linkedin News </h6>
      </div>
    </div>
    <div >
      <h6 style={{fontWeight:"bold"}}>
        <i className="fa fa-newspaper-o" style={{paddingLeft:2}}/>&nbsp;
          Company News
      </h6>
      <div style={{marginLeft:35}}>
        <h6> <i className="fa fa-building" style={{paddingLeft:2}}/>&nbsp;
            Example list </h6>
        <h6> <i className="fa fa-building" style={{paddingLeft:2}}/>&nbsp;
            Example list </h6>
        <h6> <i className="fa fa-building" style={{paddingLeft:2}}/>&nbsp;
            Example list </h6>
      </div>
    </div>
    <div>
      <h6 style={{fontWeight:"bold"}}>
        <i className="fa fa-newspaper-o" style={{paddingLeft:2}}/>&nbsp;
          Prospect News
      </h6>
      <div style={{marginLeft:35}}>
        <h6> <i className="fa fa-user" style={{paddingLeft:2}}/>&nbsp;
            Example list </h6>
        <h6> <i className="fa fa-user" style={{paddingLeft:2}}/>&nbsp;
            Example list </h6>
        <h6> <i className="fa fa-user" style={{paddingLeft:2}}/>&nbsp;
            Example list </h6>
      </div>
    </div>
      
      </div>
    )
  }
})
