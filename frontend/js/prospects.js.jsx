/** @jsx React.DOM */

var UserProspect = require('./user_prospect.js.min.js');
var UserProspectHeader = require('./user_prospect_header.js.min.js');
var SideMenuProspects = require('./side_menu_user_prospects.js.min.js');
var SideMenuListOption = require('./user_side_menu_list.js.min.js');
var LoadingSpinner = require('./loading_spinner.js.min.js')
var PanelFooting = require('./panel_footing.js.min.js')
var Messenger = require('./messenger.js.min.js')
var DeleteListModal = require('./delete_list_modal.js.min.js')
var RenameListModal = require('./rename_list_modal.js.min.js')

module.exports = React.createClass({
  getInitialState: function() {
    return {  prospects   : [],
              currentPage : 1,
              pages       : 1,
              currentList : 'All',
              currentListObjectId : '',
              loading: true,
              prospectsPerPage: 50,
              lists : [],
              masterCheckboxChecked: false,
              keyboardActiveProspect: 0, //first
              selectedProspects: [],
              totalCount  : "~", 
              count       : "~", }
  },

  createList: function(data) {
    lists = this.state.lists
    lists.push(data)
    this.setState({ lists: lists })
  },

  changeList: function(newListName,objectId) {
    // add overlay loading
    //console.log(newListName)
    //console.log(objectId)

    localStorage.selectedProspects = JSON.stringify([])

    this.setState({currentList : newListName})
    this.setState({currentListObjectId : objectId})
    this.setState({prospects  : []    })
    this.setState({count      : '~'   })
    this.setState({pages      : 1     })
    this.setState({loading    : true  })
    this.setState({currentPage: 1})
    this.setState({keyboardActiveProspect: 0})

    qry = 'where={"company":'+company+',"archived":true}&count=1&order=-createdAt'
    console.log(newListName)

    if(this.state.currentList != 'All' || typeof(objectId) != "undefined" && newListName != 'Archived'){
      currentList = JSON.stringify({
        'objectId'  : objectId, 
        '__type'    : 'Pointer', 
        'className' : 'ProspectList' 
      })

      company = JSON.stringify(JSON.parse(localStorage.currentUser).company)
      qry = 'where={"company":'+company+'}&count=1'
      qry = 'where={"lists":'+currentList+'}&count=1&order=-createdAt'
    } else if (newListName == 'Archived') {
      qry = 'where={"company":'+company+',"archived":false}&count=1&order=-createdAt'
    }
    console.log(qry)

    $.ajax({
      url: 'https://api.parse.com/1/classes/Prospects',
      type:'GET',
      headers: parse_headers,
      async: true,
      data: qry,
      ajaxStart: function() {
        console.log('started list')
      },
      success: function(res){
        thisss.setState({prospects: res.results})
        thisss.setState({count: res.count})
        //thisss.setState({totalCount: res.count})
        thisss.setState({pages: Math.ceil(res.count/thisss.props.prospectsPerPage)})
        thisss.setState({loading: false})
      },
      error: function(res){
        //console.log('error')
        //console.log(res)
      }
    })
  },

  checkboxAction: function(checkedState, objId) {
    /* Storing Checked Prospects In LocalStorage To Make it Easier To
     * Copy and Move Prospects 
     *
     * Move To User_Prospects?
     */
    
    selectedProspects = JSON.parse(localStorage.selectedProspects)
    //console.log(checkedState)
    if(checkedState)
      selectedProspects.push(objId)
    else
      selectedProspects = _.reject(selectedProspects, 
                                   function(id){return id == objId})

    console.log(selectedProspects)
    localStorage.selectedProspects = JSON.stringify(selectedProspects)
    this.setState({selectedProspects: selectedProspects})
  },

  masterCheckboxChanged: function(masterCheckboxValue) {
    this.setState({masterCheckboxChecked: masterCheckboxValue})
  },

  render: function() {
    this.startKeyboardShortcuts()
    $('body').css({overflow:'auto'})

    prospects = []
    for(i=0;i<this.state.prospects.length;i++) {
      url = this.state.prospects[i].url
      prospect = this.state.prospects[i]

      if(url != "no linkedin website" && typeof(url) != "undefined" && url != ""){
        url = url.replace('http://','')
        the_link = <a href={'http://'+url}><i className="fa fa-globe"/></a>
      } else {
        the_link = ""
      }

      profile = this.state.prospects[i].linkedin_url.replace('http://','')
      profile = this.state.prospects[i].linkedin_url.replace('https://','')
      li = <a href={'http://'+profile} className="linkedin_link"><i className="fa fa-linkedin-square" /></a>

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
                      link={the_link} 
                      keyboardSelected={keyboardSelected}
                      checkboxAction={this.checkboxAction}
                      alreadyChecked={alreadyChecked}
                      li={li} />)
    }

    listType = (this.state.currentList == "All") ? {display:'none'} : {float:'left'}
    listBtn = (this.state.currentList == "All") ? {display:'none'} : {float:'left',marginLeft:5}
    listOptions = (this.state.currentList == "All") ? {display:'none'} : {float:'right'}
    copyDropdownStyle = (this.state.currentList == "All") ? {width:114, right:4} : {width:114, right:36}
    currentList = this.state.currentList
    return (
        <div>
      <div className="container" style={{width:'100%',padding:'0', background: 'linear-gradient(#dae8ff,#dae8ff)', backgroundImage: 'radial-gradient(circle at center center,#fff,#dff1fd 900px)'}}>
        <SideMenuProspects currentList={this.state.currentList} 
                           count={this.state.count} 
                           totalCount={this.state.totalCount} 
                           changeList={this.changeList} 
                           createList={this.createList}
                           lists={this.state.lists}/>

        <div className="col-md-10" style={{padding:'0'}}>
              <div id="prospectDetailButtons">
                <ListDetailButtons 
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

                <div className="dropdown">
                  <a data-toggle="dropdown" 
                     id="copyToList"
                     href="javascript:" 
                     className="drop-target btn btn-primary btn-xs list-options">
                     <i className="fa fa-copy" /> 
                       &nbsp; Copy To List &nbsp; 
                     <i className="fa fa-caret-down" />
                </a>
                <CurrentListsTwo lists={this.state.lists} 
                                 copyDropdownStyle={copyDropdownStyle}
                                 listAction={this.copySelectedProspects} />
                </div>
  
                <div className="dropdown">
                  <a data-toggle="dropdown" 
                     href="javascript:"  
                     id="moveToList"
                     style={listOptions} 
                     className="btn btn-primary btn-xs list-options" >
                     <i className="fa fa-share" /> 
                     &nbsp; Move To List &nbsp; 
                     <i className="fa fa-caret-down" />
                </a>
                <CurrentLists lists={this.state.lists} 
                              listAction={this.moveSelectedProspects} />
                </div>

                <a onClick={this.downloadFile} 
                   href="javascript:" 
                   id="downloadProspects"
                   className="drop-target btn btn-primary btn-xs list-options">
                  <i className="fa fa-download" /> &nbsp; Download CSV &nbsp; 
                </a>
              </div>
        

          <div id="autoscroll" style={{height:'400px',overflow:'auto'}}>
            <table className="prospects-table table table-striped" style={{marginBottom:'0px'}}>
              <thead style={{backgroundColor:'white'}}>
                <UserProspectHeader masterCheckboxChanged={this.masterCheckboxChanged}/>
              </thead>
              <tbody>
                {prospects}
              </tbody>
            </table>
            {(this.state.loading) ? <LoadingSpinner /> : ""}
          </div>
        </div>
      </div>

      <PanelFooting currentPage={this.state.currentPage}
                    count={this.state.count}
                    paginate={this.paginate}
                    prospectsPerPage={this.state.prospectsPerPage}
                    pages={this.state.pages}/>
      <Messenger />
    </div>
    );
  },

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
    parse_headers = {
      'X-Parse-Application-Id'  : 'N85QOkteEEQkuZVJKAvt8MVes0sjG6qNpEGqQFVJ', 
      'X-Parse-REST-API-Key'    : 'VN6EwVyBZwO1uphsBPsau8t7JQRp00UM3KYsiiQb',
    }

    // Get List Count
    list = JSON.stringify({
      '__type'   :  'Pointer',
      'className':  'ProspectList',
      'objectId' :  this.state.currentListObjectId
    })
    console.log(list)
    // Add Support For More than 1000
    // num_of_requests
    localStorage.download_total = Math.ceil(this.state.count/1000)
        this.props.paginate(res.results, this.props.currentPage + 1)
    localStorage.downloads      = 0

    if(this.state.currentList == "All")
      qry = 'where={"company":'+company+'}&count=1'
    else
      qry = 'where={"lists":'+list+'}&count=1'

    for(i=0;i< Math.ceil(this.state.count/1000); i++){
      $.ajax({
        url: 'https://api.parse.com/1/classes/Prospects?limit=1000&skip='+i,
        type:'GET',
        headers: parse_headers,
        downloadFile: 'download_'+i,
        data: qry,
        success: function(res){
          // Clean Results
          // Remove Certain Parse Columns - created_at, updated_at, objectId
          // Rename createdAt as date prospected
          for(i=0;i< res.results.length;i++) {
            delete res.results[i].company
            delete res.results[i].pos
            delete res.results[i].user
            delete res.results[i].objectId
            delete res.results[i].createdAt
            delete res.results[i].updatedAt
          }

          // Add Results To LocalStorage
          localStorage.downloads = JSON.parse(localStorage.downloads) + 1 
          localStorage.setItem(this.downloadFile, JSON.stringify(res.results))

          // Check to see if all ajax reqs in for loop are complete
          if(localStorage.downloads == localStorage.download_total) {
            console.log('matched')
            // Merge all localStorage results
            prospects = []
            for(ii=0;ii < JSON.parse(localStorage.download_total); ii++){
              prospects = prospects.concat(JSON.parse(localStorage.getItem('download_'+ii)))
              console.log(prospects)
            }

            console.log(prospects)
            // Output as CSV
            var blob = new Blob([Papa.unparse(prospects)], {type: "text/plain;charset=utf-8"});
            console.log(blob)
            saveAs(blob, "prospects.csv");
          }
      },

      error: function(res){
        console.log(res)
      }
      });
    }
    
    company = JSON.stringify(JSON.parse(localStorage.currentUser).company)
    

  },

  removeSelectedProspects: function() {
    // If List Type is All Archive the prospect
    //
    parseHeaders = {
      'X-Parse-Application-Id'  : 'N85QOkteEEQkuZVJKAvt8MVes0sjG6qNpEGqQFVJ', 
      'X-Parse-REST-API-Key'    : 'VN6EwVyBZwO1uphsBPsau8t7JQRp00UM3KYsiiQb',
      "Content-Type" : "application/json"
    }

    selectedProspects = JSON.parse(localStorage.selectedProspects)
    batchData = []

    for(i=0;i< selectedProspects.length;i++){
      if(this.state.currentList != 'All'){
        tmp = {
          method:'PUT',
          path:'/1/classes/Prospects/'+selectedProspects[i],
          body: {
            lists: {
              '__op'    : 'Remove',
              "objects" : [{ 
                  '__type':'Pointer',
                  'className':'ProspectList',
                  'objectId':this.state.currentListObjectId
              }]
            }
          }
        }
      }else{
        tmp = {
          method:'PUT',
          path:'/1/classes/Prospects/'+selectedProspects[i],
          body: {
            archived:false,
          }
        }
      }
      batchData.push(tmp)
    }

    thiss = this;
    $.ajax({
      url:'https://api.parse.com/1/batch',
      type:'POST',
      headers:parseHeaders,
      data: JSON.stringify({requests: batchData}),
      success:function(res) {
        console.log(res)
        lists = thiss.state.lists

        for(i=0;i< lists.length; i++) { 
          // Subtract From Old List - Not Working For Archive
          if(lists[i].objectId == thiss.state.currentListObjectId)
            lists[i].count = parseInt(lists[i].count) - parseInt(selectedProspects.length)
        }
        // Update local list count
        thiss.setState({lists: lists})

        // remove from current list ui
        selectedProspects = JSON.parse(localStorage.selectedProspects)
        console.log('remove selected prospects')
        console.log(selectedProspects)
        console.log(thiss.state.prospects)
        var filtered = _.filter(thiss.state.prospects, function(item) {
          for(i=0;i< selectedProspects.length;i++) 
            if(item.objectId == selectedProspects[i])
              return false
          return true
        });
        console.log(filtered)
        thiss.setState({prospects: filtered})
        localStorage.selectedProspects = JSON.stringify([])

        // add alert to inform user
      },
      error: function(err) {
        console.log(err)
      }
    });
  },

  moveSelectedProspects: function(listObjectId) {
    parseHeaders = {
      'X-Parse-Application-Id'  : 'N85QOkteEEQkuZVJKAvt8MVes0sjG6qNpEGqQFVJ', 
      'X-Parse-REST-API-Key'    : 'VN6EwVyBZwO1uphsBPsau8t7JQRp00UM3KYsiiQb',
      "Content-Type" : "application/json"
    }

    // get the selected objectId from selectedProspects state
    selectedProspects = JSON.parse(localStorage.selectedProspects)
    batchData = []


    // Batch Update Parse
    // - Remove All Selected Prospects From Current List
    for(i=0;i< selectedProspects.length;i++){
      tmp = {
        method:'PUT',
        path:'/1/classes/Prospects/'+selectedProspects[i],
        body: {
          lists: {
            '__op'    : 'Remove',
            "objects" : [{ 
                '__type':'Pointer',
                'className':'ProspectList',
                'objectId':this.state.currentListObjectId
            }]
          }
        }
      }
      batchData.push(tmp)
    }
    
    // - Add Other List 
    for(i=0;i< selectedProspects.length;i++){
      tmp = {
        method:'PUT',
        path:'/1/classes/Prospects/'+selectedProspects[i],
        body: {
          lists: {
            '__op'    : 'AddUnique',
            "objects" : [{ 
                '__type':'Pointer',
                'className':'ProspectList',
                'objectId':listObjectId
            }]
          }
        }
      }
      batchData.push(tmp)
    }

    thiss = this;
    $.ajax({
      url:'https://api.parse.com/1/batch',
      type:'POST',
      headers:parseHeaders,
      data: JSON.stringify({requests: batchData}),
      success:function(res) {
        console.log(res)
        lists = thiss.state.lists

        for(i=0;i< lists.length; i++) { 
          // Add To New List
          if(lists[i].objectId == listObjectId)
            lists[i].count = parseInt(lists[i].count) + parseInt(selectedProspects.length)
          // Subtract From Old List
          if(lists[i].objectId == thiss.state.currentListObjectId)
            lists[i].count = parseInt(lists[i].count) - parseInt(selectedProspects.length)
        }
        // Update local list count
        thiss.setState({lists: lists})

        // remove from current list ui
        console.log('selectedProspects')
        console.log(thiss.state.prospects)
        var filtered = _.filter(thiss.state.prospects, function(item) {
          is_selected = true
          for(i=0;i< selectedProspects.length;i++) 
            if(item.objectId == selectedProspects[i])
              is_selected = false
          return is_selected
        });
        console.log(filtered)
        thiss.setState({prospects: filtered})
        localStorage.selectedProspects = JSON.stringify([])

        // add alert to inform user
      },
      error: function(err) {
        console.log(err)
      }
    });
  },

  copySelectedProspects: function(listObjectId) {
    console.log(listObjectId)
    
    // make batch ajax request to parse
    parseHeaders = {
      'X-Parse-Application-Id'  : 'N85QOkteEEQkuZVJKAvt8MVes0sjG6qNpEGqQFVJ', 
      'X-Parse-REST-API-Key'    : 'VN6EwVyBZwO1uphsBPsau8t7JQRp00UM3KYsiiQb',
      "Content-Type" : "application/json"
    }

    // Add Loading Sign To List

    selectedProspects = JSON.parse(localStorage.selectedProspects)
    batchData = []
    for(i=0;i< selectedProspects.length;i++){
      tmp = {
        method:'PUT',
        path:'/1/classes/Prospects/'+selectedProspects[i],
        body: {
          lists: {
            '__op'    : 'AddUnique',
            "objects" : [{ 
                '__type':'Pointer',
                'className':'ProspectList',
                'objectId':listObjectId
            }]
          }
        }
      }
      batchData.push(tmp)
    }

    thiss = this;
    $.ajax({
      url:'https://api.parse.com/1/batch',
      type:'POST',
      headers:parseHeaders,
      data: JSON.stringify({requests: batchData}),
      success:function(res) {
        console.log(res)
        // Update With the number of successes
        // Update local list count
        lists = thiss.state.lists
        for(i=0;i< lists.length; i++) { 
          if(lists[i].objectId == listObjectId)
            lists[i].count = parseInt(lists[i].count) + parseInt(res.length)
        }
        thiss.setState({lists: lists})
        localStorage.selectedProspects = "[]"
        thiss.setState({selectedProspects : [] })
        
        // add alert to inform user
        // Unselect all selected
      },
      error: function(err) {
        console.log(err)
      }
    });

  },

  hideAlert: function() {
    $('.alert').hide()
  },

  adjustHeight: function(whichOne) {
    prospectWindowTop = $('#prospectDetailButtons').position().top
    prospectWindowTop = prospectWindowTop + $('#prospectDetailButtons').height()
    prospectWindowBottom = $('#autoscroll').position().top + $('#autoscroll').height()

    if(whichOne == 'j')
      activeProspect = this.state.keyboardActiveProspect +1 
    else
      activeProspect = this.state.keyboardActiveProspect -1 

    activeTop = $($('.prospects-tr')[activeProspect]).position().top
    selectedHeight = $($('.prospects-tr')[activeProspect]).height()
    activeBottom = $($('.prospects-tr')[activeProspect]).position().top+selectedHeight

    console.log(prospectWindowTop, prospectWindowBottom)
    console.log(activeTop, activeBottom)

    scrollTop = document.getElementById('autoscroll').scrollTop
    if(activeBottom > prospectWindowBottom)
      document.getElementById('autoscroll').scrollTop = scrollTop + activeBottom - prospectWindowBottom

    if(activeTop < 0)
      document.getElementById('autoscroll').scrollTop = scrollTop + activeTop - 37
    else if(activeTop == $($('.prospects-tr')[0]).position().top)
      document.getElementById('autoscroll').scrollTop = 0
      
    // Get Postion of Top
    // Get Position of Bottom 
    // Get Position of Current Selected
    // Adjust by scrolling down or up
  },

  startKeyboardShortcuts: function() {
    /* Keyboard Shortcuts */
    Mousetrap.reset()
    thiss = this;

    /* Prospect Table Shortcuts */
    Mousetrap.bind('j', function() { 
      keyboard = thiss.state.keyboardActiveProspect
      if(keyboard != thiss.state.prospectsPerPage+1)
        thiss.adjustHeight('j')
        thiss.setState({keyboardActiveProspect: keyboard+1})
    });

    Mousetrap.bind('k', function() { 
      keyboard = thiss.state.keyboardActiveProspect
      if(keyboard != 1)
        thiss.adjustHeight('k')
        thiss.setState({keyboardActiveProspect: keyboard-1})
    });

    Mousetrap.bind('l', function() { 

    });

    Mousetrap.bind('l', function() { 

    });

    Mousetrap.bind('o', function() { 
      console.log('open current prospect')
      console.log($($('.keySelect').find('a.linkedin_link')[0]).attr('href'))
      link = $($('.keySelect').find('a.linkedin_link')[0]).attr('href')
      /*
      window.open(link, '_blank')
      console.log('new')
      */
      //popupWindow.blur();
      //window.focus();
      // keyboard = thiss.state.keyboardActiveProspect
      
      var a = document.createElement("a");
      a.href = link
      var evt = document.createEvent("MouseEvents");
      //the tenth parameter of initMouseEvent sets ctrl key
      // For Mac This Works Check For - Windows
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0,
                                  false, false, false, true, 0, null);
      a.dispatchEvent(evt);
    });



    /* Prospect Window Shortcuts */
    Mousetrap.bind('ctrl+r', function(){
      console.log('reload')
      $('#renameListBtn').click()
    })

    Mousetrap.bind('ctrl+d', function(){
      console.log('reload')
      $('#deleteListModal').click()
    })

    Mousetrap.bind('ctrl+s', function(){
      console.log('reload')
      //$('#downloadProspects').click()
      thiss.downloadFile()
    })

    Mousetrap.bind('e', function(){
      console.log('reload')
      //$('#downloadProspects').click()
      thiss.removeSelectedProspects()
    })

    Mousetrap.bind('c', function() { 
      console.log('copy')
      $('#copyToList').click()
    });

    Mousetrap.bind('m', function() { 
      console.log('copy')
      $('#moveToList').click()
    });

    //Mousetrap.bind('e', function() { console.log('e'); });
    Mousetrap.bind('right', function() { console.log('right'); });
    Mousetrap.bind('left', function() { console.log('left'); });

  },

  componentDidMount: function() {
    /* OnLoad For The First Time Function */
    localStorage.selectedProspects = JSON.stringify([])
    thisss = this;

    //this.startKeyboardShortcuts()

    parse_headers = {
      'X-Parse-Application-Id'  : 'N85QOkteEEQkuZVJKAvt8MVes0sjG6qNpEGqQFVJ', 
      'X-Parse-REST-API-Key'    : 'VN6EwVyBZwO1uphsBPsau8t7JQRp00UM3KYsiiQb'
    }

    company = JSON.stringify(JSON.parse(localStorage.currentUser).company)
    cuid = JSON.parse(localStorage.currentUser).objectId
    user = JSON.stringify({'__type':'Pointer',
                           'objectId':cuid, 
                           'className': 'User'})
    archiveList = JSON.stringify({
      //hardCode
      'objectId':'SerPQjckve',
      '__type':'Pointer', 
      'className' : 'ProspectList' 
    })

    qry = 'where={"company":'+company+',"archived":true}&count=1&order=-createdAt'

    if(this.state.currentList != 'All'){
      currentList = {
        'objectId':this.state.currentListObjectId, 
        '__type':'Pointer', 
        'className' : 'ProspectList' 
      }
      currentList = JSON.stringify(currentList)
      user = JSON.stringify({'__type':'Pointer','objectId':'xThAXc0LZT',
                             'className':'User'})

      // add company to prospects added through mining job
      qry = 'where={"company":'+company+',"lists":'+currentList+'}&count=1'
    }

    $.ajax({
      //url: 'https://api.parse.com/1/classes/Prospects?limit=50',
      url: 'https://api.parse.com/1/classes/Prospects?limit='+thisss.state.prospectsPerPage,
      type:'GET',
      headers: parse_headers,
      cache: true,
      data: qry,
      success: function(res){
        console.log(res)
        thisss.setState({prospects: res.results})
        thisss.setState({count: res.count})
        thisss.setState({totalCount: res.count})
        thisss.setState({pages: Math.ceil(res.count/thisss.props.prospectsPerPage)})
        thisss.setState({loading: false})
      },
      error: function(res){
        console.log('error')
        console.log(res)
      }
    })

    parse_headers = {
      'X-Parse-Application-Id'  : 'N85QOkteEEQkuZVJKAvt8MVes0sjG6qNpEGqQFVJ', 
      'X-Parse-REST-API-Key'    : 'VN6EwVyBZwO1uphsBPsau8t7JQRp00UM3KYsiiQb',
    }

    currentUser = { 
      '__type'   : 'Pointer',
      'className': '_User',
      'objectId' : JSON.parse(localStorage.currentUser).objectId
    }

    thiss = this;
    $.ajax({
      url: 'https://api.parse.com/1/classes/ProspectList',
      type: 'GET',
      headers: parse_headers,
      data: 'where={"user":'+JSON.stringify(currentUser)+"}&count=1",
      success: function(res) {
        console.log(res)
        results = res.results
        for(i=0;i< results.length; i++) {
          results.count = '~'
        }
        thiss.setState({lists: results})
        // Make batch request to get list counts after they are loaded
        for(i=0;i < res.results.length; i++) {
          localStorage.setItem(res.results[i].objectId, "")
        }

        for(i=0;i< res.results.length; i++) {
          list = {
            '__type'    : 'Pointer',
            'objectId'  : res.results[i].objectId,
            'className' : 'ProspectList', 
          }

          $.ajax({
            url:'https://api.parse.com/1/classes/Prospects',
            type:'GET',
            headers:parse_headers,
            listObjectId: res.results[i].objectId,
            data: 'where={"lists":'+JSON.stringify(list)+'}&count=1',
            success: function(res) {
              //console.log(this.listObjectId)
              localStorage.setItem(this.listObjectId, res.count)
              amount = 0
              for(ii=0;ii< results.length;ii++){
                if(localStorage.getItem(results[ii].objectId) == "")
                  amount = amount + 1
              }

              if(amount == 0) {
                for(ii=0;ii< results.length;ii++)
                  results[ii].count = localStorage.getItem(results[ii].objectId)

                thiss.setState({lists: results})
                //console.log('Got Counts')
              }

              // updated res.count
              //thiss.setState({count: res.count})
            },
            error: function(err) {
              console.log(err)
            }
          })
        }
      },
      error: function(err) {
        console.log('error')
        console.log(err)
      }
    });
  },

  generate_id : function () {
    return '_' + Math.random().toString(36).substr(2, 9);
  },
});

/*  Dropdown Menus */

var CurrentLists = React.createClass({
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
        <li><a style={{fontWeight:'bold',fontSize:'10px'}} href="javascript:" onClick={this.listAction}>{this.props.lists[i].name}</a></li>
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
    for(i=0;i<this.props.lists.length;i++) {
      lists.push(
        <li><a style={{fontWeight:'bold',fontSize:'10px'}}
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
      stuff = <span className="label label-default" style={listType}>
            {(this.props.currentListName == "All") ? '' : <i className="fa fa-align-justify" style={{marginRight:'5px'}}/>}
            {(this.props.currentListName == "All") ? '' : "   " +this.props.currentListName}
              </span>
    } else {
      stuff = <input className="form-control" style={{width: 100, float: 'left', height: 24, marginTop: -1}}/>
    }
    return (

          <div>
            <h4 style={{margin:0}}>
              {stuff}
              <a href="javascript:" 
                style={listBtn}
                data-toggle="modal"
                id="renameListBtn"
                data-target=".bs-renameList-modal-sm"
                className="btn-gradient btn btn-xs btn-primary">
                <i className="fa fa-pencil" />
              </a>
              <a href="javascript:" 
                style={listBtn}
                data-toggle="modal"
                id="deleteListModal"
                data-target=".bs-deleteList-modal-sm"
                className="btn-gradient btn btn-xs btn-primary">
                <i className="fa fa-trash-o" />
              </a>
            </h4>
            <RenameListModal />
            <DeleteListModal />
          </div>
      );
  },

  renameList: function() {

  },

  deleteList: function(){
    // Launch Modal
    // Get All Members Of This List
    // Remove From List Array

  },

  toggleEdit: function() {
    this.setState({editMode: !this.state.editMode })
  }
});

