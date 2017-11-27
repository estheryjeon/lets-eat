$(document).ready(function() {

  var restaurants = data[0].businesses;

  var randomRest = function () {
    randomInt = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
    for (var i = 0; i < restaurants.length; i++) {
      if (i == randomInt) {
        var name = restaurants[i].name;
        $("#restName").empty();
        $("#restName").append(name);
        $("#restInfo").empty();
        var rating = restaurants[i].rating;
        $("#restInfo").append('Rating : ' + rating + '<br>');
        var location = restaurants[i].location.display_address;
        $("#restInfo").append('Location : ' + location + '<br>');
        var categories = restaurants[i].categories[0].title;
        $("#restInfo").append('Type : ' + categories);
      }
    }
  }

  randomRest();

  $("#yes").click(function () {
    randomInt = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
    for (var i = 0; i < restaurants.length; i++) {
      if (i == randomInt) {
        var name = restaurants[i].name;
        $("#restName").empty();
        $("#restName").append(name);
        $("#restInfo").empty();
        var rating = restaurants[i].rating;
        $("#restInfo").append('Rating : ' + rating + '<br>');
        var location = restaurants[i].location.display_address;
        $("#restInfo").append('Location : ' + location + '<br>');
        var categories = restaurants[i].categories[0].title;
        $("#restInfo").append('Type : ' + categories);
        $.ajax({
          type: "POST",
          url: "/home",
          data: {
            name: name,
            categories: categories,
            rating: rating,
            location: location
          },
          dataType: "json"
        });
      }
    }
  });

  $("#no").click(function () {
    randomRest();
  });


});
