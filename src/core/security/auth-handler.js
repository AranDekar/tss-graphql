import passport from 'passport';

import passportStrategies from 'core/security/passport_strategies';
import * as JwtService from 'core/security/jwt-service';

class AuthHandler {
  static init(app) {
    AuthHandler.useGoogle(app);
    AuthHandler.useJwt(app);

    app.use(passport.initialize());
    app.use('/graphql', (req, res, next) => AuthHandler.verifyAuthorizationToken(req, res, next));
  }

  static useGoogle(app) {
    passport.use(passportStrategies.google);
    app.get('/auth/google', passport.authenticate('google', {
      session: false,
      scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
    }));

    app.get('/auth/google/callback', (req, res, next) => passport.authenticate('google',
      { session: false, failureRedirect: process.env.UI_BASE_PATH },
      (err, user) => AuthHandler.authServiceProviderCallback(req, res, next, err, user)));
  }

  static useJwt(app) {
    app.post('/auth/jwt', (req, res) => {
      const jwt = JwtService.createJwtTokenAsBearer(req.body.username, req.body.password);
      res.status(201).json({ jwt });
    });
  }

  static async verifyAuthorizationToken(req, res, next) {
    try {
      return next();


      // if (req.cookies && req.cookies['JWT-TOKEN'] && req.headers['x-xsrf-token']) {
      //   req.user = await JwtService.verifyToken(req.cookies['JWT-TOKEN'], req.headers['x-xsrf-token']);
      //   return next();
      // }
      // if (req.headers.authorization) {
      //   const auth = req.headers.authorization.split(' ')[1];
      //   req.user = await JwtService.verifyToken(auth);
      //   return next();
      // }
      // throw new Error('auth token not provided');
    } catch (err) {
      return res.status(401).json({ message: 'auth token not provided or invalid!' });
    }
  }

  static authServiceProviderCallback(req, res, next, error, user) {
    if (error) { return next(error); }
    if (!user) { return res.redirect(process.env.UI_BASE_PATH); }
    try {
      const token = JwtService.signToken(user);
      // to prevent from csrf attack we sent back a XSRF-TOKEN in a cookie
      res.cookie('XSRF-TOKEN', token.xsrf, { maxAge: 900000, httpOnly: false });
      res.cookie('JWT-TOKEN', token.jwt, { maxAge: 900000, httpOnly: true });
      let isAdmin = 'false';
      if (user.roles && user.roles.indexOf('admin') > -1) {
        isAdmin = 'true';
      }
      return res.redirect(`${process.env.UI_BASE_PATH}/#/login?user_id=${user.id}&is_admin=${isAdmin}`);
    } catch (err) {
      return next(err);
    }
  }
}

export default AuthHandler;
