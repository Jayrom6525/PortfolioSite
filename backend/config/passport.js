const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('./db'); // Import the pool instance from pg
const bcrypt = require('bcrypt');//sql database config

//Local Strategy for authentication with username/email and password
passport.use(
    new localStrategy({ usernameField: 'email' }, async (email, password, done) => {
      console.log("authenticating email:", email);
        try {
          //query the database for the user using email
          const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
          
          if(userResult.rows.length === 0){
            return done(null, false, { message: 'User not found' });
          }

          const user = userResult.rows[0];
          //compare provided password with hashed password in the database
          const isMatch = await bcrypt.compare(password, user.password);
          console.log("password match:", isMatch);
          if(!isMatch){
            return done(null, false, { message: 'Incorrect password' });
          }

          //if password is correct, return the user object
          return done(null, user);
        } catch (error) {
            console.error('Error during authentication:', error);
            return done(error);
        }
    })
);

//serialize user object
passport.serializeUser((user, done) => {
    done(null, user.id); // Serialize only the user ID to keep the session lightweight
});

//deserialize user object
passport.deserializeUser(async (id, done) => {
    try {
      const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      done(null, userResult.rows[0]); // Attach the user object to the request object
    } catch (error) {
      done(error, null);
    }
  });

  module.exports = passport;