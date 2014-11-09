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
      url: 'https://api.parse.com/1/classes/EmailEvent',
      data: {include: 'prospect,sent_email', order:'-createdAt', limit:1000},
      headers: appConfig.headers,
      success: function(res) { 
        console.log(res.results)
        thiss.setState({activities: res.results}) 
      },
      error: function() {}
    })
  },

  render: function() {
    activities = _.map(this.state.activities, function(activity) {
      return <EmailActivities activity={activity} />
    })

    return (
      <div style={{overflow:'auto',height:417}}>
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
          </tbody>
        </table>
      </div>
    )
  }
})

var Event = React.createClass({
  render: function() {
    event = this.props.event
    if(event == "delivered"){
      iconType = "fa fa-paper-plane"; eventName = "Delivered";
    }else if(event == "failed") {
      iconType = "fa fa-exclamation-circle"; eventName="Failed"
    }else if(event == "opened"){
      iconType = "fa fa-eye"; eventName="Opened"
    }else if(event == "replied"){
      iconType = "fa fa-mail-reply";  eventName = "Replied"
    }else if(event == "visited"){
      iconType = "fa fa-home";  eventName="Visited"
    }

    return (
      <ul className="list-group email-events" style={{marginBottom:0}}>
        <li className="list-group-item list-group-item-info" style={{paddingTop:16, height:49,textAlign:'center'}}>
          <i className={iconType} />&nbsp;<span style={{fontWeight:'bold'}}>{eventName}</span>&nbsp;
        </li>
        <li className="list-group-item list-group-item-info" style={{display:'none'}}>
          <i className="fa fa-home" />&nbsp;<span style={{fontWeight:'bold'}}>Visited</span>&nbsp;
          <a href="javascript:" >customerohq.com/resources</a> &nbsp;
        </li>
        <li className="list-group-item list-group-item-info" style={{display:'none'}}>
          <i className="fa fa-external-link-square" />&nbsp;
          <span>2:19 pm</span>&nbsp;
          <span style={{fontWeight:'bold'}}>clicked </span>
          <a href="javascript:" >customerohq.com</a>
        </li>
      </ul>
    )
  }
})

var EmailActivities = React.createClass({
  render: function() {
    activity = this.props.activity
    prospect = (activity.prospect) ? activity.prospect : {}
    return (
      <tr>
          <td></td>
          <td>
            <h6>
              <i className="fa fa-clock" />&nbsp;
              {moment(activity.createdAt).fromNow()}
            </h6>
          </td>
          <td><h6>{prospect.name}</h6></td>
          <td><h6>{activity.sent_email.subject}</h6></td>
          <td style={{padding:0, fontSize:12}}>
            <Event event={activity.event_type}/>
          </td>
          <td style={{textAlign:'center'}}>
            <div style={{display:'none'}}>
            <a href="javascript:" className="btn btn-success btn-xs" style={{width:70,fontWeight:'bold',marginBottom:2}}>Email</a><br/>
            <a href="javascript:" className="btn btn-success btn-xs" style={{width:70,fontWeight:'bold',marginBottom:2}}><i className="fa fa-cloud-upload" />&nbsp;CRM</a><br/>
            <a href="javascript:" className="btn btn-success btn-xs" style={{width:70,fontWeight:'bold',marginBottom:2}}>Call</a>
          </div>
          </td>
          <td> 
            lol
          </td>
      </tr>
    )
  }
})
