/** @jsx React.DOM */

module.exports = React.createClass({
  // FollowupFeed
  getInitialState: function() {
    return {
      followups: []
    }
  },

  componentDidMount: function() {
    /*
    var thiss = this;
    $.ajax({
      url: 'https://api.parse.com/1/classes/SentEmail',
      data:{include: 'campaign,prospect,prospect.email_guesses.pattern'},
      headers: appConfig.headers,
      success: function(res) { thiss.setState({activities: res.results}) },
      error: function() {}
    })
    */

    // Batch Start Date
    // Current Batch Date
  },

  render: function() {
    activities = <Followups />
    return (
      <div style={{overflow:'auto',height:436}}>
        <table className="table" style={{marginBottom:0}}>
          <thead>
            <th></th>
            <th>Scheduled for </th>
            <th>Outreach Stage </th>
            <th>Prospect List</th>
            <th>Template </th>
            <th style={{textAlign:'center'}}>Action Buttons</th>
          </thead>
          <tbody>
            {activities}
          </tbody>
        </table>
      </div>
    )
  }
})

var Followups = React.createClass({
  render: function() {
    return (
      <tr>
          <td></td>
          <td>
            <h6>
              <i className="fa fa-clock" />&nbsp;
              29 minutes ago
            </h6>
          </td>
          <td>
            second
          </td>
          <td>
            <h6 style={{cursor:'pointer'}}>
            <i className="fa fa-list-alt" /> &nbsp;
            Boston VP Sales - Retail
            </h6>
          </td>
          <td>
            <h6 style={{cursor:'pointer'}}>
            <i className="fa fa-file-text-o" /> &nbsp;
            Followup #2 - Provide Value <br/>
            <span className="text-muted"> Subject: Just wanted to followup on the last email </span><br/>
            <span className="text-muted"> Body: Just wanted to followup on the last email </span>

            </h6>
          </td>

          <td style={{textAlign:'center'}}>
            <a href="javascript:" className="btn btn-success btn-xs" style={{width:170,fontWeight:'bold',marginBottom:2}}>Send Now</a><br/>
            <a href="javascript:" className="btn btn-success btn-xs" style={{width:170,fontWeight:'bold',marginBottom:2}}>Remind me in 1 hour</a><br/>
          </td>
      </tr>
    )
  }
})
