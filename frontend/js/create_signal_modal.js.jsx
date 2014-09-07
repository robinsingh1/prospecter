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

  deleteList: function() {
    this.props.deleteList()
  },

  render: function() {
    return (
          <div className="modal fade bs-createSignal-modal-md" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" id="createListModal" style={{top:'100px',overflow:'hidden'}}>
            <div className="modal-dialog modal-sm">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title" id="myModalLabel">
                    <i className="fa fa-wifi" /> &nbsp;Create Signal
                  </h4>
                </div>
                <div className="modal-body"> 
                  <form className="createSignal" onSubmit={this.createSignal}>
                    <span> <i className="fa fa-suitcase"/> &nbsp;
                      <input type="text" style={{display:'inline-block',width:'90%'}} 
                            className="form-control" placeholder="Find Companies Hiring For ..."/>
                    </span>
                    <br/> <br/>
                    <span> <i className="fa fa-users"/> &nbsp;
                      <input type="text" style={{display:'inline-block',width:'90%'}} 
                            className="form-control" placeholder="Number of Employees ..."/>
                    </span>
                    <br/> <br/>
                    <span> <i className="fa fa-institution"/> &nbsp;
                      <input type="text" style={{display:'inline-block',width:'90%'}} 
                            className="form-control" placeholder="Amount of Funding ..."/>
                    </span>
                    <br/> <br/>
                    <span> <i className="fa fa-money"/> &nbsp;
                      <input type="text" style={{display:'inline-block',width:'90%'}} 
                            className="form-control" placeholder="Revenue Amount ..."/>
                    </span>
                    <br/> <br/>
                    <span> <i className="fa fa-wrench"/> &nbsp;
                      <input type="text" style={{display:'inline-block',width:'90%'}} 
                            className="form-control" placeholder="Using Technologies Such As..."/>
                    </span>
                    <br/> <br/>
                    <a href="javascript:" 
                      onClick={this.createSignal} 
                      className="btn btn-default btn-success" 
                      style={{display:'block', width:'100%'}}>
                      Create Signal
                    </a>
                  </form>

                </div>
              </div>
            </div>
          </div>
    );
  }
});

