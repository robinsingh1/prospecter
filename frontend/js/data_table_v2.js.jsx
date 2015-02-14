/** @jsx React.DOM */

//TODO - abstract lists
//TODO - rename this
var SideMenuProspects = require('./side_menu_user_prospects.js.min.js'); 

var UserProspect = require('./user_prospect.js.min.js');
var UserProspectHeader = require('./user_prospect_header.js.min.js');
var SideMenuListOption = require('./user_side_menu_list.js.min.js');
var LoadingSpinner = require('./loading_spinner.js.min.js')
var Spinner = require('./spinner.js.min.js')
var PanelFooting = require('./panel_footing.js.min.js')
var Messenger = require('./messenger.js.min.js')

var DeleteListModal = require('./delete_list_modal.js.min.js')
var RenameListModal = require('./rename_list_modal.js.min.js')
var CreateProspectListFromCompanyListModal = require('./create_prospect_list_from_company_list.js.min.js')
var CreateProspectProfileModal = require('./create_title_mining_job.js.min.js')

module.exports = React.createClass({
  getInitialState: function() {
    return {  prospects   : [],
              currentPage : 1,
              className: 'Prospect',
              listClassName: 'ProspectList',
              pages       : 1,
              currentList : 'All',
              currentListObjectId : '',
              loading: true,
              paginating: false,
              prospectsPerPage: 50,
              downloading: false,
              lists : [],
              masterCheckboxChecked: false,
              keyboardActiveProspect: 0, //first
              //selectedProspects: [],
              totalCount  : "~", 
              count       : "~", }
  },

  createList: function(data) { this.setState({ lists: [data].concat(this.state.lists) }) },

  renameList: function(newListName) {
    thiss = this;
    var filtered = _.filter(this.state.lists, function(item) {
      if(item.name == thiss.state.currentList){
        item.name = newListName
        return item
      }
      return item
    });

    this.setState({lists : filtered, currentList: newListName})

    $('.modal').click()
    $('#newListName').val('')
    $('.modal-backdrop').click()

    Customero.update('ProspectList', {'name':newListName})
  },

  deleteList: function() {
    var filtered = _.filter(this.state.lists, function(item) {
      if(item.objectId == thiss.state.currentListObjectId)
        return false
      return true
    });

    this.setState({lists: filtered, currentList: 'All'})
    this.changeList('All', '')

    appConfig.closeModal()
    $('#newListName').val('')
    Customero.delete('ProspectList/'+this.state.currentListObjectId)
  },

  setPaginate: function(value) { this.setState({paginating: value}) },
  setDownloading: function(value) { this.setState({downloading: value}) },

  changeList: function(newListName, objectId) {
    localStorage.selectedProspects = JSON.stringify([])
    this.setState({
      currentList : newListName,
      currentListObjectId : objectId,
      prospects  : [],    
      count      : '~',
      pages      : 1,
      loading    : true,
      currentPage: 1,
      keyboardActiveProspect: 0
    })

    qry = {include: 'company', limit: this.state.prospectsPerPage}
    if (newListName == 'Archived')
      qry.where = JSON.stringify({lists: Parse._current_user.archive_prospect_list})
    else if(newListName != "All")
      qry.where = JSON.stringify({lists: Parse._pointer('ProspectList', objectId)})

    var _this = this;
    Parse.get('Prospect', qry).done(function(res) {
      console.log(res)
      _this.setState({
        prospects: res.results,
        count: res.count,
        pages: Math.ceil(res.count/_this.props.prospectsPerPage),
        loading: false,
      })
    })
  },

  checkboxAction: function(checkedState, obj) {
    selectedProspects = JSON.parse(localStorage.selectedProspects)
    if(checkedState)
      selectedProspects.push(obj)
    else
      selectedProspects = _.reject(selectedProspects,function(id){return id == obj})

    selectedProspects = _.uniq(selectedProspects)
    console.log(selectedProspects)
    localStorage.selectedProspects = JSON.stringify(selectedProspects)
    //this.setState({selectedProspects: selectedProspects})
  },

  masterCheckboxChanged: function(masterCheckboxValue) {
    this.setState({masterCheckboxChecked: masterCheckboxValue})
  },

  render: function() {
    this.startKeyboardShortcuts()
    $('body').css({overflow:'auto'})

    prospects = []
    for(i=0;i< this.state.prospects.length;i++) {
      url = this.state.prospects[i].url
      prospect = this.state.prospects[i]

      keyboardSelected = (i == this.state.keyboardActiveProspect)

      selectedProspects = JSON.parse(localStorage.selectedProspects)
      alreadyChecked=false
      for(ii=0;ii< selectedProspects.length;ii++)
        if(prospect.objectId == selectedProspects[ii])
          alreadyChecked = true

      //console.log(alreadyChecked)
      prospects.push(
        <UserProspect deleteProspect={this.deleteProspect} 
                      prospect={this.state.prospects[i]} 
                      masterCheckboxChecked={this.state.masterCheckboxChecked}
                      key={this.generate_id()}
                      link={""}
                      keyboardSelected={keyboardSelected}
                      alreadyChecked={alreadyChecked}
                      checkboxAction={this.checkboxAction}
                    />
      )

      $('#prospectDetailButtons').click(function(e) {
        //e.stopPropagation()
        //setTimeout(function(){ $('.dropdown').show() }, 30);
      })
    }

    if(this.state.currentList == "All"){
      listType = {display:'none'}
      listNameStyle = {display:'none'}
      listBtn = {display:'none'}
      listOptions = {display:'none'}
      copyDropdownStyle = {width:114, right:4}
    } else {
      listType = {float:'left'}
      listNameStyle = {float:'left',display:'inline-block', fontWeight: 200, marginTop: 1, paddingRight: 10, marginLeft: -10}
      listBtn = {float:'left',marginLeft:5}
      listOptions = {float:'right'}
      copyDropdownStyle = {width:114, right:36}
    }

    currentList     = this.state.currentList
    paginateOverlay = (this.state.paginating) ? <PaginateOverlay /> : ""
    downloadIcon    = (!this.state.downloading) ? <i className="fa fa-download" /> : <Spinner circleStyle={{backgroundColor:'white',height:4,width:4}} spinnerStyle={{height:13, width:13,margin:0,display:'inline-block',paddingTop:2}}/>
    prospectTableStyle = (this.state.count == 0) ? {display:'none'} :{height:'400px',overflow:'auto'}

    return (
        <div>
      <div className="container prospects-container" >
        <SideMenuProspects currentList={this.state.currentList} 
                           count={this.state.count} 
                           totalCount={this.state.totalCount} 
                           changeList={this.changeList} 
                           createList={this.createList}
                           lists={this.state.lists}/>

      <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10" style={{padding:'0'}}>
              {paginateOverlay}
              <div id="prospectDetailButtons">
                <ListDetailButtons 
                  renameList={this.renameList}
                  deleteList={this.deleteList}
                  currentListName={this.state.currentList}
                  currentList={this.state.currentListObjectId}/>

                <div className="dropdown">
                  <a href="javascript:" 
                     className="btn btn-primary btn-xs list-options" 
                     id=""
                     style={listOptions}>
                    <i className="fa fa-bars" />
                  </a>
                </div>

                <div className="dropdown1 copyList" style={{display:'block'}}>
                  <a data-toggle="dropdown" 
                     id="copyToList"
                     href="javascript:" 
                     className="drop-target btn btn-primary btn-xs list-options">
                     <i className="fa fa-copy" /> &nbsp; Copy To List &nbsp; 
                     <i className="fa fa-caret-down" /></a>
                  <CurrentListsTwo lists={this.state.lists} 
                                   copyDropdownStyle={copyDropdownStyle}
                                   listAction={this.copySelectedProspects} />
                </div>
  
                <div className="dropdown1 moveList">
                  <a data-toggle="dropdown" 
                     href="javascript:"  
                     id="moveToList"
                     style={listOptions} 
                     className="btn btn-primary btn-xs list-options" >
                     <i className="fa fa-share" /> &nbsp; Move To List &nbsp; 
                     <i className="fa fa-caret-down" />
                </a>
                <CurrentLists lists={this.state.lists} 
                              listAction={this.moveSelectedProspects} />
                </div>
                <a onClick={this.downloadFile} 
                   href="javascript:" 
                   id="downloadProspects"
                   className="drop-target btn btn-primary btn-xs list-options">
                   {downloadIcon}
                   &nbsp; Download CSV &nbsp; 
                </a>

                <a href="javascript:" 
                   onClick={this.removeSelectedProspects}
                   id="downloadProspects"
                   className="drop-target btn btn-primary btn-xs list-options">
                   <i className="fa fa-archive" />
                   &nbsp; Archive &nbsp; 
                </a>

                <a href="javascript:" 
                   onClick={this.launchProspectProfileModal}
                   style={{display:'none'}}
                   id="downloadProspects"
                   className="drop-target btn btn-primary btn-xs list-options">
                   <i className="fa fa-cloud-download" />
                   &nbsp; Find Prospects By Title &nbsp; 
                </a>
              </div>
          {(this.state.count == 0) ? <EmptyPeopleProspectsPanel />  : ""}
          <div id="autoscroll" style={prospectTableStyle}>
            <table className="prospects-table table table-striped" 
                style={{marginBottom:'0px'}}>
              <thead style={{backgroundColor:'white'}}>
                <UserProspectHeader 
                    masterCheckboxChanged={this.masterCheckboxChanged}/>
              </thead>
              <tbody>
                {prospects}
              </tbody>
            </table> {(this.state.loading) ? <LoadingSpinner /> : ""}
          </div>
        </div>
      </div>
      <CreateProspectListFromCompanyListModal 
        currentList={this.state.currentList} 
        currentListObjectId={this.state.currentListObjectId}/>
      <CreateProspectProfileModal 
        currentList={this.state.currentList} 
        currentListObjectId={this.state.currentListObjectId}/>
      <PanelFooting currentPage={this.state.currentPage}
                    count={this.state.count}
                    paginate={this.paginate}
                    prospectType={'Prospect'}
                    prospectsPerPage={this.state.prospectsPerPage}
                    setPaginate={this.setPaginate}
                    pages={this.state.pages}/>
      <Messenger />
    </div>
    );
  },

  launchProspectProfileModal: function(){ $('#createProspectProfileModal').modal() },

  paginate: function(newProspects, newPage) {
    this.setState({
      prospects: newProspects,
      currentPage: newPage,
      keyboardActiveProspect: 0
    })
    this.startKeyboardShortcuts()
    document.getElementById('autoscroll').scrollTop = 0
  },

  downloadFile: function() {
    _list = Parse._pointer('ProspectList', this.state.currentListObjectId)
    localStorage.download_total = Math.ceil(this.state.count/1000)
    localStorage.downloads      = 0

    if(this.state.currentList == "All") {
      qry = {
        where : JSON.stringify({ company: appConfig.company }),
        count: 1,
        archived: {$in:[null, false]},
      }
    } else {
      qry = { where: JSON.stringify({ lists: _list }), }
    }

      prospects = prospects.concat(JSON.parse(localStorage.getItem('download_'+ii)))
      console.log(prospects)
      // Output as CSV
      var blob = new Blob([Papa.unparse(prospects)], {type: "text/plain;charset=utf-8"});
      console.log(blob)
      saveAs(blob, "prospects.csv");
      thiss.setState({downloading: false})
  },

  removeSelectedProspects: function() {
    selectedProspects = JSON.parse(localStorage.selectedProspects)
    _list = Parse._pointer('ProspectList', this.state.currentListObjectId)
    body = { lists: { '__op' : 'Remove', "objects" : [_list] } }
    if(this.state.currentList == 'All'){ body = { archived: true } }
    Parse.batchUpdate('Prospect', selectedProspects, body)
    // Update List Counts
  },

  moveSelectedProspects: function(new_list) {
    selectedProspects = JSON.parse(localStorage.selectedProspects)
    old_list = Parse._pointer('ProspectList', this.state.currentListObjectId)
    new_list = Parse._pointer('ProspectList', this.state.currentListObjectId)
    body = { lists: { '__op' : 'Remove', "objects" : [old_list] } }
    Parse.batchUpdate('Prospect', selectedProspects, body)
    body = { lists: { '__op' : 'AddUnique', "objects" : [new_list] } }
    Parse.batchUpdate('Prospect', selectedProspects, body)
    // Update List Counts
  },

  copySelectedProspects: function(new_list) {
    selectedProspects = JSON.parse(localStorage.selectedProspects)
    new_list = Parse._pointer('ProspectList', this.state.currentListObjectId)
    body = { lists: { '__op' : 'AddUnique', "objects" : [new_list] } }
    Parse.batchUpdate('Prospect', selectedProspects, body)
    // Update List Counts
  },

  hideAlert: function() { $('.alert').hide() },
  startKeyboardShortcuts: function() { /*KeyboardShortcuts.initialize()*/ },
  componentDidUpdate: function() { $('.dropdown').show() },

  componentDidMount: function() {
    $('.dropdown').show(); 
    localStorage.selectedProspects = JSON.stringify([]);

    qry = { lists: currentList }
    if(this.state.currentList == 'All'){
      qry = {
        count: true, order: '-createdAt',
        limit: this.state.prospectsPerPage,
        include: 'email_guesses,email_guesses.pattern,company'
      }
      //qry.where = JSON.stringify({ archived: {'$in':[false, null]}, })
    }

    var _this = this;
    Parse.get('Prospect', {count: true,limit:0}).done(function(res) {
      console.log(res)
    })
    Parse.get('Prospect', qry).done(function(res) {
      console.log(res)
      res.prospects = res.results
      res.loading = false; 
      res.pages = Math.ceil(res.count/_this.props.prospectsPerPage);
      res.totalCount = res.count
      _this.setState(res)
    })
    Parse.get('ProspectList', { order: '-createdAt'}).done(function(res) {
      _this.setState({lists: res.results})
    })
  },
  generate_id : function () {
    return '_' + Math.random().toString(36).substr(2,9); 
  },
});

/*  Dropdown Menus */
var CurrentLists = React.createClass({
  listAction: function(e) {
    var listSelect = _.filter(this.props.lists, function(item) {
       return item.name == $(e.target).text()
    });
    this.props.listAction(listSelect[0].objectId)
  },

  render: function() {
    lists = [] 
    for(i=0;i< this.props.lists.length;i++) {
      lists.push(
        <li><a style={{fontWeight:'bold',fontSize:'10px'}} 
            className="dropdown-list-name"
            href="javascript:" 
            onClick={this.listAction}>{this.props.lists[i].name}</a></li>
      )
    }
    //console.log(this.props.copyDropdownStyle)
    return (
      <ul className="dropdown-menu drop-test" id="dropdown" 
          style={{right:158}}>
        {lists}
      </ul>
    );
  }
});

var ListsMenu = React.createClass({
  render: function() {
    return (
      <ul className="dropdown-menu drop-test" id="dropdown" 
          style={{
            minWidth:'inherit',
            top: '20px',
            width: '125px',
            right: '154px',
            left:'auto'
          }}>
        <li><a href="#books">
          <i className="fa fa-times" /> &nbsp;
          Delete List
        </a></li>
        <li><a href="#podcasts"> 
          Rename Lists
        </a></li>
      </ul>
    );
  }
});

var CurrentListsTwo = React.createClass({
  listAction: function(e) {
    listName = $(e.target).text()
    
    var listSelect = _.filter(this.props.lists, function(item) {
       return item.name == listName
    });

    this.props.listAction(listSelect[0].objectId)
  },

  render: function() {
    lists = [] 
    for(i=0;i< this.props.lists.length;i++) {
      lists.push(
        <li><a style={{fontWeight:'bold',fontSize:'10px'}}
               className="dropdown-list-name"
               href="javascript:" 
               onClick={this.listAction}>
          {this.props.lists[i].name}</a></li>
      )
    }
    return (
      <ul className="dropdown-menu drop-test" id="dropdown" 
          style={this.props.copyDropdownStyle}>
        {lists}
      </ul>
    );
  }
});

var ListDetailButtons = React.createClass({
  // Rename List
  getInitialState: function() {
    return {
      editMode: false
    }
  },
  render: function() {
    //console.log(this.props.currentListObjectId)
    if(!this.state.editMode) {
      stuff = <span className="" style={listNameStyle}>
            {(this.props.currentListName == "All") ? '' : <i className="fa fa-bars" style={{fontSize:16, marginTop:-5}}/>}
            {(this.props.currentListName == "All") ? '' : "   " +this.props.currentListName}
              </span>
    } else {
      stuff = <input className="form-control" style={{width: 100, float: 'left', height: 24, marginTop: -1}}/>
    }
    return (

          <div>
            <h4 style={{margin:0}}> {stuff}
              <a href="javascript:" 
                style={listBtn}
                data-toggle="modal"
                id="renameListBtn"
                data-target=".bs-renameList-modal-sm"
                className="btn btn-xs btn-default">
                <i className="fa fa-pencil" />
              </a>
              <a href="javascript:" 
                onClick={this.deleteList}
                style={listBtn}
                className="btn btn-xs btn-default">
                <i className="fa fa-trash-o" />
              </a>
            </h4>

            <RenameListModal renameList={this.props.renameList}/>
            <DeleteListModal deleteList={this.props.deleteList}/>
          </div>
      );
  },

  renameList: function(newListName) { this.props.renameList(newListName) },

  deleteList: function(){
    thiss = this;
    swal({   
      title: "Are you sure?",   
      text: "Your will not be able to recover this prospect list!",   
      type: "warning",   
      showCancelButton: true,   
      confirmButtonColor: "#DD6B55",   
      confirmButtonText: "Yes, delete it!",   
      closeOnConfirm: false }, 
      function(){   swal("Deleted!", "Your prospect list has been deleted.", "success"); 
        console.log('deleted')
        thiss.props.deleteList()
      });
  },

  toggleEdit: function() { this.setState({editMode: !this.state.editMode }) }
});

var PaginateOverlay = React.createClass({
  render: function() {
    return (
        <div id="paginate-overlay" style={{paddingTop:70}}>
          <Spinner circleStyle={{backgroundColor:'white'}}/>
        </div>
    )
  }
})

var EmptyPeopleProspectsPanel = React.createClass({
  openLinkedinWindow: function() {
    window.open('https://www.linkedin.com/vsearch/p?type=people')
  },

  render: function() {
    return (
      <div className="col-md-offset-3 col-md-6" style={{height:400}}>
      <div className="panel panel-default" style={{marginTop:100,height:200}}>
        <div className="panel-body">
          <h1 className="lead" style={{textAlign:'center'}}>Start Prospecting On Linkedin</h1>
          <a href="javascript:" onClick={this.openLinkedinWindow} className="btn btn-primary" style={{backgroundImage: 'linear-gradient(180deg, #0096ff 0%, #005dff 100%) !important',display:'block',marginRight:'auto',marginLeft:'auto',width:200, marginTop:50}}>
            <i className="fa fa-search" /> &nbsp;
            Search for Prospects!</a>
        </div>
      </div>
    </div>
    );
  }
});
