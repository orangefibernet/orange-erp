import { Injectable } from '@nestjs/common';
import { JwtUser } from '../interfaces/jwt-user.interface';

@Injectable()
export class TenantContextService {
  private user: JwtUser | null = null;

  setUser(user: JwtUser): void {
    this.user = user;
  }

  getUser(): JwtUser | null {
    return this.user;
  }

  getCompanyId(): string | null {
    return this.user?.companyId ?? null;
  }

  clear(): void {
    this.user = null;
  }
}