$(document).ready(function(){

  $('#create-user').on('click', function(){
    // show the form for creating the new user
    $('#new-user').show();
  });

  $('#login-user').on('click', function(){
    // show the form for creating the new user
    $('#login').show();
  });

  // Pre-load list of lines
  $.ajax({
    type: 'GET',
    url: "http://localhost:3000/lines"
  }).done(function(line_data){
    // console.log(line_data);
    line_data.forEach(function(line){
      // $("#lines").append("<li id='" + line.id + "'>" + line.color + "</li>");
      $("#lines").append("<button id='" + line.id + "'>" + line.color + "</button>");
    })
  }).fail(function(line_data){
    console.log("failed when going to get line data");
    alert("failed");
  })

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
  }

  // List color, direction, and comments for the clicked line.
  $('#lines').on("click",function(event){
    // alert("clicked element with id " + event.target.id);
    renderLine(event.target.id);
  });

  // For submitting comments
  $('#submit-button').on("click",function(){
    // Get the ID of the current line from our HTML (which has already loaded it).
    var currentLineId = $('#current_line').data('current-line');

    // Create a comment to add to the current line.
    var commentData ={comment: {
      post: $("#new-post").val(),
      line_id: currentLineId,
      user_id: 1
    }};

    // POST the comment to the API.
    //console.log('created post for user with line id of' + currentLineId);
    $.ajax({
      type: 'POST',
      url:"http://localhost:3000/lines/" + currentLineId + "/comments",
      dataType: "json",
      data: commentData
    })
    .done(function(){
      // alert("success");
      renderLine(currentLineId);
    })
    .fail(function(){
      alert("failure");
    })
  });

  // For creating users
  $('#user-button').on("click",function(){

    //1. Create a new User
    var newUser = {
       username: $('#new-username').val(),
  //        email: $('#new-user-email').val(),
       password: $('#new-user-password').val(),
       password_confirmation: $('#new-user-password-confirmation').val(),
    };

    $.ajax({
      type: 'POST',
      url:"http://localhost:3000/register/",
      data: {credentials: newUser}
    })
    .done(function(response, textStatus){
      alert("success");
    })
    .fail(function(jqxhr, textStatus, errorThrown){
      alert("failure");
    })
  });

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
    })
    .fail(function(error){
      console.log("error in login" + error);
    });
  });
  // $('#login').on("click",function(){

  //   var userLogin = {
  //      username: $('#user-login').val(),
  //      password: $('#user-password').val(),
  //   };

  //   $.ajax({
  //     type: 'POST',
  //     url:"http://localhost:3000/login/",
  //     data: {credentials: userLogin}
  //   })
  //   .done(function(response, textStatus){
  //     alert("success");
  //   })
  //   .fail(function(jqxhr, textStatus, errorThrown){
  //     alert("failure");
  //   });

});






