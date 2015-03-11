


//app.js Require
//
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;



//app.js 

app.use(passport.initialize());
app.use(passport.session()); 





//Functions to include

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});



// Passport Facebook Strategy - I didn't use MVC, I just put in app.js. You can move as needed.
// Make sure to update the ID/Secret and change the callbackURL to your server
// Also match the database fields for User to your own.

 
passport.use(new FacebookStrategy({
    clientID: 'FBclientID',
    clientSecret: 'FBSecret',
    callbackURL: "http://localhost:7783/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {

      console.log(profile)
        //check user table for anyone with a facebook ID of profile.id
        User.findOne({
            'FBuserID': profile.id 
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            //No user was found... so create a new user with values from Facebook (all the profile. stuff)
            if (!user) {
                user = new User({
                    name: profile.displayName,
                    // email: profile.emails[0].value,
                    FBuserID: profile.id,
                    //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
                    facebook: profile._json,
                    token: accessToken,
                    FBprofilePic: "https://graph.facebook.com/" + profile.id + "/picture" + "?width=200&height=200" + "&access_token=" + accessToken
                });
                user.save(function(err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            } else {
                //found user. Return
                done(null, profile);
            }
        });
    }
));



//Routes, I didn't use Controller/MVC but you can move. 

//Passport Facebook Login
app.get('/auth/facebook', passport.authenticate('facebook'));


// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback', 
  
    passport.authenticate('facebook', 
{ 
    successRedirect: '/',
    failureRedirect: '/userlogin' 
}));
