const authRouter = require("./auth/router");
const usersRouter = require("./users/router");
const passport = require('passport');
require('./middleware/authenticate')(passport);
module.exports = (app) => {
    app.use("/users", authRouter);
    app.use("/users", passport.authenticate('jwt', {session: false}), usersRouter);
};