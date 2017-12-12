$(document).ready(function() {

  $.ajax({
    type: 'GET',
    url: '/getMatches',
    success: function(data) {
      if (data) {
        for (var i = 0; i < data.length; i++) {
          $('#matches').append('<div class="rest"><h1 id="matchesHead">'+
            data[i].restaurant + '</h1><p class="matchesName">' +
            data[i].name + '</p><p id="link">Eat together?</p> </div>');
        }
      } else {
        $('#matches').append('<p>None yet! Check back later!</p>');
      }
    }
  });

  $('#matches').click(function() {
    var name = $(event.target).closest('.matchesName').text();
    $.ajax({
      type: 'GET',
      url: '/matchProfile' + name,
      success: function(data) {
        var username = data.username;
        $('.modal-content').find('#userInfo').append(username);
        var age = data.age;
        $('.modal-content').find('#userInfo').append('<p>Age : ' + age + '</p>');
        var location = data.location;
        $('.modal-content').find('#userInfo').append('<p>Location : ' + location + '</p>');
      $('.modal-content').find('#userInfo').append('<p>About Me : ' + data.bio + '</p>');
      }
    });
    $('#chat').show();
    $('#matchModal').show();
  });

  $('span').on('click', function () {
    $('#matchModal').hide();
    $('#chat').hide();
    $('#userInfo').empty();
  });

  $('#chat').on('click', function() {
    window.location.replace('/messages');
  });

});
