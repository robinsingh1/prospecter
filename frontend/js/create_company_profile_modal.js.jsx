/** @jsx React.DOM */

module.exports = React.createClass({
  // createCompanyProfileModal
  render: function() {
    return (
      <div className="modal fade bs-createSignal-modal-md" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" 
           id="createCompanyProfileModal" 
           style={{top:'50px',overflow:'hidden'}}>
            <div className="modal-dialog modal-sm" style={{width:650}}>
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title" id="myModalLabel">
                    Create Company Profile
                  </h4>
                  <a href="javascript:" className="btn btn-success btn-sm" 
                     onClick={this.createCompanyProfile}
                     style={{float:'right',marginTop:-28,marginRight:-5}}>
                    Create Profile
                  </a>
                </div>
                <div className="modal-body">
                  <CreateHiringSignal />
                </div>
              <div className="modal-footer" style={{display:'none'}}>
                <button type="button" className="btn btn-default">
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Send Email
                </button>
              </div>
              </div>
            </div>
          </div>
    );
  },

  createCompanyProfile: function() {
    profileName = $(".company-profile-name").val()
    industryProfile = {
      'className': 'IndustryProfile',
      'industries' : $('.company-profile-industries').tagsinput('items').reverse()
    }

    locationProfile = {
      'className': 'LocationProfile',
      'locale'    : $('.company-profile-location').tagsinput('items').reverse()
    }

    employeeProfile = {
      'className':'EmployeeProfile', 
      'employees': _.map($('#company-profile-employeeBtns').find('.active'), 
                        function(revBtn){ return $(revBtn).text().trim() }).reverse()
    }

    revenueProfile = {
      'className':'RevenueProfile', 
      'revenues': _.map($('#company-profile-companyRevenueBtns').find('.active'), 
                        function(revBtn){ return $(revBtn).text().trim() }).reverse()
    }

    console.log(locationProfile)
    
    profiles = [industryProfile, locationProfile,
                employeeProfile, revenueProfile]

    nonemptyProfiles = _.filter(profiles, function(profile) {
      if(_.values(profile)[1]){ return _.values(profile)[1].length }
    });

    newProfile = {
      name: profileName,
      profiles: nonemptyProfiles,
      mining_job:true,
      user:{
        __type:'Pointer',
        className:'_User',
        objectId:JSON.parse(localStorage.currentUser).objectId
      },
      company: JSON.parse(localStorage.currentUser).company
    }

    if(nonemptyProfiles.length) {
      this.persistSignal(nonemptyProfiles, 
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

});

var CreateHiringSignal = React.createClass({
  componentDidMount: function() {
    _.map($('.hiring-role'),function(input){$(input).tagsinput()})
    $(this.getDOMNode()).find('.hiring-role').tagsinput()
    $('.bootstrap-tagsinput').width(400)

    $(this.getDOMNode()).find('.btn-default').click(function(e) {

      if($(e.target).parent('label').hasClass('active'))
        $(e.target).parent('label').removeClass('active')
      else
        $(e.target).parent('label').addClass('active')

      console.log($(e.target).parent('label'))
    });
  },

  render: function(){
    return (
      <div>
        <form className="createSignal" onSubmit={this.createSignal}>
          <span> 
            <h6 style={{width:140,display:'inline-block',marginBottom:20}}>
              Company Profile Name: &nbsp;</h6>
            <input type="text" 
                   style={{display:'inline-block',width:'73.1%'}}
                   className="form-control company-profile-name" 
                   placeholder="Company Profile Name ..."/>
          </span>
          <br/>
          <span style={{display:'block',marginBottom:-10}}> 
            <h6 style={{width:140,display:'inline-block'}}>
              Industries: &nbsp;
            </h6>
            <input type="text" 
                   style={{display:'inline-block',width:'73.1%',marginRight:10}} 
                   data-role="tagsinput"
                   className="form-control hiring-role company-profile-industries" />

                <a href="javascript:" 
                   className="btn btn-xs btn-success" style={{display:'none'}}>
                  <i className="fa fa-plus" />
                </a>
          </span>
          <br/>
          <span style={{display:'block',marginBottom:-10}}> 
            <h6 style={{width:140,display:'inline-block'}}>
              Location: &nbsp;
            </h6>
            <input type="text" 
                   style={{display:'inline-block',width:'73.1%',marginRight:10}} 
                   data-role="tagsinput"
                   className="form-control hiring-role company-profile-location" />

            <a href="javascript:" 
               className="btn btn-xs btn-success" style={{display:'none'}}>
              <i className="fa fa-plus" />
            </a>
          </span>
        <div >
            <br/> 
            <h6 style={{display:'inline-block',margin:0,
                        width:140,marginBottom:20}}>Company Size </h6>
              <div className="btn-group" data-toggle="buttons" 
                style={{width:'73.5%'}}
                id="company-profile-employeeBtns">
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
              <div className="btn-group" data-toggle="buttons" 
                style={{display:'none'}}
                id="company-profile-companyRevenueBtns">
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

          <div style={{marginTop:10}}>
            <h6 style={{width:140,display:'inline-block'}}>Auto Prospect: &nbsp;</h6>
            <div className="btn-group autoprospect" data-toggle="buttons" >
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
    )
  },
});
