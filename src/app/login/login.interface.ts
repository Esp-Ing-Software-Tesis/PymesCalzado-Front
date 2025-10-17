export interface JwtPayloadCustom {
  userId: number;
  username: string;
  role: string;
  sessionId: string;
  productionLine?: string;
  iat: number;
  exp: number;
}