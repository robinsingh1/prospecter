/** @jsx React.DOM */

module.exports = React.createClass({
  // createProspectListFromCompanyListModal
  createProfile: function() {
    //profileName = $(".profileName").val()
    titleProfile = {
      'className': 'ProspectTitleProfile',
      'title_keywords' : $('.prospectRoleKeywords').tagsinput('items').reverse()
    }

    listProfile = {
      'className': 'ListProfile',
      'listName':this.props.currentList,
      'list' : appConfig.pointer('CompanyProspectList', 
                                  this.props.currentListObjectId),
    }

    profiles = [titleProfile, listProfile]

    nonemptyProfiles = _.filter(profiles, function(profile) {
      if(_.values(profile)[1]){ return _.values(profile)[1].length }
    });

    //nonemptyProfiles.push(listProfile)
    nonemptyProfiles.reverse()

    console.log(nonemptyProfiles)
    console.log(this.props.currentList)

    newProfile = {
      name: this.props.currentList,
      profiles: nonemptyProfiles,
      type: 'prospect_profile',
      mining_job:true,
      list_type:"mining_job",
      only_people:true,
      user:{
        __type:'Pointer',
        className:'_User',
        objectId:JSON.parse(localStorage.currentUser).objectId
      },
      company: JSON.parse(localStorage.currentUser).company
    }

    if(nonemptyProfiles.length) {
      this.persistSignal(nonemptyProfiles, _.omit(newProfile,'profiles'))
      $('.modal').click()
      //this.props.addProfile(newProfile)
      $('.prospect-profile-title').val('')
    }
  },

  persistSignal: function(nonemptyProfiles, newProfile) {
    console.log('NEW PROFILE')
    console.log(newProfile)
    updateProfile = this.props.updateProfileWithObjectId

    thissss = this;
    $.ajax({
      url:'https://api.parse.com/1/classes/ProspectProfile',
      headers:appConfig.headers,
      type:'POST',
      data:JSON.stringify(newProfile),
      success:function(ress) {
        console.log('Prospect Profile')
        console.log(ress)

        //thissss.props.updateProfileWithObjectId(newProfile, ress.objectId)
        
        user_id = JSON.parse(localStorage.currentUser).objectId
        newProfile.user = appConfig.pointer('_User', user_id) 
        newProfile.company = JSON.parse(localStorage.currentUser).company

        if(newProfile.type == 'prospect_profile')
          newProfile.mining_job_list = true
          newProfile.list_type = "mining_job"
          newProfile.only_people = true

        $.ajax({
          url: 'https://api.parse.com/1/classes/ProspectList',
          type: 'POST',
          headers: appConfig.headers,
          data:JSON.stringify(_.pick(newProfile, 
                                     'name','user','list_type',
                                     'open_people', 'company',
                                     'mining_job_list')),
          success: function(res) {
            $.ajax({
              url:'https://api.parse.com/1/classes/ProspectProfile/'+ress.objectId,
              type:'PUT',
              headers: appConfig.headers,
              data: JSON.stringify({'prospect_list':{ __type:'Pointer',
                                    className:'ProspectList',objectId:res.objectId } }),
              success: function(res){ console.log(res); 
                $('.modal').click()
                location.href="#signals" 
              },
              error: function(err){ console.log(err) }
            })
          },
          error: function() { }
        })

        // Start Mining Job
        if(newProfile.type == 'prospect_profile') {
          $.ajax({
            //url:'https://nameless-retreat-3525.herokuapp.com/mining_job/title',
            url:'https://nameless-retreat-3525.herokuapp.com/title_mining_job',
            //url:'http://127.0.0.1:5000/title_mining_job',
            type:'GET',
            data: {prospect_profile: ress.objectId},
            success: function(res) { console.log(res) },
            error: function(err) { console.log(err) }
          })
        }

        // Create Profiles
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
            }
          })
        });
      }
    })
  },

  render: function() {
    console.log('PROSPECT LIST FROM COMPANY LIST')
    console.log(this.props)
    options = _.map(this.props.lists, function(list) {
      return <option>{list.name}</option>
    })
    title = (this.props.currentList == "All") ? "Find Prospects At From Company Lists" : <span>Find Prospects from <i className="fa fa-list-alt" />{" "+this.props.currentList}</span>
    return (
      <div className="modal fade " tabIndex="-1" role="dialog" 
           aria-labelledby="mySmallModalLabel" aria-hidden="true" 
           id="createProspectListFromCompanyListModal" 
           style={{top:'50px',overflow:'hidden'}}>
            <div className="modal-dialog modal-sm" style={{width:650}}>
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title" id="myModalLabel">
                    {title}
                  </h4>
                  <a href="javascript:" className="btn btn-success btn-sm" 
                     onClick={this.createProfile}
                     style={{float:'right',marginTop:-28,marginRight:-5}}>
                    Create Profile
                  </a>
                </div>
                <div className="modal-body">
                  <div style={(this.props.currentList == "All") ? {display:'block'} : {display: 'none'}}>
                  <span style={{display:'inline',fontSize:12,fontWeight:'bold'}}>Company List: </span>
                  <select className="form-control input-sm company-prospect-list-select-form" style={{width:400}}>
                    {options}
                  </select>
                  </div>


                  <ProspectProfile />
                </div>
              </div>
            </div>
          </div>
    );
  },
});

var ProspectProfile = React.createClass({
  prospectFormSubmit: function(e) { e.preventDefault() },

  componentDidMount: function() {
    $('.prospectRoleKeywords').tagsinput({
      maxTags: 5,
    })
    $('.bootstrap-tagsinput').width(400)
  },

  render: function() {
    showDetails = (this.props.hideProspectDetails) ? {display: 'none'} : {display:'block'}
    return (
      <div style={showDetails}>
        <form className="createSignal" onSubmit={this.prospectFormSubmit}>
          <span> 
            <span style={{width:140,display:'inline-block'}}>
              <h6>Job Title Keyword: &nbsp;</h6>
            </span>
            <input type="text" 
                   data-role="tagsinput"
                   style={{width:'400px !important'}}
                   className="form-control prospectRoleKeywords" 
                   placeholder="" />
          </span> 
        </form>
      </div>
    )
  }
})
