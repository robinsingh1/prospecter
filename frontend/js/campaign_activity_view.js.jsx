/** @jsx React.DOM */

module.exports = React.createClass({
  // FollowupFeed
  getInitialState: function() {
    return {
      activities: []
    }
  },

  componentDidMount: function() {
    var thiss = this;
    $.ajax({
      url: 'https://api.parse.com/1/classes/SentEmail',
      data:{include: 'campaign,prospect,prospect.email_guesses.pattern'},
      headers: appConfig.headers,
      success: function(res) { thiss.setState({activities: res.results}) },
      error: function() {}
    })
  },

  render: function() {
    activities = <EmailActivities />
    return (
      <div style={{overflow:'auto',height:436}}>
        <table className="table" style={{marginBottom:0}}>
          <thead>
            <th></th>
            <th>Sent </th>
            <th>Prospect </th>
            <th>Email </th>
            <th>Events </th>
            <th style={{textAlign:'center'}}>Action Buttons</th>
            <th>Social</th>
          </thead>
          <tbody>
            {activities}
            <EmailActivities />
            <EmailActivities />
            <EmailActivities />
            <EmailActivities />
          </tbody>
        </table>
      </div>
    )
  }
})

var EmailActivities = React.createClass({
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
          <td><h6>Hunter Sullivan</h6></td>
          <td><h6>15 minutes to help you close more sales...</h6></td>
          <td style={{padding:0, fontSize:12}}>
            <ul className="list-group email-events" style={{marginBottom:0}}>
              <li className="list-group-item list-group-item-info">
                <i className="fa fa-home" />&nbsp;<span style={{fontWeight:'bold'}}>Visited</span>&nbsp;
                <a href="javascript:" >customerohq.com/resources</a> &nbsp;
              </li>
              <li className="list-group-item list-group-item-info">
                <i className="fa fa-home" />&nbsp;<span style={{fontWeight:'bold'}}>Visited</span>&nbsp;
                <a href="javascript:" >customerohq.com/resources</a> &nbsp;
              </li>
              <li className="list-group-item list-group-item-info">
                <i className="fa fa-external-link-square" />&nbsp;
                <span>2:19 pm</span>&nbsp;
                <span style={{fontWeight:'bold'}}>clicked </span>
                <a href="javascript:" >customerohq.com</a>
              </li>
            </ul>
          </td>
          <td style={{textAlign:'center'}}>
            <a href="javascript:" className="btn btn-success btn-xs" style={{width:70,fontWeight:'bold',marginBottom:2}}>Email</a><br/>
            <a href="javascript:" className="btn btn-success btn-xs" style={{width:70,fontWeight:'bold',marginBottom:2}}><i className="fa fa-cloud-upload" />&nbsp;CRM</a><br/>
            <a href="javascript:" className="btn btn-success btn-xs" style={{width:70,fontWeight:'bold',marginBottom:2}}>Call</a>
          </td>
          <td> 
            lol
          </td>
      </tr>
    )
  }
})
