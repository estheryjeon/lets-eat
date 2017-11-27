var express = require('express');

var app = express();

var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var User = require('./db/User');

app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

app.use(cookieSession({
  secret: 'SHHisASecret'
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  if (req.session.email && req.session.email !== '') {
    res.redirect('/home');
  } else {
    res.redirect('/signin');
  }
});

app.get('/signin', function (req, res) {
  res.render('signin');
});

app.post('/signin', function(req, res) {
  email = req.body.email;
  password = req.body.password;
  User.checkIfLegit(email, password, function(error, isRight) {
    if (error) {
      res.send('Error! ' + error + '!');
    } else {
      if (isRight) {
        req.session.email = email;
        res.redirect('/home');
      } else {
        res.send('Wrong Password :(');
      }
    }
  });
});

app.get('/signup', function (req, res) {
  res.render('signup');
});

app.post('/signup', function (req, res) {
  User.addUser(req.body.email, req.body.username, req.body.password,
      req.body.age, req.body.location, req.body.bio, req.body.cuisine,
      function (error) {
    if (error) res.send(error);
    else res.redirect('/home');
  });
});

app.get('/signout', function (req, res) {
  req.session.email = '';
  res.render('signout');
})

app.get('/home', function (req, res, next) {
  res.render('home');
});

app.post('/home', function (req, res, next) {
  var name = req.body.name;
  var categories = req.body.categories;
  var rating = req.body.rating;
  var location = req.body.location;
  User.saveRest(req.session.email, name, categories, rating, location,
    function (error) {
    if (error) {
      console.log(error);
    } else {
      res.send('Saved!');
    }
  });
});

app.get('/liked', function (req, res, next) {
  res.render('liked');
})

app.get('/getLiked', function (req, res, next) {
  User.getAllSaved(req.session.email, function (error, saved) {
    if (error) {
      console.log(error);
    } else {
      res.json(saved);
    }
  });
});

app.get('/profile/:email', function (req, res, next) {
  var email = req.params.email;
  User.getUser(email, function (error, user) {
    if (error) {
      console.log(error);
    } else {
      res.json(user);
    }
  });
});

app.get('/userName', function (req, res, next) {
  res.send(req.session.email);
});

app.get('/profile', function (req, res, next) {
  res.render('profile');
});

app.get('/matches', function (req, res, next) {
  res.render('matches');
});

app.get('/getMatches', function (req, res, next) {
  User.getUser(req.session.email, function (error, user) {
    if (error) {
      console.log(error);
    } else {
      User.checkMatch(user, function (error, other) {
        if (error) {
          console.log(error);
        } else {
          res.send(other);
        }
      })
    }
  });
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  console.log('listening');
});
