/** @jsx React.DOM */

module.exports = React.createClass({
  getInitialState: function() {
    return {
      currentProspect: 0,
    }
  },

  sendEmails: function() {
    selectedCampaign = this.props.selectedCampaign
    campaign_id = selectedCampaign.objectId
    prospectlist_id = selectedCampaign.prospect_list.objectId
    template_id = this.props.currentTemplate.objectId
    
    $.ajax({
      //url:'https://nameless-retreat-3525.herokuapp.com/send_email',
      url:'http://127.0.0.1:5000/send_email',
      data: {
        template_id : template_id,
        campaign_id : campaign_id,
        prospectlist_id : prospectlist_id,
      },
      success: function(res) { console.log(res.results) },
      error: function(err) { console.log(err) }
    })

    /* */
    // Update Followup
    // Persist Followup
    // close modal
  },

  render: function() {
    prospect = this.props.prospects[this.state.currentProspect]
    prospect = (prospect) ? prospect : {'name':'','email':''}

    var thiss = this;
    console.debug('SEND EMAIL BATCH')
    console.debug(this.props.currentBatch)
    newBatch = _.isEqual(this.props.currentBatch, {})
    prospects = (newBatch) ? this.props.newProspects : this.props.prospects
    if(newBatch){
      prospects = _.map(this.props.newProspects, function(prospect) {
          return <UserPlaceHolder prospect={prospect}/>
      })
    } else {
      prospects = _.map(this.props.prospects, function(prospect) {
        if(_.findWhere(prospect.batches, {objectId: thiss.props.currentBatch}))
          return <UserPlaceHolder prospect={prospect}/>
      })
    }
    prospects = _.compact(prospects)
    console.debug(prospects)
    console.debug(prospects.length)
    prospectCount = prospects.length
    email = (prospect.email) ? prospect.email : ""
    if(email == "no_email" || email == "") {
      console.log('GUESSING')
      if(prospect.email_guesses) {
        console.log('GUESSING EMAIL')
        guess = _.findWhere(prospect.email_guesses, {tried: false})
        name = _.title(prospect.name.trim())

        vars = {
          first: _.first(name.split(' ')).replace(/\W/g, ''),
          last: _.last(name.split(' ')).replace(/\W/g, ''),
          fi: _.first(name.split(' '))[0].replace(/\W/g, ''),
          li: _.last(name.split(' '))[0].replace(/\W/g, '')
        }
        if(guess){
          console.log(guess.pattern.pattern)
          email = Mustache.render(guess.pattern.pattern, vars)
          email = email+"@"+prospect.domain
        }
      } else {
        console.log('NO GUESSES FOUND')
      }
    }
    email = email.toLowerCase()
    email = email
    return (
      <div className="modal fade bs-sendEmail-modal-lg" tabIndex="-1" 
           role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" 
           id="sendEmailModal" style={{top:'10px'}}>
            <div className="modal-dialog modal-lg" >
              <div className="modal-content" >
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span>
                    <span className="sr-only">Close</span></button>
        <button type="button" 
                onClick={this.sendEmails}
                style={{float:'right'}}
                className="btn btn-primary btn-sm">
                <i className="fa fa-paper-plane" />&nbsp; Send Email</button>
        <button type="button" style={{marginRight:10, float:'right'}}
                className="btn btn-default btn-sm" data-dismiss="modal">Close</button>
                  <h4 className="modal-title" id="myModalLabel">
                    <i className="fa fa-envelope" /> &nbsp;Send Email
                    &nbsp;&nbsp;
                    <small>{"("+prospectCount+")"}</small>
                  </h4>
                </div>
                <div className="modal-body" style={{paddingTop:5}}> 
                  <h4>People</h4>
                  
                  <div className="prospect-container" >
                    {prospects}
                  </div>
                  <br/>
                  <h4 style={{display:'inline-block'}}>Emails &nbsp;&nbsp;&nbsp;
                  <a href="javascript:" 
              className={(this.state.currentProspect == 0 ) ? "badge btn disabled" : "badge btn"}
                    onClick={this.previousProspect}><i className="fa fa-arrow-left" /></a>&nbsp;&nbsp;
                    <small>{(this.state.currentProspect+1)+' of '+prospectCount}
                  </small></h4>
                  &nbsp;&nbsp;&nbsp;
                  <a href="javascript:" 
            className={(this.state.currentProspect ==  this.props.prospects.length-1) ? "btn disabled badge" : "btn badge"}
                    onClick={this.nextProspect}><i className="fa fa-arrow-right" /></a>

                  <div>

<ul className="list-group email-holder" style={{borderTop:'solid 1px #eee'}}>
  <li className="list-group-item">
    <h5 style={{display:'inline-block',marginTop:0,marginBottom:0}}>To:&nbsp;&nbsp;</h5> 
    
    <span className="label label-primary">{email}</span>
  </li>
  <li className="list-group-item">
    <h5 style={{display:'inline-block',marginTop:0,marginBottom:0}}>Subject:&nbsp;&nbsp;</h5> <span className="label label-primary" >{this.props.currentTemplate.subject}</span>
  </li>
  <li className="list-group-item body"></li>
</ul>
  
                  </div>

                </div>

      <div className="modal-footer" style={{display:'none'}}>
        <button type="button" 
                className="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" 
                className="btn btn-primary">Send Email</button>
      </div>
              </div>
            </div>
          </div>
    );
  },

  previousProspect: function() {
    this.setState({currentProspect: this.state.currentProspect-1 })
  },

  nextProspect: function() {
    this.setState({currentProspect: this.state.currentProspect+1 })
  },

  parseTemplate: function(templateBody) {
    first_name = prospect.name.split(' ')[0]
    //hiring_signal = prospect.signals

    signals = (prospect.signals) ? prospect.signals[0] : ""
    templateBody = Mustache.render(templateBody, {
      hiring_signal: signals,
      first_name: _.title(prospect.name.split(' ')[0])
    })

    //console.log(templateBody)
      
    return templateBody
  },

  componentDidUpdate: function() {
    //console.log(this.props.currentTemplate)
    parsedTemplate = this.parseTemplate(this.props.currentTemplate.body)
    
    //$('.body').html(this.props.currentTemplate.body)
    $('.body').html(parsedTemplate)
  }
});

var UserPlaceHolder = React.createClass({
  render: function() {
    return (
        <div className="btn-group" style={{marginRight:5,marginBottom:5}}>
          <div className="btn-group">
            <button type="button"   
                    className="btn btn-success btn-sm">
              <i className="fa fa-user" />&nbsp;&nbsp;
              {(this.props.prospect) ? _.title(this.props.prospect.name) : ""}
            </button>
          </div>
          <button type="button" className="btn btn-success btn-sm">
            <i className="fa fa-trash-o" />
          </button>
        </div>
    )
  }
});
