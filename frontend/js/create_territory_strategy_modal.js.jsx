/** @jsx React.DOM */
var Jigsaw = require("../lib/jigsaw.min.js")

module.exports = React.createClass({
  // createCompanyProfileModal
  render: function() {
    return (
      <div className="modal fade bs-createSignal-modal-md" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" 
           id="createTerritoryStrategyModal" 
           style={{top:'50px',overflow:'hidden'}}>
            <div className="modal-dialog modal-sm" style={{width:650}}>
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title" id="myModalLabel">
                    <i className="fa fa-globe" /> &nbsp;
                    Create Territory Stategy
                  </h4>
                  <a href="javascript:" className="btn btn-success btn-sm" 
                     onClick={this.createProfile}
                     style={{float:'right',marginTop:-28,marginRight:-5}}>
                    Create Profile
                  </a>
                </div>
                <div className="modal-body">
        <form className="createSignal" onSubmit={this.createSignal}>
          <span> 
            <h6 style={{width:140,display:'inline-block',marginBottom:20}}>
              Company Profile Name: &nbsp;</h6>
            <input type="text" 
                   style={{display:'inline-block',width:'73.1%'}}
                   className="form-control company-profile-name" 
                   placeholder="Company Profile Name ..."/>
          </span>
        </form>
                  <IndustryMenu />
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

  createProfile: function() {
    profileName = $(".profileName").val()

    titleProfile = {
      'className': 'ProspectTitleProfile',
      'title_keywords': $('.prospect-profile-title').tagsinput('items').reverse()
    }

    revenueProfile = {
      className: "RevenueProfile",
      revenues: _.map($(".revenues:checked"), function(box) { return $(box).parent().parent().text().trim() })
    }

    industryProfile = {
      className: "IndustryProfile",
      industries: _.map($(".industries:checked"), function(box) { return $(box).parent().parent().text().trim() })
    }

    companySizeProfile = {
      className: "EmployeeProfile",
      employees: _.map($(".employees:checked"), function(box) { return $(box).parent().parent().text().trim() })
    }

    profiles = [titleProfile, revenueProfile, industryProfile, companySizeProfile]

    nonemptyProfiles = _.filter(profiles, function(profile) {
      if(_.values(profile)[1]){ return _.values(profile)[1].length }
    });
    console.log(nonemptyProfiles)

    newProfile = {
      name: profileName,
      profiles: nonemptyProfiles,
      type: 'prospect_profile',
      mining_job:true,
      list_type:"territory",
      only_people:true,
      timestamp: moment().valueOf(),
      done: 0,
      user:{
        __type:'Pointer',
        className:'_User',
        objectId:JSON.parse(localStorage.currentUser).objectId
      },
      user_company: Parse._user_company
    }

    if(nonemptyProfiles.length) {
      //this.props.addProfile(newProfile)
      this.persistSignal(nonemptyProfiles, newProfile)
      $('.modal').click()
      $('.prospect-profile-title').val('')
    }
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
      list_type:'territory',
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
          <span style={{display:'block',marginBottom:-10, display:'none'}}> 
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
                style={{width:'75.5%'}}
                id="company-profile-employeeBtns">
                <label className="btn btn-sm btn-default employeeBtn" style={{width:'16%'}}>
                  <input type="checkbox"/> 1 - 20
                </label>
                <label className="btn btn-sm btn-default employeeBtn" style={{width:'16%'}}>
                  <input type="checkbox"/> 20 - 50
                </label>
                <label className="btn btn-sm btn-default employeeBtn" style={{width:'16%'}}>
                  <input type="checkbox"/> 50 - 100
                </label>
                <label className="btn btn-sm btn-default employeeBtn" style={{width:'16%'}}>
                  <input type="checkbox"/> 100 - 250
                </label>
                <label className="btn btn-sm btn-default employeeBtn" style={{width:'16%'}}>
                  <input type="checkbox"/> 250 - 1000
                </label>
                <label className="btn btn-sm btn-default employeeBtn" style={{width:'16%'}}>
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

var IndustryMenu = React.createClass({

  render: function() {
    revenues = _.map(Jigsaw._annual_revenue(), function(val, key) {
      return <SelectGroup name={key} value={val} _class={"revenues"}/>
    })
    employees = _.map(Jigsaw._number_of_employees(), function(val, key) {
      return <SelectGroup name={key} value={val} _class={"employees"}/>
    })
    industries = _.map(Jigsaw._industries(), function(val, key) {
      return <SelectGroup name={key} value={val} _class={"industries"}/>
    })

    return (
    <div className="row">
      <div className="col-md-4">
        <h6>Industry</h6>
        <div className="well" style={{height:200, overflow:"auto"}}>
          {industries}
        </div>
      </div>
      <div className="col-md-4">
        <h6>Revenue</h6>
        <div className="well" style={{height:200, overflow:"auto"}}>
          {revenues}
        </div>
      </div>
      <div className="col-md-4">
        <h6>Company Size</h6>
        <div className="well" style={{height:200, overflow:"auto"}}>
          {employees}
        </div>
      </div>
    </div>
    )
  }
})

var SelectGroup = React.createClass({
  getInitialState: function() {
    return {
      hidden: true,
    }
  },

  toggleHidden: function() {
    this.setState({hidden: !this.state.hidden})
  },

  render: function() {

    icon = (this.state.hidden) ? "fa fa-plus" : "fa fa-minus"
    
    plus_btn = <i className={icon} onClick={this.toggleHidden}
                 style={{float:"left",marginRight:5,marginTop:7,
                         fontSize:9,cursor:"pointer"}}/>
    plus_btn = (this.props.subs) ? plus_btn : ""
    selects = <span> {plus_btn}
              <label className="checkbox-inline">
                <input type="checkbox" id="inlineCheckbox1" className={this.props._class}
                      value={this.props.value}/> 
                {this.props.name}
            </label><br/>
            </span>
    subs = _.map(this.props.subs, function(sub) {
            return <span style={{marginLeft:30}}>
              <label className="checkbox-inline">
              <input type="checkbox" id="inlineCheckbox1" value="option1" /> 
                {sub}
            </label><br/>
          </span>
    })
    select = (this.state.hidden) ? selects : _.flatten([[selects], subs])
    return (
      <span> {select} </span>
    )
  }
})
