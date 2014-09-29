/** @jsx React.DOM */

module.exports = React.createClass({
  // createSignalModal
  createSignal: function() {
    console.log('Create SIgnal Called')
    // Get Name
    profileName = $('.hiring-profile-name').val()

    hiringProfile = {
      'className': 'HiringProfile',
      'roles'    : $('.hiring-role').tagsinput('items').reverse()
    }

    autoProspect = $('.autoprospect > .active').text() ==  " Yes"
    
    revenueProfile = {'className':'RevenueProfile', 
                      'revenues': _.map($('#revenueBtns').find('.active'), 
                                            function(revBtn){
                                              return $(revBtn).text().trim() 
                                            }).reverse()}

    employeeProfile = {'className':'EmployeeProfile', 
                       'employees': _.map($('#employeeBtns').find('.active'), 
                                          function(empBtn){ 
                                            return $(empBtn).text().trim() 
                                          }).reverse()}

    prospectProfile = {
      'className':'ProspectTitleProfile',
      'title_keywords' : $('.prospectRoleKeywords').tagsinput('items').reverse()
    }

    $.ajax({
      url:'https://api.parse.com/1/classes/ProspectProfile',
      headers:appConfig.headers,
      type:'POST',
      data:JSON.stringify({name:profileName, autoProspect:autoProspect,
                          user:{
                            __type:'Pointer',
                            className:'_User',
                            objectId:JSON.parse(localStorage.currentUser).objectId
                          },
                          company: JSON.parse(localStorage.currentUser).company
      }),
      success:function(ress) {
        // Add Signal List

        $.ajax({
          url:'https://api.parse.com/1/classes/HiringProfile',
          headers:appConfig.headers,
          type:'POST',
          data:JSON.stringify({roles: hiringProfile.roles}),
          success:function(res) {
            $.ajax({
              url:'https://api.parse.com/1/classes/ProspectProfile/'+ress.objectId,
              type:'PUT',
              headers:appConfig.headers,
              data:JSON.stringify({profiles:{
                __op: 'AddUnique',
                objects:[{
                  __type:'Pointer',
                  className:'HiringProfile',
                  objectId:res.objectId
                }]}
              }),
            })
          },
        })
        //Create Prospect Profile
        $.ajax({
          url:'https://api.parse.com/1/classes/RevenueProfile',
          headers:appConfig.headers,
          type:'POST',
          data:JSON.stringify({revenues: revenueProfile.revenues}),
          success:function(res) {
            $.ajax({
              url:'https://api.parse.com/1/classes/ProspectProfile/'+ress.objectId,
              type:'PUT',
              headers:appConfig.headers,
              data:JSON.stringify({profiles:{
                __op: 'AddUnique',
                objects:[{
                  __type:'Pointer',
                  className:'RevenueProfile',
                  objectId:res.objectId
                }]}
              }),
            })
          },
        })
        //Create Employee Profile
        $.ajax({
          url:'https://api.parse.com/1/classes/EmployeeProfile',
          headers:appConfig.headers,
          type:'POST',
          data:JSON.stringify({employees: employeeProfile.employees}),
          success:function(res) {
            $.ajax({
              url:'https://api.parse.com/1/classes/ProspectProfile/'+ress.objectId,
              type:'PUT',
              headers:appConfig.headers,
              data:JSON.stringify({profiles:{
                __op: 'AddUnique',
                objects:[{
                  __type:'Pointer',
                  className:'EmployeeProfile',
                  objectId:res.objectId
                }]}
              }),
            })
          },
        })
        //Create Revenue Profile
        $.ajax({
          url:'https://api.parse.com/1/classes/ProspectTitleProfile',
          type:'POST',
          headers:appConfig.headers,
          data:JSON.stringify({title_keywords: prospectProfile.title_keywords}),
          success:function(res) {
            $.ajax({
              url:'https://api.parse.com/1/classes/ProspectProfile/'+ress.objectId,
              type:'PUT',
              headers:appConfig.headers,
              data:JSON.stringify({profiles:{
                __op: 'AddUnique',
                objects:[{
                  __type:'Pointer',
                  className:'ProspectTitleProfile',
                  objectId:res.objectId
                }]}
              }),
            })
          },
        })
      },
    })

    newProfile = {
      name: profileName,
      autoProspect: autoProspect,
      profiles: [
        prospectProfile,
        revenueProfile,
        employeeProfile,
        hiringProfile
      ]
    }
    console.log(newProfile)

    this.props.addProfile(newProfile)
    /* $('#createListModal').modal('hide')
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove(); */
  },

  updateDate: function(e) {
    $(e.target).addClass('list-group-item-success')
    $(e.target).addClass('no-hover')
    $(e.target).append('<span class="label label-success" style="float:right;">Downloading...</span>')
  },

  render: function() {
    dates = []
    for(i=0;i< 52; i++) {  
      first = moment().subtract(i*7, 'days').format('ll')
      second = moment().subtract((i+1)*7, 'days').format('ll')
      date = first+" - "+second
      date = second+" - "+first

      dates.push(
        <li onClick={this.updateDate} 
            className="list-group-item download-date">{date}</li>
      )
    }

    return (
      <div className="modal fade bs-createMiningJob-modal-md" 
           tabIndex="-1" role="dialog" 
           aria-labelledby="mySmallModalLabel" aria-hidden="true" 
           id="createMiningJobModal" 
           style={{top:'50px',overflow:'hidden'}}>
        <div className="modal-dialog modal-sm" style={{width:350}}>
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel">
                <i className="fa fa-cloud-download" />&nbsp;
                Download Prospects
              </h4>
              <a href="javascript:" className="btn btn-success btn-sm" 
                 onClick={this.createSignal}
                 style={{float:'right',marginTop:-28,
                         marginRight:-5,display:'none'}}>
                 Download
              </a>
            </div>
            <div className="modal-body">

              <ul className="list-group" 
                  style={{height:400,overflow:'auto',
                  borderBottom:'solid 1px #ddd',
                  cursor:'pointer',
                  borderTop:'solid 1px #ddd',
                  borderRight:'solid 1px #ddd'}}>
                <h6 style={{margin:0}}>{dates}</h6>
              </ul>

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
  
});

