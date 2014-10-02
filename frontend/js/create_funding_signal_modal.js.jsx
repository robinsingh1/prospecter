/** @jsx React.DOM */

module.exports = React.createClass({
  // createCompanyProfileModal
  createProfile: function(e) {
    e.preventDefault()
    profileName = $('.funding-profile-name').val()
    
    //Stage
    //Amount Raised
    //Company Size
    //Approx Revenue

    amountRaisedProfile = {
      'className':'FundingProfile', 
      'revenues': _.map($('#amountRaisedBtns').find('.active'), 
                        function(revBtn){ return $(revBtn).text().trim() }).reverse()
    }

    console.log(amountRaisedProfile)
    profiles = [amountRaisedProfile]

    nonemptyProfiles = _.filter(profiles, function(profile) {
      if(_.values(profile)[1]){ return _.values(profile)[1].length }
    });

    newProfile = {
      name: profileName,
      profiles: nonemptyProfiles,
      user:{
        __type:'Pointer',
        className:'_User',
        objectId:JSON.parse(localStorage.currentUser).objectId
      },
      company: JSON.parse(localStorage.currentUser).company
    }

    if(nonemptyProfiles.length) {
      this.persistSignal(nonemptyProfiles.reverse(), 
                         _.omit(newProfile,'profiles'))

      this.props.addProfile(newProfile)
      $('.modal').click()
    }
  },

  persistSignal: function(nonemptyProfiles, newProfile) {
    console.log('NEW PROFILE')
    console.log(newProfile)
    $.ajax({
      url:'https://api.parse.com/1/classes/ProspectProfile',
      headers:appConfig.headers,
      type:'POST',
      data:JSON.stringify(newProfile),
      success:function(ress) {
        // Add Signal List
        _.map(nonemptyProfiles, function(profile) {
          $.ajax({
            url:'https://api.parse.com/1/classes/'+_.values(profile)[0],
            headers:appConfig.headers,
            type:'POST',
            data:JSON.stringify( _.pick(profile, _.keys(profile)[1]) ),
            success:function(res) {
              $.ajax({
                url:'https://api.parse.com/1/classes/ProspectProfile/'+ress.objectId,
                type:'PUT',
                headers:appConfig.headers,
                data:JSON.stringify({profiles:{
                  __op: 'AddUnique',
                  objects:[{
                    __type:'Pointer',
                    className: _.values(profile)[0],
                    objectId:res.objectId
                  }]}
                }),
              })
            },
          })
        });

      },
    })
  },

  render: function() {
    return (
      <div className="modal fade " tabIndex="-1" role="dialog" 
           aria-labelledby="mySmallModalLabel" aria-hidden="true" 
           id="createFundingSignalModal" 
           style={{top:'50px',overflow:'hidden'}}>
            <div className="modal-dialog modal-sm" style={{width:650}}>
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title" id="myModalLabel">
                    Create Funding Signal
                  </h4>
                  <a href="javascript:" className="btn btn-success btn-sm" 
                     onClick={this.createProfile}
                     style={{float:'right',marginTop:-28,marginRight:-5}}>
                    Create Profile
                  </a>
                </div>
                <div className="modal-body">

                  <div>
                    <form className="createSignal" onSubmit={this.createProfile}>
                      <span> 
                        <h6 style={{width:140,display:'inline-block',
                                    marginBottom:20}}>
                          Funding Profile Name: &nbsp;</h6>
                        <input type="text" 
                               style={{display:'inline-block',width:'73.1%'}}
                               className="form-control funding-profile-name" 
                               placeholder="Funding Profile Name ..."/>
                      </span>
                      <CompanyProfile />

                      <div style={{marginTop:10,display:'none'}}>
                        <h6 style={{width:140,display:'inline-block'}}>
                          Auto Prospect: &nbsp;</h6>
                        <div className="btn-group autoprospect" 
                              data-toggle="buttons" >
                          <label className="btn btn-sm btn-default active">
                            <input type="radio"/> Yes
                          </label>
                          <label className="btn btn-sm btn-default">
                            <input type="radio"/> No
                          </label> 
                        </div>
                      </div>
                    </form>
                  </div>

                </div>
              </div>
            </div>
          </div>
    );
  },

  createFundingProfile: function() {
  },

  componentDidMount: function() {
    _.map($('.hiring-role'),function(input){$(input).tagsinput()})
    $(this.getDOMNode()).find('.hiring-role').tagsinput()
    $('.bootstrap-tagsinput').width('59.1%')
  },

});

var CompanyProfile = React.createClass({
  companyFormSubmit: function(e) { e.preventDefault() },

  componentDidMount: function() {
    $(this.getDOMNode()).find('.btn-default').click(function(e) {
      label = $(e.target).parent('label')
      if(label.hasClass('active'))
        label.removeClass('active')
      else
        label.addClass('active')
    });
  },

  render: function() {
    return (
      <div >
          <h6 style={{display:'none',margin:0,
                      width:140,marginBottom:20}}>Stage </h6>
          <div className="btn-group" data-toggle="buttons" id="employeeBtns"
              style={{display:'none'}}>
              <label className="btn btn-sm btn-default" style={{width:'20%'}}>
                <input type="checkbox"/> Seed
              </label>
              <label className="btn btn-sm btn-default " style={{width:'20%'}}>
                <input type="checkbox"/> Series A
              </label>
              <label className="btn btn-sm btn-default" style={{width:'20%'}}>
                <input type="checkbox"/> Series B
              </label>
              <label className="btn btn-sm btn-default" style={{width:'20%'}}>
                <input type="checkbox"/> Series C
              </label>
              <label className="btn btn-sm btn-default" style={{width:'20%'}}>
                <input type="checkbox"/> Series D+
              </label>
            </div>
            <br/>
            <h6 style={{display:'inline-block',margin:0,width:140,marginBottom:20}}>
              Amount Raised  </h6>
            <div className="btn-group profile-btns" data-toggle="buttons" 
              id="amountRaisedBtns" style={{width:'74%'}}>
              <label className="btn btn-sm btn-default amountRaisedBtn" style={{width:'25%'}}>
                <input type="checkbox"/> {'< $1M'}
              </label>
              <label className="btn btn-sm btn-default amountRaisedBtn" style={{width:'25%'}}>
                <input type="checkbox"/> $1M - $5M
              </label>
              <label className="btn btn-sm btn-default amountRaisedBtn" style={{width:'25%'}}>
                <input type="checkbox"/> $5M - $25M
              </label>
              <label className="btn btn-sm btn-default amountRaisedBtn" style={{width:'25%'}}>
                <input type="checkbox"/> $25M +
              </label>
            </div>

          <br/> 


          <h6 style={{display:'none',margin:0,
                      width:140,marginBottom:20}}>Company Size </h6>
            <div className="btn-group" data-toggle="buttons" id="employeeBtns"
              style={{display:'none'}}>
              <label className="btn btn-sm btn-default employeeBtn">
                <input type="checkbox"/> 1 - 50
              </label>
              <label className="btn btn-sm btn-default employeeBtn">
                <input type="checkbox"/> 50 - 250
              </label>
              <label className="btn btn-sm btn-default employeeBtn">
                <input type="checkbox"/> 250 - 1000
              </label>
              <label className="btn btn-sm btn-default employeeBtn">
                <input type="checkbox"/> 1000 +
              </label>
            </div>

            <br/> <h6 style={{display:'none',margin:0,width:140}}>
              Approx. Revenue  </h6>
            <div className="btn-group" data-toggle="buttons" id="revenueBtns"
              style={{display:'none'}}>
              <label className="btn btn-sm btn-default revenueBtn">
                <input type="checkbox"/> {'< $1M'}
              </label>
              <label className="btn btn-sm btn-default revenueBtn">
                <input type="checkbox"/> $1M - $5M
              </label>
              <label className="btn btn-sm btn-default revenueBtn">
                <input type="checkbox"/> $5M - $25M
              </label>
              <label className="btn btn-sm btn-default revenueBtn">
                <input type="checkbox"/> $25M +
              </label>
            </div>
      </div>
    )
  }
});
