/** @jsx React.DOM */

var LoadingSpinner = require('./loading_spinner.js.min.js')

var Job = React.createClass({
  startJob: function() {
    // Add Linkedin Locations
    // Email When Completed
    // Have Report For Number of Profiles Found / number of emails found per mining job
    
    miningJob = this.props.miningJob
    miningJob.status = "Running"
    miningJob.last_ran = Math.round(+new Date()/1000)

    $.ajax({
      url: 'https://api.parse.com/1/classes/MiningJob/'+miningJob.objectId,
      type:'PUT',
      headers: appConfig.parseHeaders,
      // status should be waiting
      data : JSON.stringify({'status':'Running', 'last_ran':Math.round(+new Date()/1000)+"" }),
      success: function(res) {
        console.log(res)
        // make request to heroku api
        $.ajax({
          //url: 'https://0.0.0.0:5000/mining_job' ,
          url: 'http://agile-plains-2430.herokuapp.com/mining_job' ,
          //type:'POST',
          crossDomain: true,
          data:{'locale':miningJob.locale, 
                'current_title':miningJob.prospect_title,
                'current_user_id':JSON.parse(localStorage.currentUser).objectId,
                'company_id':JSON.parse(localStorage.currentUser).company.objectId,
                'mining_job_id':miningJob.objectId},
          success: function(res) {
            console.log(res)
          },
          error: function(err) {
            console.log(err)
          }
        })
      },
      error: function(err) {
        console.log('error')
        console.log(err)
      }
    });

    this.setState({miningJob: miningJob})
  },

  deleteJob: function() {
    //console.log(this.state.miningJob)
    this.props.deleteJob(this.state.miningJob)
      /*
    $.ajax({
      url: 'https://api.parse.com/1/classes/MiningJob/'+this.state.miningJob.objectId,
      type:'DELETE',
      headers: appConfig.parseHeaders,
      success: function(res) {
        console.log(res)
      },
      error: function(err) {
        console.log('error')
        console.log(err)
      }
    });
      */
  },

  cancelJob: function() {
    miningJob = this.state.miningJob
    miningJob.status = ""

    $.ajax({
      url: 'https://api.parse.com/1/classes/MiningJob/'+miningJob.objectId,
      type:'PUT',
      headers: appConfig.parseHeaders,
      data : JSON.stringify({'status':''}),
      success: function(res) {
        console.log(res)
      },
      error: function(err) {
        console.log('error')
        console.log(err)
      }
    });
    this.setState({miningJob: miningJob})
  },

  render: function(){
    miningJob = this.props.miningJob
    button = (miningJob.status == "") ? <a href="javascript:" className="btn btn-xs btn-success" onClick={this.startJob}> <i className="fa fa-check" />&nbsp;Run </a> : <a href="javascript:" className="btn btn-xs btn-danger" onClick={this.cancelJob}> <i className="fa fa-times" />&nbsp;Cancel </a>

    disabled = ""
    disabled_trash = ""
    /*
    disabled = (miningJob.status == "") ? "btn btn-xs btn-success" : "btn btn-xs btn-success disabled"
    disabled_trash = (miningJob.status == "") ? "btn btn-xs btn-default" :  "btn btn-xs btn-default disabled"
    button = <a href="javascript:" className={disabled} onClick={this.startJob}> <i className="fa fa-check" />&nbsp;Run </a> 
    */

    //console.log(miningJob)
    return (
      <tr>
        <td><h6>{miningJob.prospect_title}</h6></td>
        <td><h6>{miningJob.locale}</h6></td>
        <td><h6>{(miningJob.last_ran == "" ) ? "----" : moment.unix(miningJob.last_ran).fromNow()}</h6></td>
        <td>
          <span className="badge">
            {(miningJob.results == "") ? 0 : miningJob.results}
          </span>&nbsp; 
          <h6 style={{display:'inline-block'}}>profiles found</h6>
        </td>
        <td style={{paddingTop:'12px'}}>
          <span className={(miningJob.status == "" ) ? "label label-primary" : "label label-success"}>
            {(miningJob.status == "") ? "Ready" : miningJob.status}
          </span>
        </td>
        <td style={{paddingTop:'13px',width:'105px'}}>
          {button}
          &nbsp;
          <a href="javascript:" className={disabled_trash}
                  onClick={this.deleteJob}> 
            <i className="fa fa-trash-o" />
          </a>
        </td>
      </tr>
    );
  }
});


module.exports = React.createClass({
  // Mining Jobs
  //{(prospects.length == 0 && this.state.loading == false) ? <EmptyCompanyProspectsPanel /> : ""}
  getInitialState: function() {
    return { 
      miningJobs : [],
      loading    : true
    }
  },

  deleteJob: function(job) {
    //console.log(job.objectId)
    var filtered = _.filter(this.state.miningJobs, function(item) {
       console.log(item.objectId != job.objectId)
       return item.objectId != job.objectId
    });
    //console.log(filtered)
    this.setState({miningJobs: filtered})
  },

  render: function () {
    //console.log('render')
    miningJobs = []
    for(i=0;i<this.state.miningJobs.length;i++){
      miningJob = this.state.miningJobs[i]
      miningJobs.push(
        <Job deleteJob={this.deleteJob} miningJob={miningJob}/>
      )
    }

    return (
      <div>
      <div className="mining-job-toolbar container" style={{width:'100%'}}>
        <a href="javascript:" className="btn btn-success btn-xs" data-toggle="modal" data-target=".bs-example-modal-sm">
          <i className="fa fa-plus"/> &nbsp; Find Prospects By Title and Area
        </a>
        &nbsp; &nbsp;
        <a href="javascript:" className="btn btn-success btn-xs disabled" data-toggle="modal" data-target=".bs-example-modal-sm">
          <i className="fa fa-plus"/> &nbsp; Find Companies Hiring For Roles
        </a>
        &nbsp; &nbsp;
        <a href="javascript:" className="btn btn-success btn-xs disabled" data-toggle="modal" data-target=".bs-example-modal-sm">
          <i className="fa fa-plus"/> &nbsp; Find Companies Who Just Raised Funding
        </a>
        &nbsp; &nbsp;
        <a href="javascript:" className="btn btn-success btn-xs disabled" data-toggle="modal" data-target=".bs-example-modal-sm">
          <i className="fa fa-plus"/> &nbsp; Find Companies By Industy And Area
        </a>
        &nbsp; &nbsp;
        <a href="javascript:" className="btn btn-success btn-xs disabled" data-toggle="modal" data-target=".bs-example-modal-sm">
          <i className="fa fa-plus"/> &nbsp; Press Coverage
        </a>
    </div>
      <div id="autoscroll" style={{height:'400px',overflow:'auto'}}>
        <table className="table table-striped">
          <thead>
            <th>Job Title</th>
            <th>City</th>
            <th>Last Ran</th>
            <th>Results</th>
            <th>Status</th>
            <th>&nbsp;</th>
          </thead>
          <tbody>
            {miningJobs}
          </tbody>
        </table>
          {(this.state.loading) ? <LoadingSpinner /> : ""}
        <createJobModal createJob={this.createJob}/>
      </div>
      </div>
    );
  },
  
  runMiningJob: function() {

  },

  createJob: function(data) {
    miningJobs = this.state.miningJobs
    miningJobs.push(data)
    this.setState({ miningJobs: miningJobs })

    $('#miningJobModal').modal('hide')
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  },

  componentDidMount: function() {
    console.log('this did mount')
    thiss = this;
    qry = 'where={"company":'+company+'}&count=1&order=-createdAt'
    $.ajax({
      url:'https://api.parse.com/1/classes/MiningJob',
      type:'GET',
      headers: appConfig.parseHeaders,
      data: qry,
      success: function(res) {
        thiss.setState({miningJobs : res.results})
        thiss.setState({loading    : false})
        console.log(res)
      },
      error: function(err) {
        console.log(err)
      }
    });
  }

});

var createJobModal = React.createClass({
  createMiningJob: function() {
    console.log('mining job')
    console.log($('#prospectTitle').val())
    console.log($('#locale').val())

    data =  {
      'prospect_title': $('#prospectTitle').val(),
      'locale'        : $('#locale').val(),
      'last_ran'      : '',
      'results'       : '',
      'status'        : '',   //Waiting , Running
    }
    //  update local jobs state
    $.ajax({
      url:'https://api.parse.com/1/classes/MiningJob',
      type:'POST',
      headers: appConfig.parseHeaders,
      data: JSON.stringify(data),
      success: function(res) {
        console.log(res)
      },
      error: function(err) {
        console.log('error')
        console.log(err)
      }
    });

    this.props.createJob(data)
    
    //$('button.close').click()
  },

  render: function() {
    return (
          <div className="modal fade bs-example-modal-sm" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" id="miningJobModal" style={{top:'200px'}}>
            <div className="modal-dialog modal-sm">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span>
                    <span className="sr-only">Close</span></button>
                  <h4 className="modal-title" id="myModalLabel">
                    <i className="fa fa-bolt" /> &nbsp;Create Mining Job</h4>
                </div>
                <div className="modal-body"> 
                  <form onSubmit={this.createMiningJob}>
                    <input id="prospectTitle" type="text" placeholder="Enter prospect title..." className="form-control"/>
                    <br/>
                    <input id="locale" type="text" placeholder="Enter City Area..." className="form-control"/>
                    <br/>
                    <a href="javascript:" onClick={this.createMiningJob} placeholder="Enter City Area..." className="btn btn-success" style={{display:'block', width:'100%'}}>Start Mining!</a>
                  </form>

                </div>
              </div>
            </div>
          </div>
    );
  }
});

var EmptyMiningJob = React.createClass({
  render: function() {
    return (
      <div className="col-md-offset-3 col-md-6" style={{height:400}}>
      <div className="panel panel-default" style={{marginTop:100,height:200}}>
        <div className="panel-body">
          <h1 className="lead" style={{textAlign:'center'}}>Start Prospecting On Linkedin</h1>
          <a href="javascript:" onClick={this.openLinkedinWindow} className="btn btn-success" style={{backgroundImage: 'linear-gradient(180deg, #0096ff 0%, #005dff 100%) !important',display:'block',marginRight:'auto',marginLeft:'auto',width:200, marginTop:50}}>
            <i className="fa fa-search" /> &nbsp;
            Search for companies!</a>
        </div>
      </div>
    </div>
    );
  }
});
