/** @jsx React.DOM */

module.exports = React.createClass({
  // FollowupFeed
  getInitialState: function() {
    return {
      followups: []
    }
  },

  componentDidMount: function() {
        // for each batch find followups remaining
        // sort followups by ascending followup day
        //
    // Batch Start Date
    // Current Batch Date
  },

  render: function() {
    var thiss = this;
    followups = _.map(this.props.batches, function(batch) {
      now = moment().startOf('day').valueOf()/1000
      batch.currentDay = moment(batch.started).diff(moment(now),  'days') * -1
      return _.map(thiss.props.followups, function(followup) {
        followup.batch = batch
        if(followup.day >= batch.currentDay)
          return followup
      })
    })
    followups = _.sortBy(followups, function(followup){ return followup.day })

    console.debug(followups)

    activities = _.map(followups[0], function(followup) {
      return <Followups followup={followup} batch={followup.batch}/>
    })
    console.debug(activities)

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
    // this.props.batch
    // this.props.followup
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
