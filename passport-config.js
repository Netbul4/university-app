const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByEmail, getUserById){
    // Function to auth the users.
    const aunthenticateUsers = async(email, password, done) => {
        // Get Users by the email.
        const user = getUserByEmail(email);
        if(user == null){
            return done(null, false, {message: "No user found."})
        }

        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null, user);
            }else{
                return done (null, false, {message: "Incorrect Password"});
            }
        }catch(e){
            console.log(e);
            return done(e);
        }
    }

    passport.use(new localStrategy({usernameField: 'email'}, aunthenticateUsers))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}

module.exports = initialize;