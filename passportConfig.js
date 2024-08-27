import passport from "passport";
import localStrategy from "passport-local";
import bcrypt from "bcryptjs";
import queries from "./db/queries.js";

function passportConfig() {
  passport.use(
    new localStrategy(async (username, password, done) => {
      const rows = await queries.selectUserByUsername(username);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.user_id);
  });
  passport.deserializeUser(async (id, done) => {
    const rows = await queries.selectUserById(id);

    const user = rows[0];

    done(null, user);
  });
}

export default passportConfig;
