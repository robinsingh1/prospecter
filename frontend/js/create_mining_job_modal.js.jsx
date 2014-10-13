/** @jsx React.DOM */

module.exports = React.createClass({
  // createSignalModal
  getInitialState: function() {
    return {
      mining_days : []
    }
  },

  componentDidUdpate: function() {

  },

  createSignal: function() {
  },

  updateDate: function(e) {
    if(!$(e.target).hasClass('no-hover')){
    /*
      $(e.target).addClass('list-group-item-success')
      $(e.target).addClass('no-hover')
      $(e.target).append('<span class="label label-success" style="float:right;">Downloading...</span>')
    */

      /*
      $.ajax({
        url:'',
        headers:appConfig.headers
        data:{},
        success: function(res) {},
        error: function(err) {},
      })
      */
    }
  },

  render: function() {
    // moment.utc(moment().startOf('day')).valueOf()/1000
    dates = []
    for(i=0;i< 30; i++) {  
      date = moment().subtract((i+1), 'days').format('ll')

      dates.push(
        <li onClick={this.updateDate} style={{textAlign:'center'}}
          className="list-group-item download-date">
          <i className="fa fa-calendar" />&nbsp;
          {date} &nbsp; &nbsp; &nbsp;
          <a href="javascript:"
            className="btn btn-success btn-xs">
            Download</a>
        </li>
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

              <ul className="list-group date-download-prospects" 
                  style={{height:400,overflow:'auto',
                  borderBottom:'solid 1px #ddd',
                  cursor:'pointer',
                  borderTop:'solid 1px #ddd'}}>
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

