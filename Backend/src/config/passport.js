import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import { College } from '../models/College.js';

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Extract email domain to check college affiliation
        const email = profile.emails[0].value;
        const emailDomain = email.split('@')[1];

        // Find college by email domain
        const college = await College.findOne({
            $or: [
                { emailDomain: emailDomain },
                { alumniEmailDomains: emailDomain }
            ]
        });

        if (!college) {
            return done(null, false, { message: 'Email domain not associated with any college' });
        }

        // Check if user exists
        let user = await User.findOne({ email });

        if (!user) {
            // Create new user
            user = await User.create({
                email,
                name: profile.displayName,
                googleId: profile.id,
                college: college._id,
                role: 'student', // Default role
                userType: emailDomain === college.emailDomain ? 'current' : 'alumni',
                verificationStatus: 'verified',
                profilePicture: profile.photos[0]?.value
            });
        } else if (!user.googleId) {
            // Link Google account to existing user
            user.googleId = profile.id;
            await user.save();
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

// Serialize user for the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport; 