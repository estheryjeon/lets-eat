var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/userDb', function (error) {
  if (error && error.message.includes('ECONNREFUSED')) {
    console.log('Error connecting to mongodb database: %s.\nIs "mongod" running?', error.message);
    process.exit(0);
  } else if (error) {
    throw error;
  } else {
    console.log('DB successfully connected.');
  }
});

var db = mongoose.connection;

var userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  age: String,
  location: String,
  bio: String,
  cuisine: String,
  saved: [{
    name: String,
    categories: String,
    rating: String,
    location: String
  }],
});

userSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(error, salt) {
    if (error) return next(error);

    bcrypt.hash(user.password, salt, function(error, hash) {
      if (error) return next(error);

      user.password = hash;
      next();
    });
  });
});

userSchema.statics.addUser = function(email, username, password, age, location,
    bio, cuisine, callback) {
  var newUser = new this({ email: email, username: username, password: password,
    age: age, location: location, bio: bio, cuisine: cuisine});
  newUser.save(callback);
}

userSchema.statics.checkIfLegit = function(email, password, callback) {
  this.findOne({ email: email }, function(error, user) {
    if (!user) callback('No user!');
    else {
      bcrypt.compare(password, user.password, function(error, isRight) {
        if (error) return callback(error);
        callback(null, isRight);
      });
    };
  });
}

userSchema.statics.getUser = function(email, callback) {
  this.findOne({email: email}).exec(function (error, user) {
      callback(error, user);
    });
}

userSchema.statics.getUserWithName = function(name, callback) {
  this.findOne({username: name}).exec(function (error, user) {
      callback(error, user);
    });
}

userSchema.statics.getAllUser = function(callback) {
  this.find(function (error, users) {
    callback(error, users);
  });
}

userSchema.statics.saveRest = function(email, name, categories,
    rating, location, callback) {
  var toSave = {
    name: name,
    categories: categories,
    rating: rating,
    location: location
  };
  this.findOneAndUpdate(
    {email: email},
    {$push: {saved: toSave}},
    {upsert: true, new : true}
  ).exec(callback);
}

userSchema.statics.updateUser = function(email, name, age,
    location, bio, callback) {
  this.findOneAndUpdate(
    {email: email},
    {$set: {username: name, age: age, location: location, bio: bio}},
    {upsert: true, new : true}
  ).exec(callback);
}

userSchema.statics.getAllSaved = function(email, callback) {
  this.findOne({email: email}, function (error, user) {
    callback(error, user.saved);
  });
}

userSchema.statics.checkMatch = function(user, callback) {
  this.find(function (error, users) {
    var found = [];
    var allUsers = users;
    for (var k = 0; k < allUsers.length; k++) {
      var otherEmail = allUsers[k].email;
      if (otherEmail !== user.email) {
        var otherSaved = allUsers[k].saved;

        if (otherSaved && otherSaved.length) {
          var userSaved = user.saved;
          for (var i = 0; i < userSaved.length; i++) {
            for (var j = 0; j < otherSaved.length; j++) {
              if (otherSaved[j].name == userSaved[i].name) {
                found.push({
                  name : allUsers[k].username,
                  email : allUsers[k].email,
                  age : allUsers[k].age,
                  location : allUsers[k].location,
                  bio : allUsers[k].bio,
                  restaurant : userSaved[i].name
                });
              }
            }
          }

        }
      }
    }
    callback(error, found);
  });
}

module.exports = mongoose.model('User', userSchema);
