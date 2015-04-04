/** @jsx React.DOM */

module.exports = React.createClass({
  getInitialState: function() {
    return {
      onboardingState: 1
    }
  },

  render: function() {
    return (
        <div className="modal bs-example-modal-lg" 
             style={{marginTop:50}}
             id="newUserOnboardingWizardModal">
          <div className="modal-dialog modal-md" style={{fontFamily:"proxima-nova"}}>
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">
                  <i className="fa fa-magic" />&nbsp;
                  <span style={{fontWeight:"bold"}}>Lets Get Started!</span> {" - Step "+this.state.onboardingState}
                  </h4>
              </div>
              <div className="modal-body" style={{padding:0}}>
        
                  <ul className="list-group ob-list" style={{marginBottom:0,width:200}}>
                    <li className="list-group-item ob-step-header"> STEPS</li>
                    <li className="list-group-item ob-step"> <span style={{fontWeight:"bold"}}>Step 1 </span>- Prospect Titles</li>
                    <li className="list-group-item ob-step"> <span style={{fontWeight:"bold"}}>Step 2 </span> - Signals</li>
                    <li className="list-group-item ob-step"> <span style={{fontWeight:"bold"}}>Step 3 </span> - Industry</li>
                    <li className="list-group-item ob-step"> <span style={{fontWeight:"bold"}}>Step 4 </span> - Company Size</li>
                    <li className="list-group-item ob-step" style={{borderBottom:0}}><span style={{fontWeight:"bold"}}>Step 5 </span> - Chrome Extension</li>
                  </ul>
                  <div className="ob-step-holder" >
                    <ProspectTitleStep />
                  </div>
              </div>
              <div className="modal-footer" style={{marginTop:0,paddingTop:10,paddingBottom:10}}>
                <a href="javascript:" className="btn btn-primary btn-gradient">
                  <span style={{fontSize:16,fontWeight:"bold"}}>NEXT </span>
                  &nbsp;<i className="fa fa-chevron-circle-right" />
                </a>
              </div>
          </div>
        </div>
      </div>
    )
  },
})

var ProspectTitleStep = React.createClass({
  render: function() {
    return (
      <div>
          <br/>
          <br/>
        <h4>Enter the titles of prospects you may be interested in</h4>
          <br/>
          <br/>
              <input className="form-control" style={{width:"60%",display:"inline-block",margin:4}}/>
              <input className="form-control" style={{width:"60%",display:"inline-block",margin:4}} />
              <input className="form-control"  style={{width:"60%",display:"inline-block",margin:4}}/>
      </div>
    )
  }
})
