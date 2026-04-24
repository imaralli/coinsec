export interface IDecodedToken {
  user_id: string;
  roles: string[];
  iat: number;
  exp: number;
}
