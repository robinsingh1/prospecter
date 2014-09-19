/** @jsx React.DOM */

module.exports = React.createClass({
  // createListModal
  createList: function() {
    console.log($('#listTitle').val())

    data =  {
      'name'        : $('#listTitle').val().trim(),   //Waiting , Running
      'user'        : { '__type':'Pointer',
                      'className':'_User',
                      'objectId':'xWESiw5Smd' },
    }

    $.ajax({
      url:'https://api.parse.com/1/classes/ProspectList',
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

    data.count = 0

    this.props.createList(data)
    
    $('#createListModal').modal('hide')
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    //$('button.close').click()
  },

  createCampaign: function(e) {
    e.preventDefault()
    //console.log($('#newListName').val())
    newCampaignName = $('#newCampaignName').val()
    prospectListName = $('#prospect_lists').val()
    thiss = this
    for(i=0;i< this.props.prospectLists.length; i++){
      if(this.props.prospectLists[i].name == prospectListName){
        prospect_list = this.props.prospectLists[i]; 
        break;
      }
    }
    if(newCampaignName.trim() != "")
      this.props.createCampaign({
        name: newCampaignName,
        prospect_list: prospect_list
      })
    // Disable Modal
    $('.modal-backdrop').click()
    $('.fade').click()
    $('#newCampaignName').val('')
  },

  render: function() {
    prospect_lists = []
    for(i=0;i< this.props.prospectLists.length; i++) {
      prospect_lists.push( <option >{this.props.prospectLists[i].name}</option>)
    }

    return (
      <div className="modal fade bs-createCampaign-modal-sm" 
           tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" 
           aria-hidden="true" id="createListModal" style={{top:'200px'}} >
            <div className="modal-dialog modal-sm">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span>
                    <span className="sr-only">Close</span></button>
                  <h4 className="modal-title" id="myModalLabel">
                    <i className="fa fa-envelope" /> &nbsp;Create Campaign</h4>
                </div>

                <div className="modal-body"> 
                  <form onSubmit={this.createCampaign}>
                    <input id="newCampaignName" 
                           type="text" 
                           placeholder="Enter Campaign Name..." 
                           className="form-control" />

                    <select className="form-control" 
                            id="prospect_lists"
                            style={{marginTop:20,marginBottom:20}}>
                      {prospect_lists}
                    </select>

                    <a href="javascript:" 
                      onClick={this.createCampaign}
                      className="btn btn-success" 
                      style={{display:'block', width:'100%'}}>
                      Create Campaign
                    </a>
                  </form>
                </div>
              </div>
            </div>
          </div>
    );
  }
});

