/* Auth Redirects */

function checkAuth(){
  //currentUser = localStorage.getItem('Parse/N85QOkteEEQkuZVJKAvt8MVes0sjG6qNpEGqQFVJ/currentUser')
  currentUser = localStorage.getItem('currentUser')
  if (currentUser) {
    if(window.location.hash != "#free_trial")
      lol = 4

      //location.href = "#"            
  } else {
    console.log(window.location.hash)
    if(window.location.hash != "#free_trial" || window.location.hash != "#login" || window.location.hash != "#signup" || window.location.hash != "#product/features" || window.location.hash != "#services"){
      //location.href = "#get_started"
    } else {
      console.log('ELSE')
    }
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
