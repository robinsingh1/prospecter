/* Auth Redirects */

function checkAuth(){
  //currentUser = localStorage.getItem('Parse/N85QOkteEEQkuZVJKAvt8MVes0sjG6qNpEGqQFVJ/currentUser')
  currentUser = localStorage.getItem('currentUser')
  if (currentUser) {
    if(window.location.hash != "#free_trial")
      location.href = "#"            
  } else {
    if(window.location.hash != "#free_trial" || window.location.hash != "#login" || window.location.href=="#signup")
      location.href = "#get_started"
      //location.href = "#signup"
  }
}
/*
module.exports = function(){
  //currentUser = localStorage.getItem('Parse/N85QOkteEEQkuZVJKAvt8MVes0sjG6qNpEGqQFVJ/currentUser')
  currentUser = localStorage.getItem('currentUser')
  if (currentUser) {
    location.href = "#"             // Feed
  } else {
    if(window.location.hash != "#login" || window.location.href=="#signup")
      location.href = "#get_started"
      //location.href = "#signup"
  }
}
*/
