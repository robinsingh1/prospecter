/** @jsx React.DOM */

module.exports = React.createClass({
  // FollowupFeed
  getInitialState: function() {
    return {
      scheduledFollowups: []
    }
  },


  render: function() {
    scheduledFollowups = []
    for(i=0;i< this.state.scheduledFollowups.length; i++){ 
      scheduledFollowups.push(<ScheduledFollowupRow />)
    }

    return (
      <div style={{overflow:'auto', height:550}}>
        <table className="table table-striped" style={{marginBottom:0}}>
          <thead>
            <th></th>
            <th>Prospect Name</th>
            <th>Prospect Email</th>
            <th style={{textAlign:'center'}}>Status</th>
          </thead>
          <tbody>
            {scheduledFollowups}
          </tbody>
        </table>
      </div>
    );
  }
});

var ScheduledFollowupRow = React.createClass({
  render: function() {
    return (
      <tr>

      </tr>
    );
  }
})
