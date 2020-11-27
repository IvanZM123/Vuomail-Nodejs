// Imports modules.
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// Import environment
import { environments } from "../../..//environments/environments";
import { IUser } from "../../../repository/user/user.interface";

// Import repository
import { UserRepository } from "../../../repository/user/user.repository";
const userRepository = new UserRepository();

// Create strategy.
const strategy = new GoogleStrategy({
    clientID: environments.GOOGLE_CLIENT_ID as string,
    clientSecret: environments.GOOGLE_CLIENT_SECRET as string,
    callbackURL: environments.GOOGLE_CALLBACK_URI
}, async (access_token, refresh_token, profile, done) => {
    // Search user by email.
    const user = await userRepository.findByEmail(profile._json.email);
    
    // User existence
    if (user) {
        // Update acces_token
        await user.update({
            $set: { access_token }
        });

        return done(undefined, user);
    }

    // User does not exist
    const newUser = await userRepository.schema({
        oauthid: profile.id,
        name: profile.displayName,
        provider: profile.provider,
        email: profile._json.email,
        picture: profile._json.picture,
        access_token
    }).save();

    done(undefined, newUser);
});

// Use strategy
passport.use("auth-google", strategy);

// Serialize user
passport.serializeUser((user: IUser, done) =>  {
    done(null, user.email);
});

// Deserialize user
passport.deserializeUser(async (email: string, done) => {
    const user = await userRepository.findByEmail(email);
    done(null, user);
});
