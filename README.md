To use Passport.js for both Google and local (username and password) authentication in a Node.js application, you will need to:

1. Install the `passport-google-oauth20` and `passport-local` packages by running `npm install passport-google-oauth20 passport-local` in your project's root directory.

2. Create a new Google API Console project and configure it to allow your application to use the Google+ API and generate OAuth 2.0 credentials (client ID and client secret).

3. In your Node.js application, import the `passport-google-oauth20` strategy and configure it with your client ID and client secret. Also import the `passport-local` strategy, and configure it with the appropriate options.

4. Create routes for handling the Google OAuth callback and local login.

5. Initialize Passport.js and use the Google strategy and local strategy for authentication.

6. Add the appropriate links in your application to initiate the authentication process with Google or local login.


Here is an example of how to set up Passport.js for both Google and local authentication in a Node.js application:

```javascript
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
```

This is a basic example, you might need to customize this according to your application needs, like adding a user model, using bcrypt to hash passwords, etc.
