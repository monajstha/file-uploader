import passport, { DoneCallback } from "passport";
import { Strategy, VerifyFunction } from "passport-local";
import bcrypt from "bcrypt";
import { PrismaClient, User } from "@prisma/client";
import * as db from "@db/index";
const prisma = new PrismaClient();

const verifyCallback: VerifyFunction = async (
  username: string,
  password: string,
  done
) => {
  try {
    const user = await db.getUserByUsername(username);

    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: "Incorrect password" });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

const localStategy = new Strategy(verifyCallback);
passport.use(localStategy);

passport.serializeUser((user: any, done) => {
  const u = user as User;
  done(null, u.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await db.getUserByUserId(id);

    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
