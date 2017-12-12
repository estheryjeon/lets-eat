$(document).ready(function() {

  var newName = '';
  var newAge = '';
  var newLocation = '';
  var newBio = '';

  var getUserData = function() {
    $.ajax({
      type: "GET",
      url: '/getProfile',
      success: function(data) {
        var username = data.username;
        $("#userName").append(username);
        var age = data.age;
        $("#age").append('<p>Age : ' + age + '</p>');
        var location = data.location;
        $("#location").append('<p>Location : ' + location + '</p>');
        $("#bio").append('<p>About Me : ' + data.bio + '</p>');
      }
    });
  }

  var updateProfile = function() {
    $.ajax({
      type: "POST",
      url: "/updateProfile",
      data: {
        name: newName,
        age: newAge,
        location: newLocation,
        bio: newBio
      },
    });
  }

  getUserData();

  $('#update').click(function () {
    $('#userInfo').hide();
    $('#userUpdate').show();
  });

  $("#done").click(function() {
    $('#userUpdate').hide();
    if ($('#updateName').val()) {
      newName = $('#updateName').val();
    }
    if ($('#updateAge').val()) {
      newAge = $('#updateAge').val();
    }
    if ($('#updateLocation').val()) {
      newLocation = $('#updateLocation').val();
    }
    if ($('#updateBio').val()) {
      newBio = $('#updateBio').val();
    }
    updateProfile();

    $("#userName").empty();
    $('#age').empty();
    $("#location").empty();
    $("#bio").empty();
    getUserData();
    $('#userInfo').show();
  });

});
