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
    qry = {
      include: 'campaign,prospect,prospect.email_guesses.pattern',
      order:'-createdAt',
      campaign: {
        __type: 'Pointer',
        className:'Campaign',
        objectId: this.props.selectedCampaign.objectId,
      }
    }
    $.ajax({
      url: 'https://api.parse.com/1/classes/SentEmail',
      data: qry,
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
      <div style={{overflow:'auto',height:417}}>
        <table className="table table-striped" style={{marginBottom:0}}>
          <thead>
            <th></th>
            <th>Prospect Name</th>
            <th>Prospect Email</th>
            <th>Template</th>
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
    /*
    if(email == "no_email"){
      first = sentEmail.prospect.name.split(' ')[0]
      last = _.last(sentEmail.prospect.name.split(' '))

      pattern = _.findWhere(sentEmail.prospect.email_guesses, {'tried':false})
      data = {first: first, last: last, fi: first[0], li: last[0]}
      email = Mustache.render(pattern.pattern.pattern, data).toLowerCase()
    }
    */

    replied = "label label-default"
    opened = "label label-default"
    delivered = "label label-default"
    queued = "label label-default"

    if(sentEmail.replied) 
      replied = "label label-success"
    if(sentEmail.opened) 
      opened = "label label-success"
    if(sentEmail.delivered) 
      delivered = "label label-success"
    if(sentEmail.queued) 
      queued = "label label-success"

    return (
      <tr>
        <td style={{width:100}}><h6>
            <i className="fa fa-clock" />
            {moment(sentEmail.createdAt).fromNow()}</h6></td>
        <td style={{width:200}}>
          <h6 style={{fontSize:14,fontWeight:'bold',marginBottom:0}}>
            {sentEmail.prospect.name}</h6>
          <h6 style={{fontStyle:'italic',marginTop:4,marginBottom:0}}>
            {sentEmail.prospect.pos.trim()}</h6>
          <h6 style={{marginTop:4,fontWeight:'bold'}}>
            <i className="fa fa-building" />&nbsp;
            {sentEmail.prospect.company_name}</h6>
        </td>
        <td style={{width:200}}><h6>{email}</h6></td>
        <td>
          <h6>
            <i className="fa fa-file-text-o" />&nbsp;
            Template
          </h6>
        </td>
        <td style={{paddingTop:13}}>
          <span className={queued}>Queued</span>
          <i className="fa fa-chevron-circle-right text-muted" 
             style={{paddingLeft:5,paddingRight:5}}/>
          <span className={delivered}>Delivered</span>
          <i className="fa fa-chevron-circle-right text-muted" 
             style={{paddingLeft:5,paddingRight:5}}/>
          <span className={opened}>Opened</span>
          <i className="fa fa-chevron-circle-right text-muted" 
             style={{paddingLeft:5,paddingRight:5}}/>
          <span className={replied}>Replied</span>
        </td>
      </tr>
    )
  }
})
