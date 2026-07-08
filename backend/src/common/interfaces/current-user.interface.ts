export interface CurrentUserPayload {
  sub: string;
  username: string;
  role: string;
  companyId: string;
  iat?: number;
  exp?: number;
}
