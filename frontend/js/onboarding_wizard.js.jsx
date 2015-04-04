/** @jsx React.DOM */

module.exports = React.createClass({

  render: function() {
    return (
        <div className="modal bs-example-modal-lg" 
             style={{marginTop:50}}
             id="onboardingWizardModal">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-body">
                <h4 className="modal-title">Choose A Feature To Explore:</h4>
                <br/>
        
                <div className="row" style={{fontFamily:"proxima-nova"}}>
                <div className="col-md-3" style={{padding:5}}>
                <div className="panel panel-default">
                  <div className="panel-heading" style={{textAlign:'center',fontWeight:'bold'}}> Signals </div>
                  <div className="panel-body">
                    <div className="btn-gradient feature-badge" >
                      <i className="fa fa-wifi" style={{color:"white",fontSize:40}} />
                    </div>


                  </div>
                  <ul className="list-group">
                    <li className="list-group-item" style={{fontStyle:"talic"}}>
                      Signals scour the web looking for new prospects that fit your ideal customer profile. Predictable revenue start with predictable lead generation. Be the first to reach out to potential prospects with relevant company events!
                    </li>
                    <li className="list-group-item">
                      <a href="javascript:" 
                         className="green-gradient btn btn-success" 
                         style={{display:'block'}}
                         onClick={this.launchCheckout}>Start</a>
                    </li>
                  </ul>
                </div>
                </div>
                <div className="col-md-3" style={{padding:5}}>
                <div className="panel panel-default">
                  <div className="panel-heading" style={{textAlign:'center',fontWeight:'bold'}}> Mining Jobs </div>
                  <div className="panel-body">
                    <div className="btn-gradient feature-badge" style={{paddingLeft:30}}>
                      <i className="fa fa-cloud-download" style={{color:"white",fontSize:40}} />
                    </div>
                  
                  </div>
                  <ul className="list-group">
                  <li className="list-group-item" style={{height:200}}>
Save hours prospecting with our automated mining jobs!</li>
                    <li className="list-group-item">
                      <a href="javascript:" 
                         className="green-gradient btn btn-success" 
                         style={{display:'block'}}
                         onClick={this.launchCheckout}>Start</a>
                    </li>
                  </ul>
                </div>
                </div>
                <div className="col-md-3" style={{padding:5}}>
                <div className="panel panel-default">
                  <div className="panel-heading" style={{textAlign:'center',fontWeight:'bold'}}> Territory Management </div>
                  <div className="panel-body">
                    <div className="btn-gradient feature-badge" style={{paddingLeft:34}}>
                      <i className="fa fa-globe" style={{color:"white",fontSize:40}} />
                    </div>
                  
                  </div>
                  <ul className="list-group">
                    <li className="list-group-item" style={{height:200}}>
                      Organize your prospecting by taking your ideal customer profile nationwide! Potential prospects are organized by location allowing you to build your pipeline for the year in minutes!
                    </li>
                    <li className="list-group-item">
                      <a href="javascript:" 
                         className="green-gradient btn btn-success" 
                         style={{display:'block'}}
                         onClick={this.launchCheckout}>Start</a>
                    </li>
                  </ul>
                </div>
                </div>
                <div className="col-md-3" style={{padding:5}}>
                <div className="panel panel-default">
                  <div className="panel-heading" style={{textAlign:'center',fontWeight:'bold'}}> Campaigns </div>
                  <div className="panel-body">
                    <div className="btn-gradient feature-badge" >
                      <i className="fa fa-paper-plane" style={{color:"white",fontSize:40}} />
                    </div>
                  </div>
                  <ul className="list-group">
                    <li className="list-group-item" style={{height:200}}>
                      Impress your prospects with details in your outreach! Make following up a breeze with simple followup logic!
                    </li>
                    <li className="list-group-item">
                      <a href="javascript:" 
                         className="green-gradient btn btn-success" 
                         style={{display:'block'}}
                         onClick={this.launchCheckout}>Start</a>
                    </li>
                  </ul>
                </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  },

  launchCheckout: function(e) {
    plan = $(e.target).parent().parent().parent().find('.panel-heading').text()
    user = JSON.parse(localStorage.currentUser)
    user.plan = plan
    localStorage.currentUser = JSON.stringify(user)
    console.log('log checkout')
    handler.open({
      name: 'Customero',
      email:JSON.parse(localStorage.currentUser).username,
      allowRememberMe:false,
      description: 'Upgrade Today!',
      amount: 0,
      panelLabel: "Upgrade To "+plan+" Plan",
      opened: function() { },
      closed: function() { console.log("closed") }
    });
  }
})
