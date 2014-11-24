/** @jsx React.DOM */

module.exports = React.createClass({

  render: function() {
    return (
        <div className="modal bs-example-modal-lg" 
             style={{marginTop:50}}
             id="upgradePlanModal">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-body">
                <h4 className="modal-title">Choose A New Plan:</h4>
                <br/>
        
                <div className="row">
                <div className="col-md-3" style={{padding:5}}>
                <div className="panel panel-default">
                  <div className="panel-heading" style={{textAlign:'center',fontWeight:'bold'}}> Individual </div>
                  <div className="panel-body">
                  <h1 style={{textAlign:'center'}}>$99<small>/month</small></h1>

                  </div>
                  <ul className="list-group">
                    <li className="list-group-item">&nbsp;</li>
                    <li className="list-group-item">Up to 300 emails</li>
                    <li className="list-group-item">Max 1 User</li>
                    <li className="list-group-item">Includes Email</li>
                    <li className="list-group-item">
                      <a href="javascript:" 
                         className="btn-gradient btn btn-primary" 
                         style={{display:'block'}}
                         onClick={this.launchCheckout}>Upgrade</a>
                    </li>
                  </ul>
                </div>
                </div>
                <div className="col-md-3" style={{padding:5}}>
                <div className="panel panel-default">
                  <div className="panel-heading" style={{textAlign:'center',fontWeight:'bold'}}> Startup </div>
                  <div className="panel-body">
                  
                  <h1 style={{textAlign:'center'}}>$499<small>/month</small></h1>
                  </div>
                  <ul className="list-group">
                    <li className="list-group-item">&nbsp;</li>
                    <li className="list-group-item">Up to 1000 emails</li>
                    <li className="list-group-item">Max 10 Users</li>
                    <li className="list-group-item">Includes Quick Start Package</li>
                  <li className="list-group-item">Includes Signals</li>
                    <li className="list-group-item">
                      <a href="javascript:" 
                         className="btn-gradient btn btn-primary" 
                         style={{display:'block'}}
                         onClick={this.launchCheckout}>Upgrade</a>
                    </li>
                  </ul>
                </div>
                </div>
                <div className="col-md-3" style={{padding:5}}>
                <div className="panel panel-default">
                  <div className="panel-heading" style={{textAlign:'center',fontWeight:'bold'}}> Growth </div>
                  <div className="panel-body">
                  
                  <h1 style={{textAlign:'center'}}>$1299<small>/month</small></h1>
                  </div>
                  <ul className="list-group">
                    <li className="list-group-item">&nbsp;</li>
                    <li className="list-group-item">Up to 2500 emails</li>
                    <li className="list-group-item">Up to 25 Users</li>
                    <li className="list-group-item">Bulk CRM Integration</li>
                    <li className="list-group-item">Mining Jobs</li>
                    <li className="list-group-item">
                      <a href="javascript:" 
                         className="btn-gradient btn btn-primary" 
                         style={{display:'block'}}
                         onClick={this.launchCheckout}>Upgrade</a>
                    </li>
                  </ul>
                </div>
                </div>
                <div className="col-md-3" style={{padding:5}}>
                <div className="panel panel-default">
                  <div className="panel-heading" style={{textAlign:'center',fontWeight:'bold'}}> Enterprise </div>
                  <div className="panel-body">
                  <h1 style={{textAlign:'center'}}>$2999<small>/month</small></h1>
                  </div>
                  <ul className="list-group">
                    <li className="list-group-item">&nbsp;</li>
                    <li className="list-group-item">Up to 10000 emails</li>
                    <li className="list-group-item">Up to 100 Users</li>
                    <li className="list-group-item">Dedicated Happinness Officer</li>
                    <li className="list-group-item">Improved Territory Planning</li>
                    <li className="list-group-item">
                      <a href="javascript:" 
                         className="btn-gradient btn btn-primary" 
                         style={{display:'block'}}
                         onClick={this.launchCheckout}>Upgrade</a>
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
    console.log('log checkout')
    handler.open({
      name: 'Customero',
      description: 'Upgrade Today!',
      amount: 0,
      panelLabel: "Upgrade To "+plan+" Plan",
      opened: function() {

      },
      closed: function() {
        console.log("closed")
        //location.reload()
      }
    });
  }
})
