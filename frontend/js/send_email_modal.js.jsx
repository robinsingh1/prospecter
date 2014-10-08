/** @jsx React.DOM */

module.exports = React.createClass({
  getInitialState: function() {
    return {
      currentProspect: 0,
    }
  },
  //SendEmailModal
  render: function() {
    //console.log(this.props.currentTemplate)
    prospect = this.props.prospects[this.state.currentProspect]
    prospect = (prospect) ? prospect : {'name':'','email':''}
    //console.log(prospect)
    prospects = []
    for(i=0; i< this.props.prospects.length; i++){
      prospects.push(<UserPlaceHolder prospect={this.props.prospects[i]}/>)
    }
    email = (prospect.email) ? prospect.email.toLowerCase() : ""
    return (
          <div className="modal fade bs-sendEmail-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" id="sendEmailModal" style={{top:'10px'}}>
            <div className="modal-dialog modal-lg" >
              <div className="modal-content" >
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span>
                    <span className="sr-only">Close</span></button>
        <button type="button" 
                style={{float:'right'}}
                className="btn btn-primary btn-sm">
                <i className="fa fa-paper-plane" />&nbsp;
                Send Email</button>
        <button type="button" style={{marginRight:10, float:'right'}}
                className="btn btn-default btn-sm" data-dismiss="modal">Close</button>
                  <h4 className="modal-title" id="myModalLabel">
                    <i className="fa fa-envelope" /> &nbsp;Send Email
                    &nbsp;&nbsp;
                    <small>{"("+this.props.prospects.length+")"}</small>
                  </h4>
                </div>
                <div className="modal-body" style={{paddingTop:5}}> 
                  <h4>People</h4>
                  
                  <div className="prospect-container" >
                    {prospects}
                  </div>
                  <br/>
                  <h4 style={{display:'inline-block'}}>Emails &nbsp;&nbsp;&nbsp;
                    <small>{(this.state.currentProspect+1)+' of '+this.props.prospects.length}</small></h4>
                  &nbsp;&nbsp;&nbsp;
                  <a href="javascript:" 
              className={(this.state.currentProspect == 0 ) ? "btn disabled" : "btn"}
                    onClick={this.previousProspect}><i className="fa fa-arrow-left" /></a>
                  <a href="javascript:" 
            className={(this.state.currentProspect == 135 ) ? "btn disabled" : "btn"}
                    onClick={this.nextProspect}><i className="fa fa-arrow-right" /></a>

                  <div>

<ul className="list-group email-holder" style={{borderTop:'solid 1px #eee'}}>
  <li className="list-group-item">
    <h5 style={{display:'inline-block',marginTop:0,marginBottom:0}}>To:&nbsp;&nbsp;</h5> 
    {prospect.name + " - " + email}
  </li>
  <li className="list-group-item">
    <h5 style={{display:'inline-block',marginTop:0,marginBottom:0}}>Subject:&nbsp;&nbsp;</h5> {this.props.currentTemplate.subject}
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
      first_name: prospect.name.split(' ')[0]
    })

    console.log(templateBody)
      
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
              {(this.props.prospect) ? this.props.prospect.name : ""}
            </button>
          </div>
          <button type="button" className="btn btn-success btn-sm">
            <i className="fa fa-trash-o" />
          </button>
        </div>
    )
  }
});
