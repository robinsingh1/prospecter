/** @jsx React.DOM */

module.exports = React.createClass({
  // Sent Mail
  getInitialState: function() {
    return {
      sentEmails: []
    }
  },

  componentDidMount: function() {
    thiss = this;
    $.ajax({
      url: 'https://api.parse.com/1/classes/SentEmail',
      data:{include: 'campaign,prospect,prospect.email_guesses.pattern'},
      headers: appConfig.headers,
      success: function(res) { thiss.setState({sentEmails: res.results}) },
      error: function() {}
    })
  },

  render: function() {
    sentEmails = []
    for(i=0;i< this.state.sentEmails.length; i++) 
      sentEmails.push(<SentEmailRow sentEmail={this.state.sentEmails[i]}/>)

    return (
      <div style={{overflow:'auto',height:550}}>
        <table className="table table-striped" style={{marginBottom:0}}>
          <thead>
            <th></th>
            <th>Prospect Name</th>
            <th>Prospect Email</th>
            <th style={{width:290}}>Status</th>
          </thead>
          <tbody>
            {sentEmails}
          </tbody>
        </table>
      </div>
    );
  }
});

var SentEmailRow = React.createClass({
  render: function() {
    sentEmail = this.props.sentEmail
    //console.log(sentEmail)

    email = sentEmail.email
    if(email == "no_email"){
      first = sentEmail.prospect.name.split(' ')[0]
      last = _.last(sentEmail.prospect.name.split(' '))

      pattern = _.findWhere(sentEmail.prospect.email_guesses, {'tried':false})
      data = {first: first, last: last, fi: first[0], li: last[0]}
      email = Mustache.render(pattern.pattern.pattern, data).toLowerCase()
    }

    return (
      <tr>
        <td><h6>
            <i className="fa fa-clock" />
            {moment(sentEmail.createdAt).fromNow()}</h6></td>
        <td>
          <h6 style={{fontSize:14,fontWeight:'bold',marginBottom:0}}>{sentEmail.prospect.name}</h6>
          <h6 style={{marginTop:4,marginBottom:0}}>{sentEmail.prospect.pos.trim()}</h6>
          <h6 style={{marginTop:4}}>{sentEmail.prospect.company_name}</h6>
        </td>
        <td><h6>{email}</h6></td>
        <td style={{paddingTop:13}}>
          <span className="label label-default">Queued</span>
          <i className="fa fa-chevron-circle-right text-muted" 
             style={{paddingLeft:5,paddingRight:5}}/>
          <span className="label label-success">Opened</span>
          <i className="fa fa-chevron-circle-right text-muted" 
             style={{paddingLeft:5,paddingRight:5}}/>
          <span className="label label-default">Delivered</span>
          <i className="fa fa-chevron-circle-right text-muted" 
             style={{paddingLeft:5,paddingRight:5}}/>
          <span className="label label-default">Replied</span>
        </td>
      </tr>
    )
  }
})
