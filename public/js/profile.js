$(document).ready(function() {

  $.ajax({
    type: "GET",
    url: '/userName',
    success: function(email) {
      console.log(email);
      $.ajax({
        type: "GET",
        url: '/profile/' + email,
        success: function(data) {
          var username = data[0].username;
          $("#userName").append(username);
          var age = data[0].age;
          $("#age").append(age);
          var location = data[0].location;
          $("#location").append(location);
        }
      });
    }
  });

});
