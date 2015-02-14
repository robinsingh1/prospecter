/** @jsx React.DOM */

//TODO - abstract lists
//TODO - rename this
var Lists = require('./side_menu_user_prospects.js.min.js'); 

var UserProspectHeader = require('./user_prospect_header.js.min.js');
var UserProspectRow = require('./user_prospect.js.min.js');

//var CompanyProspectHeader
var CompanyProspectRow = require('./data_row.js.min.js');
var LoadingSpinner = require('./loading_spinner.js.min.js')
var Spinner = require('./spinner.js.min.js')
var Messenger = require('./messenger.js.min.js')
var PanelFooting = require('./panel_footing.js.min.js')

//var CreateProspectListFromCompanyListModal = require('./create_prospect_list_from_company_list.js.min.js')
//var CreateProspectProfileModal = require('./create_title_mining_job.js.min.js')
/*
      <CreateProspectListFromCompanyListModal 
        currentList={this.state.currentList} 
        currentListObjectId={this.state.currentListObjectId}/>
      <CreateProspectProfileModal 
        currentList={this.state.currentList} 
        currentListObjectId={this.state.currentListObjectId}/>
      <RenameListModal renameList={this.props.renameList}/>
      <DeleteListModal deleteList={this.props.deleteList}/>
*/

module.exports = React.createClass({
  getInitialState: function() {
    return {  prospects   : [],
              currentPage : 1,
              className: this.props.className,
              listClassName: this.props.listClassName,
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
              detailMode: false,
              detailCompany: {},
              count       : "~", }
  },

  setPaginate: function(value) { this.setState({paginating: value}) },
  setDownloading: function(value) { this.setState({downloading: value}) },
  removeProspects: function(objArray) {
    _prospects = _.map(this.state.prospects, function(prospect) {
      console.log(objArray.indexOf(prospect.objectId) == -1)
      if(objArray.indexOf(prospect.objectId) == -1){
          return prospect
      }
    })
    this.setState({prospects: _.compact(_prospects)})
  },

  archiveProspects: function(objects) {
    console.log('ARCHIVE')
    objects = (objects) ? objects : []
    selectedProspects = JSON.parse(localStorage.selectedProspects)
    selectedProspects = selectedProspects.concat(objects)
    qry = {'archived':true}
    console.log('starting parse archive')
    Parse.batchUpdate(this.state.className, selectedProspects, qry).done(function(res) {
      console.log(res)
    })
    this.removeProspects(selectedProspects)
    totalCount = this.state.totalCount
    this.setState({totalCount : totalCount - 1})

    selected = _.map(this.state.prospects, function(prospect) {
      if(selectedProspects.indexOf(prospect.objectId) != -1)
        return prospect
    })

    selected = _.compact(selected)
    selected = _.pluck(selected, 'lists')
    selected = _.flatten(selected)
    selected = _.pluck(selected, 'objectId')
    selected = _.compact(selected)

    _.map(selected, function(list_id) {
      decrement = {count: {__op: 'Increment', amount: -1}}
      Parse.put('ProspectList/'+list_id, decrement, function(res) {
        console.log(res)
      })
    })
  },

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

    qry = {include: 'company', limit: this.state.prospectsPerPage, count: true}
    qry.where = {}
    qry.where.archived = {$in:[null, false]}
    if (newListName == 'Archived')
      qry.where.archived = true
    else if(newListName != "All")
      qry.where.lists = Parse._pointer(this.state.listClassName, objectId)
    qry.where = JSON.stringify(qry.where)
    console.log(qry)

    var _this = this;
    Parse.get(this.state.className, qry).done(function(res) {
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

      if(this.state.className == "Prospect") { 
      prospects.push(
        <UserProspectRow deleteProspect={this.deleteProspect} 
                      prospect={this.state.prospects[i]} 
                      masterCheckboxChecked={this.state.masterCheckboxChecked}
                      key={this.generate_id()}
                      link={""}
                      archiveProspects={this.archiveProspects}
                      keyboardSelected={keyboardSelected}
                      alreadyChecked={alreadyChecked}
                      checkboxAction={this.checkboxAction}
                    />
      )
      } else { 
        prospects.push(
          <CompanyProspectRow deleteProspect={this.deleteProspect} 
                            prospect={this.state.prospects[i]} 
                            masterCheckboxChecked={this.state.masterCheckboxChecked}
                            key={this.generate_id()}
                            link={""}
                            keyboardSelected={keyboardSelected}
                            alreadyChecked={alreadyChecked}
                            checkboxAction={this.checkboxAction} />
        )
      }

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

    header = (this.props.className == "Prospect") ? <UserProspectHeader masterCheckboxChanged={this.masterCheckboxChanged}/> : <CompanyProspectHeader masterCheckboxChanged={this.masterCheckboxChanged}/>

    return (
        <div>
      <div className="container prospects-container" >
        <Lists currentList={this.state.currentList} 
               count={this.state.count} 
               listClassName={this.state.listClassName}
               currentListObjectId={this.state.currentListObjectId}
               totalCount={this.state.totalCount} 
               removeProspects={this.removeProspects}
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

                <div className="dropdown1 copyList" style={{display:'inline-block',float:'right'}}>
                  <a data-toggle="dropdown" 
                     id="copyToList"
                     href="javascript:" 
                     className="drop-target btn btn-primary btn-xs list-options">
                     <i className="fa fa-copy" /> &nbsp;Copy To List&nbsp;
                     <i className="fa fa-caret-down" /></a>
                  <CurrentListsTwo lists={this.state.lists} 
                                   copyDropdownStyle={copyDropdownStyle}
                               copySelectedProspects={this.copySelectedProspects} />
                </div>
  
                <div className="dropdown1 moveList" style={{display:'inline-block',float:'right'}}>
                  <a data-toggle="dropdown" 
                     href="javascript:"  
                     id="moveToList"
                     className="btn btn-primary btn-xs list-options" >
                     <i className="fa fa-share" /> &nbsp;Move To List&nbsp;
                     <i className="fa fa-caret-down" /></a>
                <CurrentLists lists={this.state.lists} 
                              moveSelectedProspects={this.moveSelectedProspects} />
                </div>

                <a onClick={this.downloadFile} 
                   href="javascript:" 
                   id="downloadProspects"
                   className="drop-target btn btn-primary btn-xs list-options">
                   {downloadIcon}
                   &nbsp; Download CSV &nbsp; 
                </a>

                <a href="javascript:" 
                   onClick={this.archiveProspects}
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
          {(this.state.count == 0) ? <EmptyPeopleProspectsPanel className={this.props.className}/>  : ""}
          <div id="autoscroll" style={prospectTableStyle}>
            <table className="prospects-table table table-striped" 
                style={{marginBottom:'0px'}}>
              <thead style={{backgroundColor:'white'}}>
                {header}
              </thead>
              <tbody>
                {prospects}
              </tbody>
            </table> {(this.state.loading) ? <LoadingSpinner /> : ""}
          </div>
        </div>
      </div>
      <PanelFooting currentPage={this.state.currentPage}
                    count={this.state.count}
                    totalCount={this.state.totalCount}
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

  _make_email: function(name, pattern) {
    name = name.trim()
    vars = {
      first_name: _.first(name.split(' ')),
      last_name: _.last(name.split(' ')),
      first_initial: _.first(name.split(' '))[0],
      last_initial: _.last(name.split(' '))[0],
      domain: prospect.company.domain
    }
    pattern = (pattern[0]) ? pattern[0].pattern : ""
    prospect_email = Mustache.render(pattern, vars).toLowerCase()
    //console.debug('PROSPECT EMAIL')
    //console.debug(prospect_email)
    return prospect_email
  },

  downloadFile: function() {
    if(this.state.className == "Prospect")
      this.downloadProspects()
    else
      this.downloadCompanies()
  },

  downloadCompanies: function() {
    console.log('download file')
    _list = Parse._pointer('CompanyProspectList', this.state.currentListObjectId)

    var _this = this;
    results = _.map([0,1,2,3,4,5,6,7,8,9], function(num) {
      qry = { count: 1, archived: {$in:[null, false]}, limit: 1000, skip: num*1000}
      qry.include = 'company,company.email_guess'
      if(_this.state.currentList != "All")
        qry.where = JSON.stringify({lists: _list})
      return Parse.get(_this.state.className, qry)
    })

    $.when.apply(this, results).then(function (res) {
      prospects = _.flatten(_.map(arguments, function(arg) { return arg[0].results}))
      prospects = _.map(prospects, function(prospect) {
        // TODO - add email
        if(prospect.company) {
          company = prospect.company
          delete company.name
          _keys = _.keys(prospect).concat(_.keys(company))
          _values = _.values(prospect).concat(_.values(company))
          obj = _.object(_keys, _values)
          obj.address = obj.normalizedLocation

          console.log(obj)
          delete obj.company; delete obj.createdAt; delete obj.updatedAt; delete obj.objectId;
          delete obj.lists; delete obj.loading; delete obj.user; delete obj.user_company;
          delete obj.api_key; delete obj.className;
          return obj;
        } else {
          //console.log(prospect)
          return prospect
        }
      })
      prospects = [Papa.unparse(prospects)]
      var blob = new Blob(prospects, {type: "text/plain;charset=utf-8"});
      console.log(blob)
      saveAs(blob, _this.state.className+".csv");
      _this.setState({downloading: false})
    })
  },

  downloadProspects: function() {
    console.log('download file')
    _list = Parse._pointer('ProspectList', this.state.currentListObjectId)

    var _this = this;
    results = _.map([0,1,2,3,4,5,6,7,8,9], function(num) {
      qry = { count: 1, archived: {$in:[null, false]}, limit: 1000, skip: num*1000}
      qry.include = 'company,company.email_guess'
      if(_this.state.currentList != "All")
        qry.where = JSON.stringify({lists: _list})
      return Parse.get(_this.state.className, qry)
    })

    $.when.apply(this, results).then(function (res) {
      prospects = _.flatten(_.map(arguments, function(arg) { return arg[0].results}))
      prospects = _.map(prospects, function(prospect) {
        // TODO - add email
        if(prospect.company) {
          company = prospect.company
          delete company.name
          _keys = _.keys(prospect).concat(_.keys(company))
          _values = _.values(prospect).concat(_.values(company))
          obj = _.object(_keys, _values)
          obj.address = obj.normalizedLocation
          if(obj.email_pattern && !_.isEqual(obj.email_pattern, []))
            obj.email = _this._make_email(prospect.name, prospect.company.email_pattern)
          else
            obj.email = ""

          console.log(obj)
          delete obj.company; delete obj.createdAt; delete obj.updatedAt; delete obj.objectId;
          delete obj.lists; delete obj.loading; delete obj.user; delete obj.user_company;
          delete obj.api_key; delete obj.className;
          return obj;
        } else {
          //console.log(prospect)
          return prospect
        }
      })
      prospects = [Papa.unparse(prospects)]
      var blob = new Blob(prospects, {type: "text/plain;charset=utf-8"});
      console.log(blob)
      saveAs(blob, _this.state.className+".csv");
      _this.setState({downloading: false})
    })
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
      qry.where = JSON.stringify({ archived: {'$in':[false, null]}, })
    }

    var _this = this;
    Parse.get(_this.state.className, {count: true,limit:0}).done(function(res) {
      console.log(res)
    })
    Parse.get(_this.state.className, qry).done(function(res) {
      console.log(res)
      res.prospects = res.results
      res.loading = false; 
      res.pages = Math.ceil(res.count/_this.props.prospectsPerPage);
      res.totalCount = res.count
      _this.setState(res)
    })

    Parse.get(this.props.listClassName, { order: '-createdAt'}).done(function(res) {
      _this.setState({lists: res.results})
    })
  },

  generate_id : function () {
    return '_' + Math.random().toString(36).substr(2,9); 
  },
});

/*  Dropdown Menus */
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
                style={{display:'none'}}
                className="btn btn-xs btn-default">
                <i className="fa fa-pencil" />
              </a>
              <a href="javascript:" 
                onClick={this.deleteList}
                style={listBtn}
                style={{display:'none'}}
                className="btn btn-xs btn-default">
                <i className="fa fa-trash-o" />
              </a>
            </h4>

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
    if(this.props.className == "Prospect")
      window.open('https://www.linkedin.com/vsearch/p?type=people')
    else
      window.open('https://www.linkedin.com/vsearch/c')
  },

  render: function() {

    name = (this.props.className == "Prospect") ? "Prospects" : "Companies"
    return (
      <div className="col-md-offset-3 col-md-6" style={{height:400}}>
      <div className="panel panel-default" style={{marginTop:100,height:200}}>
        <div className="panel-body">
          <h1 className="lead" style={{textAlign:'center'}}>Start Prospecting On Linkedin</h1>
          <a href="javascript:" onClick={this.openLinkedinWindow} className="btn btn-primary" style={{backgroundImage: 'linear-gradient(180deg, #0096ff 0%, #005dff 100%) !important',display:'block',marginRight:'auto',marginLeft:'auto',width:200, marginTop:50}}>
            <i className="fa fa-search" /> &nbsp;
            {"Search for "+name+"!"}</a>
        </div>
      </div>
    </div>
    );
  }
});

var CompanyProspectHeader = React.createClass({
  render: function() {
    return (
      <tr>
        <th></th>
        <th></th>
        <th style={{width:400}}>Name</th>
        <th style={{width:500}}>Industry</th>
        <th style={{width:137,display:'none'}}># of Prospects</th>
        <th >&nbsp; </th>
        <th style={{display:'none'}}>Signals</th>
        <th style={{width:100}}>Added</th>
        <th>&nbsp;</th>
        <th>&nbsp;</th>
      </tr>
    );
  }
});

var CurrentLists = React.createClass({
  listAction: function(e) {
    var listSelect = _.filter(this.props.lists, function(item) {
       return item.name == $(e.target).text()
    });

    this.props.moveSelectedProspects(listSelect[0].objectId)
  },

  componentDidMount: function() {
    //$(this.getDOMNode().data()
  },

  render: function() {
    lists = [] 
    for(i=0;i< this.props.lists.length;i++) {
      console.log(this.props.lists[i].objectId)
      lists.push(
        <li><a style={{fontWeight:'bold',fontSize:'10px'}} 
            className="dropdown-move-list-name dropdown-list-name"
            href="javascript:" 
            data-move-objectId={"this.props.lists[i].objectId"}>
           {this.props.lists[i].name}</a></li>
      )
    }
    //console.log(this.props.copyDropdownStyle)
    return (
      <ul className="dropdown-menu drop-test" id="dropdown" 
          style={{right:123,top:27}}>
        {lists}
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

    this.props.copySelectedProspects(listSelect[0].objectId)
  },

  render: function() {
    lists = [] 
    for(i=0;i< this.props.lists.length;i++) {
      lists.push(
        <li><a style={{fontWeight:'bold',fontSize:'10px'}}
               className="dropdown-copy-list-name dropdown-list-name"
               href="javascript:" 
               data-objectId={this.props.lists[i].objectId}>
               
          {this.props.lists[i].name}</a></li>
      )
    }
    return (
      <ul className="dropdown-menu drop-test" id="dropdown" 
          style={{width:114,right:6,top:27}}>
        {lists}
      </ul>
    );
  }
});
