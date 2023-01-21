const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const app = express();

passport.use(new GoogleStrategy({
    clientID: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  (accessToken, refreshToken, profile, cb) => {
    // Perform any additional verification or user lookup here
    // and return the user object
    return cb(null, profile);
  }
));

passport.use(new LocalStrategy((username, password, cb) => {
    // Perform user lookup or verification here
    // and return the user object
    const user = { id: 1, username: 'user', password: 'password' };
    if (username !== user.username || password !== user.password) {
      return cb(null, false);
    }
    return cb(null, user);
}));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/' }));

app.listen(3000);