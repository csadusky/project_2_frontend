//PATH FOR HEROKU
var baseURL = function(){
 return "http://localhost:3000";
 // return "http://heroku";
};

//Function that checks to see if token is present, to show things, hide things
var toggle = function(){
  if (simpleStorage.get('token')){
    $('#new-comment').show();
    $('#userDiv').show();
  }else{
    $('#new-comment').hide();
    $('#userDiv').hide();
  }

};

$(document).ready(function(){

  toggle();

  $('#create-user').on('click', function(){
    // show the form for creating the new user
    $('#new-user').show();
  });

  $('#login-user').on('click', function(){
    // show the form for creating the new user
    $('#login').show();
  });


  // SHOW LIST OF LINES
  $.ajax({
    type: 'GET',
    url: "http://localhost:3000/lines"
  }).done(function(line_data){
    line_data.forEach(function(line){
      $("#lines").append("<button id='" + line.id + "'>" + line.name + "</button>");
    })
  }).fail(function(line_data){
    console.log("failed when going to get line data");
    alert("failed");
  });

  var renderLine = function(lineID){
    $.ajax({
      type: 'GET',
      url: "http://localhost:3000/lines/" + lineID
    })
    .done(function(line_data){
      // console.log(line_data);
      var lineHTML = "<dl id='current_line' data-current-line='" + line_data.id + "'><dt>Color</dt><dd>" + line_data.color + "</dd><dt>Direction</dt><dd>" + line_data.direction + "</dd></dl>";


      $('#line').html("");
      $('#line').append(lineHTML);

      line_data.comments.forEach(function(comment){
        var commentHTML = "<p><h3>" + comment.user.username + "</h3>" + comment.post + " " + comment.time +  "</p>";
        $('#line').append(commentHTML);
      })
    })
    .fail(function(line_data){
      console.log("failed");
    });
  };
  // List color, direction, and comments for the clicked line.
  $('#lines').on("click",function(event){
    // alert("clicked element with id " + event.target.id);
    renderLine(event.target.id);
  });

  // SUBMITTING A COMMENT

  $('#submit-button').on("click",function(){
    // Get the ID of the current line from our HTML (which has already loaded it).
    var currentLineId = $('#current_line').data('current-line');
    // Create a comment to add to the current line.
    var commentData ={comment: {
      post: $("#new-post").val(),
      line_id: currentLineId
    }};

    // POST the comment to the API.

    $.ajax({
      type: 'POST',
      url:"http://localhost:3000/lines/" + currentLineId + "/comments",
      dataType: "json",
      data: commentData,
      headers: { Authorization: 'Token token=' + simpleStorage.get('token') }
    })
    .done(function(){
      renderLine(currentLineId);
      $('#new-post').val("");
    })
    .fail(function(){
      alert("failure");
    });
  });

  //NEW USER BUTTON
  $('#user-button').on("click",function(){

    var newUser = {
       username: $('#new-username').val(),
       password: $('#new-user-password').val(),
       password_confirmation: $('#new-user-password-confirmation').val(),
    };

    $.ajax({
      type: 'POST',
      url:"http://localhost:3000/register/",
      data: {credentials: newUser}
    })
    .done(function(response, textStatus){
      $("#new-user").hide();
      console.log("Your account has been created!");
      //renderNewUser();
    })
    .fail(function(textStatus, errorThrown){
      console.log("Error in creating new user " + error);
    });
  });


  //LOGIN BUTTON
  $('#login-button').on("click", function(){
    var loginUsername = $('#user-login').val();
    var loginPassword = $('#user-password').val();
    var params = {
      credentials: {
        loginUsername: loginUsername,
        loginPassword: loginPassword
      }
    };
    $.ajax ({
      type: 'POST',
      url: "http://localhost:3000/login/",
      dataType: 'json',
      data: params
    })
    .done(function(data){
      $('#login').hide();
      console.log(data);
      renderUserData(data);
      simpleStorage.set('token', data.token, {TTL: 43200000})
      toggle();
      console.log ("sucessful login");
    })
    .fail(function(error){
      console.log("error in login" + error);
    });
  });


  //LOGOUT BUTTON
  $("#logout-user").on("click", function(){
     $.ajax({
       method: 'DELETE',
       url: baseURL() + "/logout",
       headers: { Authorization: 'Token token=' + simpleStorage.get('token') }
     })
     .done(function(){
       console.log("logged out");
     })
     .fail(function(){
       alert("Error in logging out");
     }).always(function(){
       simpleStorage.set('token', '');
       toggle();
     });
   });


  //USER GREETING
var renderUserData = function(data){
  $('#userDiv').html("Hello, " + data.username + "! Click on a line and start talking to others on the T.");

  };
});







