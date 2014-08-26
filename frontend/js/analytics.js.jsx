/** @jsx React.DOM */

module.exports = React.createClass({
   //Analytics
  render: function () {
    return (
      <div style={{height:'400px'}} className="">
        <div className="container" style={{width:'100%',padding:'0',height:'100%'}}>
          <AnalyticsSideMenu />
          <div className="col-md-3" style={{padding:'0'}}>
            <table className="table table-striped">
              <thead>
                <th>Stat</th>
                <th>#</th>
              </thead>
              <tbody>
                <tr><td># of People Prospected</td><td>lil</td></tr>
                <tr><td># of Companies Prospected</td><td>lil</td></tr>
                <tr><td># of Emails Sent</td><td>lil</td></tr>
                <tr><td># of Emails Delivered</td><td>lil</td></tr>
                <tr><td># of Emails Delivery Failures</td><td>lil</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
});

var AnalyticsSideMenu = React.createClass({
  render: function() {
    return (
      <div className="col-md-2" style={{padding:'0',height:'100%',backgroundColor:'rgb(90, 107, 119)',borderBottomLeftRadius:'3px'}}>
        <div className="btn-group-vertical" style={{width:'100%'}}>
          <button type="button" className="sharp btn btn-default">
            <i className="fa fa-search" /> &nbsp; Prospecting Overview
          </button>
          <button type="button" className="sharp btn btn-default">
            <i className="fa fa-paper-plane" /> &nbsp; Email Outreach
          </button>
          <button type="button" className="sharp btn btn-default">
            <i className="fa fa-user" /> &nbsp; Team Stats
          </button>
          <button type="button" className="sharp btn btn-default">
            <i className="fa fa-cloud" /> &nbsp; CRM Integration
          </button>
          <button type="button" className="sharp btn btn-default">
            <i className="fa fa-circle-o" /> &nbsp; Sales Cycle
          </button>
        </div>
      </div>
    );
  }
});
