$(document).ready(function(){

  $.ajax({
    type: 'GET',
    url: "http://localhost:3000/lines"
  }).done(function(line_data){
    console.log(line_data);
    line_data.forEach(function(line){
      // $("#lines").append("<li id='" + line.id + "'>" + line.color + "</li>");
      $("#lines").append("<button id='" + line.id + "'>" + line.color + "</button>");
    })
  })
  .fail(function(line_data){
    console.log("failed when going to get line data");
    alert("failed");
  })

  $('#lines').on("click",function(event){
    alert("clicked" + event.target.id);
    $.ajax({
      type: 'GET',
      url: "http://localhost:3000/lines/" + event.target.id
    })
    .done(function(line_data){
      console.log(line_data);
      var html = "<dl id='current_line' data-current-line='" + line_data.id + "'><dt>Color</dt><dd>" + line_data.color + "</dd><dt>Direction</dt><dd>" + line_data.direction + "</dd></dl>";


      $('#line').html("");
      $('#line').append(html);

      line_data.comments.forEach(function(comment){
        var commentHTML = "<p><h3>" + comment.user.username + "</h3>" + comment.post + " " + comment.time +  "</p>";
        $('#line').append(commentHTML);
      })

    })
    .fail(function(line_data){
      console.log("failed");
    });
  });

  $('#submit-button').on("click",function(event){
    var commentData ={comment: {
      post: $("#new-post").val()
    }}

    var currentLineId = $('#current_line').data('current-line');
    console.log('created post for user with line id of' + currentLineId);
      $.ajax({
        type: 'POST',
        url:"http://localhost:3000/lines/" + currentLineId + "/comments",
        dataType: "json",
        data: commentData
      })
      .done(function(){
        alert("success");
      })
      .fail(function(){
        alert("failure");
      })
      $('#line').append(commentHTML);
    });
});












//Authentication


// $(function(){
//   $('#get-token').on('click', function(){
//     $.ajax('http://localhost:3000/login',{
//       contentType: 'application/json',
//       processData: false,
//       data: JSON.stringify({
//         credentials: {
//           username: $('#username').val(),
//           password: $('#password').val()
//         }
//       }),
//       dataType: "json",
//       method: "POST"
//     }).done(function(data, textStatus) {
//       $('#token').val(textStatus == 'nocontent' ? 'login failed' : data['token']);
//       console.log(data);
//     }).fail(function(jqxhr, textStatus, errorThrown){
//       console.log(textStatus);
//     });
//   });
//   $('#get-index').on('click', function(){
//     $.ajax('http://localhost:3000/hello',{
//       dataType: "json",
//       method: "GET",
//       headers: { Authorization: 'Token token=' + $("#token").val() }
//     }).done(function(data, textStatus) {
//       $('#result').val(JSON.stringify(data));
//       console.log(data);
//     }).fail(function(jqxhr, textStatus, errorThrown){
//       console.log(textStatus);
//     });
//   });
//   $('#get-by-id').on('click', function(){
//     $.ajax('http://localhost:3000/hello/' +
//       $('#id').val(), {
//       dataType: "json",
//       method: "GET",
//       headers: { Authorization: 'Token token=' + $("#token").val() }
//     }).done(function(data, textStatus) {
//       $('#result').val(JSON.stringify(data));
//       console.log(data);
//     }).fail(function(jqxhr, textStatus, errorThrown){
//       console.log(textStatus);

// });


