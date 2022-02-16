import OktaJwtVerifier from '@okta/jwt-verifier';
import { Request, Response, NextFunction } from 'express';
import { AuthenticationError } from '../utils/errors';

const ISSUER = process.env.ISSUER;
if (!ISSUER) {
  throw new Error('Missing scope property in config');
}
const AUDIENCE = process.env.AUDIENCE;
if (!AUDIENCE) {
  throw new Error('Missing scope property in config');
}

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: ISSUER,
  clientId: process.env.CLIENT_ID
});

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new AuthenticationError('You must send an Authorization header');

    const [authType, token] = authorization.trim().split(' ');
    if (authType !== 'Bearer') throw new AuthenticationError('Expected a Bearer token');

    const { claims } = await oktaJwtVerifier.verifyAccessToken(token, AUDIENCE);
    if (!claims || !claims.scp) {
      throw new AuthenticationError('No claims or scope found');
    }
		
    const scope = process.env.SCOPE;
    if (!scope) {
      throw new AuthenticationError('Missing scope property in config');
    }
    if (!claims.scp.includes(scope)) {
      throw new AuthenticationError('Could not verify proper scope');
    }
    next();
  } catch (e) {
    if (e instanceof AuthenticationError) {
      return res.status(403).json({ 'error': e.message });
    } else {
      console.log('Another unexpected error happened: ' + e);
      res.sendStatus(500);
    }
  }
};
