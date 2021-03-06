export interface SecurityTokenInterface {
  aud: string;
  email: string;
  displayName: string;
  exp: number;
  iat: number;
  iss: string;
  nameid: string;
  nbf: number;
  role: string;
  sub: string;
  name: string;
  isAdmin: string;
  needsResetPassword: string;
}
