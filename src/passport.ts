import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import userModel from "./models/user.model";
import { verifyPassword } from "./utils/hashPassword";

passport.use(
  new LocalStrategy({ usernameField: "code" }, async (code, password, done) => {
    try {
      const user = await userModel.findOne({ where: { code } });

      if (!user) return done(null, false, { message: "Invalid code" });

      const isPasswordCorrect = await verifyPassword(password, user.password);

      if (!isPasswordCorrect)
        return done(null, false, { message: "Invalid password" });

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: any, done) => {
  console.log("sdfasd")
  try {
    const user = await userModel.findByPk(id);

    if (user) return done(null, user);

    throw "user not found";
  } catch (error) {
    done(error);
  }
});

export { passport };
