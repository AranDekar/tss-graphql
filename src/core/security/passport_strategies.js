import { OAuth2Strategy } from 'passport-google-oauth';
import User from 'user/schemas/user_schema';

const passportStrategies = {
  google: new OAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      // passReqToCallback: true
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(`access token is ${accessToken}`); // eslint-disable-line no-console

      // Set the provider data and include tokens
      const providerData = profile._json; // eslint-disable-line no-underscore-dangle
      providerData.accessToken = accessToken;
      providerData.refreshToken = refreshToken;

      // Create the user OAuth profile
      const providerUserProfile = {
        firstName: profile.name ? profile.name.givenName : undefined,
        lastName: profile.name ? profile.name.familyName : undefined,
        displayName: profile.displayName,
        email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : undefined,
        username: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : undefined,
        profileImageURL: (providerData.picture) ? providerData.picture : undefined,
        provider: 'google',
        // providerIdentifierField: 'id',
        providerData,
      };

      // Save the user OAuth profile
      let user = await User.findOne({ email: providerUserProfile.email }).exec();
      if (user) {
        return done(null, user);
      }
      user = new User(providerUserProfile);
      const model = new User(providerUserProfile);
      await model.save();
      return done(null, model);
    },
  ),
};

export default passportStrategies;
