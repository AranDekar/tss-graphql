import jwt from 'jsonwebtoken';
import uuid from 'uuid';

const options = {
  expiresIn: 60 /* <= minutes */ * 60,
  issuer: 'tss-gateway',
  jwtid: 'uniqueId',
};

export const signToken = (user) => {
  if (!user || !user.id) {
    throw new Error('user is not defined to sign the jwt token');
  }

  const userInPayload = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    displayName: user.displayName,
    userName: user.username,
    created: user.created,
    updated: user.updated,
  };
  const xsrfToken = uuid.v1();

  const payload = {
    xsrfToken,
    user: userInPayload,
  };
  options.subject = user.id.toString();

  const token = jwt.sign(payload, process.env.JWT_SECRET, options);

  const result = {
    jwt: token,
    c: xsrfToken,
  };

  return result;
};

export const verifyToken = async (jwtToken, xsrfToken) => {
  jwt.verify(jwtToken, process.env.JWT_SECRET, options, (err, data) => {
    if (err) {
      throw new Error('token is invalid!');
    }
    if (xsrfToken && data.xsrfToken !== xsrfToken) {
      throw new Error('no jwt-token provided!');
    }
    Promise.resolve(data.user);
  });
};


export const createJwtTokenAsBearer = (username, password) => {
  if (!username || !password) { // no credentials = fail
    return false;
  }
  if (username !== 'aran' && password !== 'password') {
    return false;
  }
  const payload = { username };
  options.subject = username;
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
};
