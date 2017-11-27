$(document).ready(function() {

  $.ajax({
    type: "GET",
    url: '/getLiked',
    success: function(data) {
      for (var i = 0; i < data.length; i++) {
        $("#restaurants").append(
          "<h1 id=restName>" + data[i].name + "</h1>" + "<p id=restInfo>Type: " +
          data[i].categories + "<br>Rating: " + data[i].rating + "<br>Location: " +
          data[i].location + "</p>"
        );
      }
    }
  });

});
