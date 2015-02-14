/** @jsx React.DOM */

module.exports = React.createClass({
  // createListModal
  createList: function() {
    console.log($('#listTitle').val())

    currentUser = JSON.parse(localStorage.currentUser)
    _id = Date.now()
    data =  {
      name : $('#listTitle').val().trim(),
      user : appConfig.pointer('_User', currentUser.objectId),
      user_company: Parse._user_company,
      count: 0,
      tmp: _id
    }
    console.log(data)

    thiss = this;
    listClassName = (this.props.listClassName) ? this.props.listClassName : 'ProspectList'
    var _this = this;
    $.ajax({
      url:'https://api.parse.com/1/classes/'+listClassName,
      type:'POST',
      headers: appConfig.parseHeaders,
      data: JSON.stringify(data),
      success: function(res) { 
        console.log(res) 
        console.log("should be updating")
        _this.props.updateList(_id, res.objectId)
      },
      error: function(err) { console.log(err) }
    });

    data.count = 0

    this.props.createList(data)
    
    $('#createListModal').modal('hide')
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  },

  createListButtonClick: function() {
    if($('#listTitle').val().trim() != "")
      this.createList()
  },

  createMiningJob: function(e) {
    e.preventDefault()
    console.log('lmao')
    if($('#listTitle').val().trim() != "")
      this.createList()
  },

  render: function() {
    return (
          <div className="modal fade bs-example-modal-sm" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" id="createListModal" style={{top:'200px'}}>
            <div className="modal-dialog modal-sm">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span>
                    <span className="sr-only">Close</span></button>
                  <h4 className="modal-title" id="myModalLabel">
                    <i className="fa fa-list" /> &nbsp;Create List</h4>
                </div>
                <div className="modal-body"> 
                  <form onSubmit={this.createMiningJob}>
                    <input id="listTitle" type="text" placeholder="Enter list title..." className="form-control"/>
                    <br/>
                    <a href="javascript:" onClick={this.createListButtonClick} placeholder="Enter City Area..." className="btn btn-success" style={{display:'block', width:'100%'}}>Create List</a>
                  </form>

                </div>
              </div>
            </div>
          </div>
    );
  }
});

