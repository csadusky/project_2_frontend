$(document).ready(function(){
// $('#see-ads-lines').click(function(){
      $.ajax({
        type: 'GET',
        url: "http://localhost:3000/lines"
      }).done(function(line_data){
        console.log(line_data);
      });
    });
