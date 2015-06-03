// $('#new-comment').click(function(){
//   var post = {comment: $("#new-comment").val(),
//   emoji: $("#new-emoji").val() };

//   $.ajax({
//   type: 'POST',
//   url: "http://localhost:3000/comments",
//   data:{post: post}
// }).done(function(){
//   alert ("success");
// }).fail(function(){
//   alert ("failure");
// });


// });


$(function(){
  $('#get-token').on('click', function(){
    $.ajax('http://localhost:3000/login',{
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({
        credentials: {
          email: $('#userename').val(),
          password: $('#password').val()
        }
      }),
      dataType: "json",
      method: "POST"
    }).done(function(data, textStatus) {
      $('#token').val(textStatus == 'nocontent' ? 'login failed' : data['token']);
      console.log(data);
    }).fail(function(jqxhr, textStatus, errorThrown){
      console.log(textStatus);
    });
  });
  $('#get-index').on('click', function(){
    $.ajax('http://localhost:3000/hello',{
      dataType: "json",
      method: "GET",
      headers: { Authorization: 'Token token=' + $("#token").val() }
    }).done(function(data, textStatus) {
      $('#result').val(JSON.stringify(data));
      console.log(data);
    }).fail(function(jqxhr, textStatus, errorThrown){
      console.log(textStatus);
    });
  });
  // $('#get-by-id').on('click', function(){
  //   $.ajax('http://localhost:3000/hello/' +
  //     $('#id').val(), {
  //     dataType: "json",
  //     method: "GET",
  //     headers: { Authorization: 'Token token=' + $("#token").val() }
  //   }).done(function(data, textStatus) {
  //     $('#result').val(JSON.stringify(data));
  //     console.log(data);
  //   }).fail(function(jqxhr, textStatus, errorThrown){
  //     console.log(textStatus);
  //
});
