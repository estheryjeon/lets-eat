$(document).ready(function() {

  $.ajax({
    type: "GET",
    url: '/getMatches',
    success: function(data) {
      $("#matches").append("<p>" + data + "</p>");
    }
  });

});
