$(document).ready(function() {

  var restaurants = data[0].businesses;
  var currName = "";
  var currRating = "";
  var currLocation = "";
  var currCategories = "";

  var theRejects = [];
  var currRest = 0;

  var getRest = function () {
    var name = restaurants[currRest].name;
    $("#restName").empty();
    $("#restName").append(name);
    $("#restInfo").empty();
    var rating = restaurants[currRest].rating;
    $("#restInfo").append('Rating : ' + rating + '<br>');
    var location = restaurants[currRest].location.display_address;
    $("#restInfo").append('Location : ' + location + '<br>');
    var categories = restaurants[currRest].categories[0].title;
    $("#restInfo").append('Type : ' + categories);
    currName = name;
    currRating = rating;
    currLocation = location;
    currCategories = categories;
  }
  getRest();

  $("#yes").click(function () {
    if (currRest == restaurants.length - 1) {
      if (theRejects.length == 0) {
        $("#restName").append("No More Restaurants :(");
      }
      restaurants = theRejects;
      theRejects = [];
      currRest = 0;
      getRest();
    } else {
      $.ajax({
        type: "POST",
        url: "/home",
        data: {
          name: currName,
          categories: currCategories,
          rating: currRating,
          location: currLocation
        },
        dataType: "json"
      });
      currRest++;
      getRest();
    }
  });

  $("#no").click(function () {
    if (currRest == restaurants.length - 1) {
      if (theRejects.length == 0) {
        $("#restName").append("No More Restaurants :(");
      }
      restaurants = theRejects;
      theRejects = [];
      currRest = 0;
      getRest();
    } else {
      theRejects.push(restaurants[currRest]);
      currRest++;
      getRest();
    }
  });


});
