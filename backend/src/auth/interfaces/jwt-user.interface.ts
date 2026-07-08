export interface JwtUser {
  sub: string;
  username: string;
  companyId: string;
  roleId: string;
  permissions: string[];
}