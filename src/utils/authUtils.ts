import OktaJwtVerifier from '@okta/jwt-verifier';

export async function getEmailFromToken(token: string): Promise<string> {
  const ISSUER = process.env.ISSUER;
  if (!ISSUER) {
    throw new Error('Missing scope property in config');
  }
  const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: ISSUER,
    clientId: process.env.CLIENT_ID
  });

  const AUDIENCE = process.env.AUDIENCE;
  if (!AUDIENCE) {
    throw new Error('Missing scope property in config');
  }

  const { claims } = await oktaJwtVerifier.verifyAccessToken(token, AUDIENCE);
  const { sub } = claims;
  return sub;
}
